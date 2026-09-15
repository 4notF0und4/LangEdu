import { expect, test } from "@playwright/test";

test("Ensiklopediya mündəricatı, mənbə istinadları və ad keçidləri işləyir", async ({
  page,
}) => {
  await page.goto("/python/melumat");
  expect(await page.locator('#sintaksis pre code').textContent()).toBe('ad = "Aysel"\nif ad:\n    print(f"Salam, {ad}!")');
  expect(await page.locator('#idarəetmə pre code').textContent()).toBe('def kvadrat(eded):\n    return eded * eded\n\nfor eded in range(1, 4):\n    print(kvadrat(eded))');
  const toc = page.getByRole("navigation", { name: "Məqalənin mündəricatı" });
  await toc.getByRole("link", { name: "Yaranması və müəllifi" }).click();
  await expect(page).toHaveURL(/#tarixce$/);
  await expect(page.locator("#tarixce")).toBeInViewport();
  await expect(
    page
      .locator("#tarixce")
      .getByRole("link", { name: "Guido van Rossum", exact: true }),
  ).toHaveAttribute("href", "https://gvanrossum.github.io/");
  await page.locator("#tarixce .source-citation a").first().click();
  await expect(page).toHaveURL(/#ref-guido$/);
  await expect(page.locator("#ref-guido")).toBeInViewport();
  await expect(page.locator("#ref-guido a")).toHaveAttribute(
    "href",
    "https://gvanrossum.github.io/",
  );

  const brokenAnchors = await page
    .locator('main a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter(
          (href) => !document.getElementById(decodeURIComponent(href.slice(1))),
        ),
    );
  expect(brokenAnchors).toEqual([]);
  const sources = page.locator(".reference-bibliography li a");
  expect(await sources.count()).toBeGreaterThanOrEqual(20);
  for (const href of await sources.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!),
  )) {
    expect(new URL(href).protocol).toBe("https:");
  }
  await page.getByRole("link", { name: "Məqalənin əvvəlinə qayıt" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("Ensiklopediya mobil ekranda cədvəl və mənbələrlə oxunur", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/python/melumat#tipler");
  await expect(
    page.getByRole("table", { name: "Əsas tiplərə baxış" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("navigation", { name: "Məqalənin mündəricatı" })
    .getByRole("link", { name: "İstinadlar və mənbələr" })
    .click();
  await expect(page).toHaveURL(/#menbeler$/);
  await expect(
    page.getByRole("heading", { name: "İstinadlar və mənbələr" }),
  ).toBeInViewport();
});
