import { expect, test } from "@playwright/test";

test("Kataloq axtarışı və kateqoriyalar uyğun texnologiyaları göstərir", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Framework-lər", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Vue", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Python", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Hamısı", exact: true }).click();
  await page.getByRole("searchbox").fill("python");
  await expect(
    page.getByRole("heading", { name: "Python", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "JavaScript", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("searchbox").fill("mövcud-deyil");
  await expect(page.getByRole("status")).toContainText(
    "Uyğun texnologiya tapılmadı",
  );
});

test("Python sahəsində icmal, məlumat və praktika arasında keçid", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Python sahəsinə keç" }).click();
  await expect(page).toHaveURL(/\/python$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Salam, Python.",
  );
  const tabs = page.getByRole("navigation", { name: "Bölmələr", exact: true });
  await tabs.getByRole("link", { name: "Məlumat", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Python nədir?",
  );
  await tabs.getByRole("link", { name: "Praktika", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Kod meydançası" }),
  ).toBeVisible();
  await expect(page.getByText("Hazırlanır", { exact: true })).toHaveCount(4);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bilikdən praktikaya.",
  );
});

test("Mobil görünüşdə kataloq və Python menyusu ekran daxilindədir", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/python",
    "/python/melumat",
    "/python/praktika",
    "/python/ilk-proqram",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("navigation", { name: "Bölmələr", exact: true })
    .getByRole("link", { name: "İcmal", exact: true })
    .click();
  await expect(page).toHaveURL(/\/python$/);
});
