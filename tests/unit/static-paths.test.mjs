import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPreviewUrl, buildSampleUrl } from '../../frontend/js/static-paths.js';

test('root redirect preserves a GitHub Pages project subpath and query options', () => {
  assert.equal(
    buildPreviewUrl('https://zyganali-glitch.github.io/zerokit-ai-control-plane/?lang=en&scenario=school-saas').href,
    'https://zyganali-glitch.github.io/zerokit-ai-control-plane/frontend/pages/ai-config-preview.html?lang=en&scenario=school-saas',
  );
});

test('sample URL resolves inside the same GitHub Pages project', () => {
  assert.equal(
    buildSampleUrl('school-saas', 'https://zyganali-glitch.github.io/zerokit-ai-control-plane/frontend/js/ai-config-preview.js').href,
    'https://zyganali-glitch.github.io/zerokit-ai-control-plane/ai-buildweek/examples/school-saas.generated.config.json',
  );
});
