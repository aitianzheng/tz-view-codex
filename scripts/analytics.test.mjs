import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { trackEvent } from '../app/analytics.ts';

afterEach(() => { delete globalThis.window; });

test('server rendering does not access browser globals', async () => {
  assert.equal(await trackEvent('service_click', 'tz_mall', 'hero'), false);
});

test('missing Zaraz is safe and does not claim delivery', async () => {
  globalThis.window = { navigator: {} };
  assert.equal(await trackEvent('contact_click', 'wechat', 'hero'), false);
});

test('Mall and Shop clicks carry distinct destination and placement labels', async () => {
  const events = [];
  globalThis.window = { navigator: {}, zaraz: { track: (...args) => { events.push(args); } } };
  assert.equal(await trackEvent('service_click', 'tz_mall', 'hero'), true);
  assert.equal(await trackEvent('service_click', 'tz_shop', 'projects'), true);
  assert.deepEqual(events, [
    ['service_click', { destination: 'tz_mall', placement: 'hero' }],
    ['service_click', { destination: 'tz_shop', placement: 'projects' }],
  ]);
});

test('WeChat contact and QR download are separate from email copy', async () => {
  const events = [];
  globalThis.window = { navigator: {}, zaraz: { track: async (...args) => { events.push(args); } } };
  for (const [event, destination] of [
    ['contact_click', 'wechat'], ['wechat_qr_download', 'wechat'], ['contact_copy', 'email'],
  ]) await trackEvent(event, destination, 'contact');
  assert.equal(events.length, 3);
  assert.deepEqual(events.map(([event]) => event), ['contact_click', 'wechat_qr_download', 'contact_copy']);
  for (const [, fields] of events) assert.deepEqual(Object.keys(fields), ['destination', 'placement']);
});

for (const privacy of [{ doNotTrack: '1' }, { globalPrivacyControl: true }]) {
  test(`privacy preference ${JSON.stringify(privacy)} prevents tracking`, async () => {
    let called = false;
    globalThis.window = { navigator: privacy, zaraz: { track: () => { called = true; } } };
    assert.equal(await trackEvent('service_click', 'tz_shop', 'footer'), false);
    assert.equal(called, false);
  });
}

test('tracking rejection is contained', async () => {
  globalThis.window = { navigator: {}, zaraz: { track: async () => { throw Error('unavailable'); } } };
  assert.equal(await trackEvent('content_click', 'x', 'contact'), false);
});

test('selected posts are identifiable without sending their URLs', async () => {
  const events = [];
  globalThis.window = { navigator: {}, zaraz: { track: (...args) => { events.push(args); } } };
  await trackEvent('content_click', 'us_stocks', 'writing');
  await trackEvent('content_click', 'hk_banking', 'writing');
  assert.deepEqual(events, [
    ['content_click', { destination: 'us_stocks', placement: 'writing' }],
    ['content_click', { destination: 'hk_banking', placement: 'writing' }],
  ]);
});

test('synchronous vendor failure is contained', async () => {
  globalThis.window = { navigator: {}, zaraz: { track: () => { throw Error('blocked'); } } };
  assert.equal(await trackEvent('contact_click', 'telegram', 'contact'), false);
});

test('community inquiry uses a distinct placement without collecting introductions', async () => {
  const events = [];
  globalThis.window = { navigator: {}, zaraz: { track: (...args) => { events.push(args); } } };
  assert.equal(await trackEvent('contact_click', 'wechat', 'community'), true);
  assert.deepEqual(events, [['contact_click', { destination: 'wechat', placement: 'community' }]]);
});
