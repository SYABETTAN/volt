import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("affiche la démonstration et refuse l’indexation", async ({ page }) => {
  await expect(
    page.getByText("Site de démonstration — entreprise fictive.").first(),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0,
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "L’électricité",
  );
});

test("la navigation interne aboutit", async ({ page }) => {
  await page.getByRole("link", { name: "Réalisations" }).first().click();
  await expect(page.locator("#realisations")).toBeInViewport();
  await page.getByRole("link", { name: "Mentions légales" }).click();
  await expect(page).toHaveURL(/mentions-legales/);
  await expect(page.getByText("entreprise fictive").first()).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("personnalise puis revient à VOLT", async ({ page, isMobile }) => {
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("dialog", { name: "Menu" })
      .getByRole("button", { name: "Visualiser" })
      .click();
  } else {
    await page.getByRole("button", { name: "Visualiser" }).click();
  }
  const field = page.getByLabel("Nom de l’entreprise");
  await field.fill("<img src=x onerror=alert(1)>");
  await expect(page.locator(".brand-name").first()).toHaveText(
    "img src=x onerror=alert(1)",
  );
  await expect(page.locator("img[src='x']")).toHaveCount(0);
  await field.fill("Électricité Martin");
  await expect(page.locator(".brand-name").first()).toHaveText(
    "Électricité Martin",
  );
  await page.getByRole("radio", { name: "Cuivre" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "cuivre");
  await page.getByRole("button", { name: "Revenir à VOLT" }).click();
  await expect(page.locator(".brand-name").first()).toHaveText("VOLT");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "volt");
});

test("ouvre les offres et prépare un e-mail sans succès fictif", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Je veux un site comme celui-ci" })
    .first()
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Je veux un site comme celui-ci",
  });
  await expect(dialog.getByText(/1\s290/).first()).toBeVisible();
  await expect(dialog.getByText("Offre principale")).toBeVisible();
  await dialog.getByRole("button", { name: /Acquisition locale/ }).click();
  await dialog.getByLabel("Nom / entreprise").fill("Atelier Martin");
  await dialog.getByLabel("E-mail professionnel").fill("mauvais");
  await dialog.getByRole("button", { name: "Préparer l’e-mail" }).click();
  await expect(dialog.getByRole("status")).toContainText("erreurs");
  await expect(dialog.getByRole("status")).not.toContainText("envoyé");

  await dialog.getByLabel("E-mail professionnel").fill("martin@example.com");
  await dialog
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Bonjour, je veux un site pour mon entreprise d’électricité.");
  await dialog.getByRole("checkbox").check();
  await page.evaluate(() => {
    const original = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
      if (this.href.startsWith("mailto:")) {
        (window as unknown as { __mailto?: string }).__mailto = this.href;
        return;
      }
      return original.call(this);
    };
  });
  await dialog.getByRole("button", { name: "Préparer l’e-mail" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "application de messagerie",
  );
  await expect(dialog.getByRole("status")).not.toContainText("message envoyé");
  const href = await page.evaluate(
    () => (window as unknown as { __mailto?: string }).__mailto || "",
  );
  expect(href).toContain("mailto:syabettan@gmail.com");
});

test("simule un devis sans transmission", async ({ page }) => {
  await page.locator("#devis").scrollIntoViewIfNeeded();
  await page.getByRole("radio", { name: "Mise en sécurité" }).check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("radio", { name: "Appartement" }).check();
  await page.getByLabel("Horizon souhaité").selectOption("Dans le mois");
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Terminer la simulation" }).click();
  await expect(
    page.getByText("Aucune demande n’a été transmise"),
  ).toBeVisible();
});

test("agrandit un projet au clavier", async ({ page }) => {
  const card = page.getByRole("button", { name: /Pièce de vie ouverte/ });
  await card.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Pièce de vie ouverte" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("heading", { name: "Volume avec escalier" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("ne déborde pas horizontalement", async ({ page }, info) => {
  test.skip(
    info.project.name !== "chromium" && info.project.name !== "mobile-chrome",
  );
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("menu mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "réservé aux projets mobiles");
  await page.getByRole("button", { name: "Menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await dialog.getByRole("link", { name: "Zone" }).click();
  await expect(page.locator("#zone")).toBeInViewport();
});

test("accessibilité automatisée", async ({ page }, info) => {
  test.skip(
    info.project.name !== "chromium" && info.project.name !== "mobile-chrome",
  );
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
