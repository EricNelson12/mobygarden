import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldShowUpcoming } from '../src/utils/eventStatus.js';

test('shows upcoming for future event dates', () => {
  const now = new Date('2026-08-05T10:00:00Z');
  assert.equal(shouldShowUpcoming('2026-08-16', null, now), true);
});

test('shows upcoming for future event times on the same date', () => {
  const now = new Date('2026-08-16T10:00:00Z');
  assert.equal(shouldShowUpcoming('2026-08-16', '11:00 AM', now), true);
});

test('does not show upcoming for past event times', () => {
  const now = new Date(2026, 7, 16, 12, 0);
  assert.equal(shouldShowUpcoming('2026-08-16', '11:00 AM', now), false);
});
