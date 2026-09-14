import { expect, test } from '@playwright/test';

const lessonUrl = 'http://localhost:3001/api/lessons/ilk-proqram';

test('Ana səhifədən dərsə keçid real API məzmununu göstərir', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const responsePromise = page.waitForResponse(lessonUrl);
  await page.getByRole('link', { name: 'İlk dərsə başla' }).click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  const lesson = await response.json();
  expect(lesson.slug).toBe('ilk-proqram');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
  await expect(page.getByRole('heading', { name: 'Python nədir?' })).toBeVisible();
  await expect(page.getByTestId('lesson-code')).toHaveText('print("Salam, dünya!")');
  await expect(page.getByTestId('lesson-output')).toHaveText('Salam, dünya!');
  await expect(page).toHaveTitle(`${lesson.title} — LangEdu`);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
  expect(errors).toEqual([]);
});

test('Dərs yüklənməsi, şəbəkə xətası və təkrar cəhd', async ({ page }) => {
  let releaseRequest!: () => void;
  const gate = new Promise<void>((resolve) => { releaseRequest = resolve; });
  await page.route(lessonUrl, async (route) => { await gate; await route.abort('failed'); });
  await page.goto('/python/ilk-proqram');
  try {
    await expect(page.getByRole('status')).toHaveText('Dərs yüklənir…');
  } finally { releaseRequest(); }
  await expect(page.getByRole('alert')).toContainText('Dərsi yükləmək mümkün olmadı');
  await page.unroute(lessonUrl);
  await page.getByRole('button', { name: 'Yenidən yoxla' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Python ilə ilk proqramın');
});

test('Mövcud olmayan dərs API-də 404, səhifədə aydın mesaj qaytarır', async ({ page, request }) => {
  const response = await request.get('http://localhost:3001/api/lessons/yoxdur');
  expect(response.status()).toBe(404);
  await page.goto('/python/ilk-proqram');
  await expect(page.getByTestId('lesson-code')).toBeVisible();
  await page.goto('/python/yoxdur');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dərs tapılmadı');
  await expect(page.getByTestId('lesson-code')).toHaveCount(0);
  await page.getByRole('link', { name: '← Ana səhifə' }).click();
  await expect(page.getByRole('link', { name: 'İlk dərsə başla' })).toBeVisible();
});
