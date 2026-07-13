import assert from 'node:assert/strict';
import test from 'node:test';
import { adaptPocketBaseUsers } from '../../ai-buildweek/lib/pocketbase-adapter.mjs';

test('PocketBase list envelope maps to the strict ZeroKit users contract', () => {
  const result = adaptPocketBaseUsers({
    page: 1,
    perPage: 30,
    totalItems: 1,
    totalPages: 1,
    items: [{
      id: 'usr_demo_01',
      display_name: 'Synthetic User',
      role: 'teacher',
      account_status: 'active',
      campus: 'north',
    }],
  });
  assert.deepEqual(result, {
    users: [{
      id: 'usr_demo_01',
      display_name: 'Synthetic User',
      role: 'teacher',
      account_status: 'active',
      campus: 'north',
      department: null,
      support_status: null,
    }],
    total: 1,
  });
});
test('PocketBase adapter fails closed on missing envelope and record keys', () => {
  assert.throws(() => adaptPocketBaseUsers({ totalItems: 0 }), /items must be an array/);
  assert.throws(() => adaptPocketBaseUsers({ totalItems: -1, items: [] }), /non-negative integer/);
  assert.throws(() => adaptPocketBaseUsers({ totalItems: 1, items: [{ id: 'only-id' }] }), /display_name/);
});
