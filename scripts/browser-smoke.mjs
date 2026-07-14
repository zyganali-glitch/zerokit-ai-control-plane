import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { once as onceEvent } from 'node:events';
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const TARGET = process.env.BROWSER_TARGET || 'http://127.0.0.1:4173/?lang=tr&theme=light&scenario=healthcare-saas';
const SCREENSHOT = resolve(ROOT, 'test-results', 'browser-smoke-mobile.png');
const DESKTOP_SCREENSHOT = resolve(ROOT, 'test-results', 'browser-smoke-desktop.png');

const sleep = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

async function firstExisting(paths) {
  for (const path of paths) {
    if (!path) continue;
    try {
      await access(path);
      return path;
    } catch (_) {
      // Try the next known browser location.
    }
  }
  return null;
}

async function waitForFile(path, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await readFile(path, 'utf8');
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
      await sleep(100);
    }
  }
  throw new Error(`Timed out waiting for ${path}`);
}

async function ensurePreviewServer() {
  try {
    const response = await fetch('http://127.0.0.1:4173/', { redirect: 'manual' });
    if (response.ok || (response.status >= 300 && response.status < 400)) return null;
  } catch (_) {
    // Start the repository-local preview below.
  }

  const server = spawn(process.execPath, [resolve(ROOT, 'scripts', 'dev-server.mjs')], {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'pipe'],
    windowsHide: true,
  });
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Preview server exited with code ${server.exitCode}.`);
    try {
      const response = await fetch('http://127.0.0.1:4173/', { redirect: 'manual' });
      if (response.ok || (response.status >= 300 && response.status < 400)) return server;
    } catch (_) {
      // Continue the bounded readiness poll.
    }
    await sleep(100);
  }
  server.kill();
  throw new Error('Timed out starting the local preview server.');
}

async function connectWebSocket(url) {
  const socket = new WebSocket(url);
  await new Promise((resolvePromise, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timed out opening Chrome DevTools WebSocket.')), 10_000);
    socket.addEventListener('open', () => {
      clearTimeout(timeout);
      resolvePromise();
    }, { once: true });
    socket.addEventListener('error', () => {
      clearTimeout(timeout);
      reject(new Error('Chrome DevTools WebSocket failed to open.'));
    }, { once: true });
  });
  return socket;
}

function createCdpClient(socket) {
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve: resolvePromise, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(`${message.error.message} (${message.method || 'CDP'})`));
      else resolvePromise(message.result || {});
      return;
    }
    const handlers = listeners.get(message.method) || [];
    handlers.forEach((handler) => handler(message.params || {}));
  });

  function send(method, params = {}) {
    nextId += 1;
    const id = nextId;
    return new Promise((resolvePromise, reject) => {
      pending.set(id, { resolve: resolvePromise, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  function on(method, handler) {
    const handlers = listeners.get(method) || [];
    handlers.push(handler);
    listeners.set(method, handlers);
  }

  function once(method, timeoutMs = 10_000) {
    return new Promise((resolvePromise, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${method}.`)), timeoutMs);
      on(method, (params) => {
        clearTimeout(timeout);
        resolvePromise(params);
      });
    });
  }

  return { send, on, once };
}

async function main() {
  const chrome = await firstExisting([
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]);
  if (!chrome) throw new Error('Chrome/Edge not found. Set CHROME_PATH to run the browser smoke.');
  const previewProcess = await ensurePreviewServer();

  const profile = join(tmpdir(), `zerokit-browser-smoke-${randomUUID()}`);
  await mkdir(profile, { recursive: true });
  const browserProcess = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true });

  let socket;
  try {
    const activePort = await waitForFile(join(profile, 'DevToolsActivePort'));
    const [port] = activePort.trim().split(/\r?\n/);
    const createResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(TARGET)}`, { method: 'PUT' });
    if (!createResponse.ok) throw new Error(`Chrome target creation failed: HTTP ${createResponse.status}`);
    const target = await createResponse.json();
    socket = await connectWebSocket(target.webSocketDebuggerUrl);
    const cdp = createCdpClient(socket);
    const requests = [];
    const exceptions = [];
    cdp.on('Network.requestWillBeSent', ({ request }) => { if (request?.url) requests.push(request.url); });
    cdp.on('Runtime.exceptionThrown', ({ exceptionDetails }) => {
      exceptions.push(exceptionDetails?.exception?.description || exceptionDetails?.text || 'Unknown exception');
    });

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Network.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 1,
      mobile: true,
      screenWidth: 375,
      screenHeight: 812,
    });

    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: TARGET });
    await loaded;

    async function evaluate(expression) {
      const response = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || 'Browser evaluation failed.');
      return response.result?.value;
    }

    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await evaluate(`document.querySelector('#status')?.textContent?.startsWith('PASS')`)) break;
      if (attempt === 39) throw new Error('Preview did not reach PASS state.');
      await sleep(100);
    }

    const passProof = await evaluate(`(() => ({
      url: location.href,
      lang: document.documentElement.lang,
      theme: document.documentElement.dataset.theme,
      scenario: document.querySelector('#sampleSelect')?.value,
      status: document.querySelector('#status')?.textContent,
      metrics: [...document.querySelectorAll('.metrics strong')].map((node) => Number(node.textContent)),
      viewport: [innerWidth, innerHeight],
      scrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      shortButtons: [...document.querySelectorAll('button')].filter((node) => node.getBoundingClientRect().height < 44).map((node) => node.id),
      rawI18nKeys: [...document.querySelectorAll('[data-i18n]')].filter((node) => node.textContent === node.dataset.i18n).length,
      hiddenPanels: [...document.querySelectorAll('.chip.hidden')].map((node) => node.textContent),
      privacyNotes: document.querySelectorAll('#warningList .privacy').length
    }))()`);

    const menuProof = await evaluate(`(() => {
      const button = document.querySelector('#menuButton');
      button.click();
      const opened = document.body.classList.contains('nav-open') && button.getAttribute('aria-expanded') === 'true';
      document.querySelector('#sidebarBackdrop').click();
      const closed = !document.body.classList.contains('nav-open') && button.getAttribute('aria-expanded') === 'false';
      return { opened, closed };
    })()`);

    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
    if (!SCREENSHOT.startsWith(`${ROOT}${sep}`)) throw new Error('Unsafe screenshot output path.');
    await mkdir(dirname(SCREENSHOT), { recursive: true });
    await writeFile(SCREENSHOT, Buffer.from(screenshot.data, 'base64'));

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 1440,
      screenHeight: 1000,
    });
    const desktopScreenshot = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: true });
    if (!DESKTOP_SCREENSHOT.startsWith(`${ROOT}${sep}`)) throw new Error('Unsafe desktop screenshot output path.');
    await writeFile(DESKTOP_SCREENSHOT, Buffer.from(desktopScreenshot.data, 'base64'));

    const invalidProof = await evaluate(`(() => {
      const input = document.querySelector('#configInput');
      input.value = '{"panel_registry":';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('#validateButton').click();
      return {
        status: document.querySelector('#status')?.textContent,
        errorVisible: Boolean(document.querySelector('#warningList .error'))
      };
    })()`);

    const reloaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.reload', { ignoreCache: true });
    await reloaded;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await evaluate(`document.querySelector('#status')?.textContent?.startsWith('PASS')`)) break;
      if (attempt === 39) throw new Error('Preview did not recover after reload.');
      await sleep(100);
    }

    await evaluate(`document.body.focus()`);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    const tabProof = await evaluate(`({ className: document.activeElement?.className, text: document.activeElement?.textContent })`);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    const keyboardProof = await evaluate(`({ activeId: document.activeElement?.id, hash: location.hash })`);

    const pageOrigin = new URL(TARGET).origin;
    const externalRequests = requests.filter((url) => /^https?:/i.test(url) && new URL(url).origin !== pageOrigin);
    const assertions = [
      ['TR locale', passProof.lang === 'tr'],
      ['light theme', passProof.theme === 'light'],
      ['healthcare scenario', passProof.scenario === 'healthcare-saas'],
      ['PASS status', passProof.status?.startsWith('PASS')],
      ['metrics 8/2/4/8', JSON.stringify(passProof.metrics) === JSON.stringify([8, 2, 4, 8])],
      ['375px viewport', passProof.viewport[0] === 375],
      ['no horizontal overflow', passProof.horizontalOverflow === false && passProof.scrollWidth <= 375],
      ['44px controls and mobile menu', passProof.shortButtons.length === 0 && menuProof.opened && menuProof.closed],
      ['no raw i18n keys', passProof.rawI18nKeys === 0],
      ['hidden panels', passProof.hiddenPanels.includes('impersonation') && passProof.hiddenPanels.includes('chat')],
      ['privacy notes visible', passProof.privacyNotes === 3],
      ['invalid JSON fails visibly', invalidProof.status?.startsWith('FAIL') && invalidProof.errorVisible],
      ['skip link receives first focus', String(tabProof.className).includes('skip-link')],
      ['skip link reaches config input', keyboardProof.activeId === 'configInput' && keyboardProof.hash === '#configInput'],
      ['no external requests', externalRequests.length === 0],
      ['no runtime exceptions', exceptions.length === 0],
    ];
    const failed = assertions.filter(([, passed]) => !passed);
    console.log(JSON.stringify({
      browser: chrome,
      screenshot: SCREENSHOT,
      desktopScreenshot: DESKTOP_SCREENSHOT,
      passProof,
      menuProof,
      invalidProof,
      tabProof,
      keyboardProof,
      externalRequests,
      exceptions,
      assertions: Object.fromEntries(assertions),
    }, null, 2));
    if (failed.length) throw new Error(`Browser smoke failed: ${failed.map(([name]) => name).join(', ')}`);
    console.log('PASS Browser smoke: 16/16 assertions.');
  } finally {
    if (socket?.readyState === WebSocket.OPEN) socket.close();
    if (browserProcess.exitCode === null) {
      const exited = onceEvent(browserProcess, 'exit');
      browserProcess.kill();
      await Promise.race([exited, sleep(3_000)]);
    }
    const safeTempRoot = resolve(tmpdir());
    if (resolve(profile).startsWith(`${safeTempRoot}${sep}`)) {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        try {
          await rm(profile, { recursive: true, force: true });
          break;
        } catch (error) {
          if (!['EBUSY', 'EPERM'].includes(error?.code) || attempt === 4) {
            console.warn(`WARN Could not remove temporary browser profile: ${error?.message || error}`);
            break;
          }
          await sleep(200);
        }
      }
    }
    if (previewProcess?.exitCode === null) {
      const exited = onceEvent(previewProcess, 'exit');
      previewProcess.kill();
      await Promise.race([exited, sleep(3_000)]);
    }
  }
}

try {
  await main();
} catch (error) {
  console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
