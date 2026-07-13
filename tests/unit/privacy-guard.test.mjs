import assert from 'node:assert/strict';
import test from 'node:test';
import { assertPrivacySafe, auditPrivacyText } from '../../ai-buildweek/lib/privacy-guard.mjs';

test('privacy guard accepts synthetic requirements and reserved email domains', () => {
  const result = auditPrivacyText('Synthetic owner demo@example.test; route /api/demo; no production records.');
  assert.equal(result.safeToSend, true);
  assert.equal(result.blockers.length, 0);
});

test('privacy guard blocks real-looking emails and secrets', () => {
  const bearer = ['Authorization:', 'Bearer', 'abcdefghijklmnopqrstuvwxyz12345'].join(' ');
  const result = auditPrivacyText(`Contact ada@customer.co and use ${bearer}`);
  assert.equal(result.safeToSend, false);
  assert.deepEqual(new Set(result.blockers.map((item) => item.code)), new Set(['non_reserved_email', 'authorization_header']));
  const apiKeyFixture = ['sk-proj', 'abcdefghijklmnopqrstuvwxyz123456'].join('-');
  assert.throws(() => assertPrivacySafe(apiKeyFixture), /Privacy guard blocked/);
});

test('privacy guard marks identifiers and production language for human review', () => {
  const result = auditPrivacyText('Production dump reference 123e4567-e89b-12d3-a456-426614174000 must be replaced.');
  assert.equal(result.safeToSend, true);
  assert.ok(result.reviewItems.some((item) => item.code === 'uuid'));
  assert.ok(result.reviewItems.some((item) => item.code === 'production_marker'));
});
