import { expect, test } from '@playwright/test';

const healthUrl = 'http://localhost:3001/api/health';

test('Nuxt səhifəsi NestJS-dən real cavab alır və sorğunu təkrarlayır', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));

  const firstResponse = page.waitForResponse(healthUrl);
  await page.goto('/');
  const response = await firstResponse;
  expect(response.status()).toBe(200);
  expect(response.headers()['access-control-allow-origin']).toBe('http://localhost:3000');
  const body = await response.json();
  expect(body).toEqual({ status: 'ok', service: 'langedu-api', timestamp: expect.any(String) });
  expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  await expect(page.getByRole('status')).toHaveText('Bağlantı uğurludur');
  await expect(page.getByTestId('health-response')).toContainText(body.timestamp);

  const nextResponse = page.waitForResponse(healthUrl);
  await page.getByRole('button', { name: 'Yenidən yoxla' }).click();
  const updatedBody = await (await nextResponse).json();
  expect(updatedBody.timestamp).not.toBe(body.timestamp);
  await expect(page.getByTestId('health-response')).toContainText(updatedBody.timestamp);
  expect(browserErrors).toEqual([]);
});

test('Əlaqə xətası göstərilir və təkrar sorğu ilə bərpa olunur', async ({ page }) => {
  await page.route(healthUrl, (route) => route.abort('failed'));
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('Serverə qoşulmaq mümkün olmadı');
  await expect(page.getByTestId('health-response')).toHaveCount(0);

  await page.unroute(healthUrl);
  await page.getByRole('button', { name: 'Yenidən yoxla' }).click();
  await expect(page.getByRole('status')).toHaveText('Bağlantı uğurludur');
  await expect(page.getByTestId('health-response')).toContainText('langedu-api');
});
