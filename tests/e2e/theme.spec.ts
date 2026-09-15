import { expect, test } from "@playwright/test";

test("Rejim dəyişir, naviqasiya və yenilənmədən sonra saxlanır", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const picker = page.getByRole("combobox", { name: "Rəng rejimi" });
  // Wait for Nuxt hydration before interacting with a server-rendered control.
  await expect(
    page.getByRole("button", { name: "Hamısı", exact: true }),
  ).toBeEnabled();
  await picker.selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.getByRole("link", { name: "Python sahəsi", exact: true }).click();
  await expect(picker).toHaveValue("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(picker).toHaveValue("dark");
  await picker.selectOption("light");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
});

test("Sistem rejimi əməliyyat sisteminin görünüşünü izləyir", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/python/melumat");
  await expect(page.getByRole("combobox", { name: "Rəng rejimi" })).toHaveValue(
    "system",
  );
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
});
