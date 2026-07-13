#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { adaptPocketBaseUsers } from '../lib/pocketbase-adapter.mjs';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node ai-buildweek/scripts/adapt-pocketbase-users.mjs <pocketbase-response.json>');
  process.exitCode = 2;
} else {
  try {
    const payload = JSON.parse(await readFile(resolve(input), 'utf8'));
    const adapted = adaptPocketBaseUsers(payload);
    console.log(JSON.stringify(adapted, null, 2));
    console.error(`PASS PocketBase adapter: ${payload.items.length} items -> ${adapted.users.length} users; totalItems -> total (${adapted.total})`);
  } catch (error) {
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
