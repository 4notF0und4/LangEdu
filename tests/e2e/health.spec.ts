import { expect, test } from '@playwright/test';

test('NestJS health endpointi işləyir', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/health');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toEqual({ status: 'ok', service: 'langedu-api', timestamp: expect.any(String) });
  expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
});
