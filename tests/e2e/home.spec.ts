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
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://volt-paris-project.vercel.app/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://volt-paris-project.vercel.app/og.jpg",
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

test("propose la visualisation dès le premier écran", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Visualiser mon futur site" }).first(),
  ).toBeVisible();
  await expect(page.getByText("Vous êtes électricien ?").first()).toBeVisible();
});

test("personnalise puis revient à VOLT", async ({ page, isMobile }) => {
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("dialog", { name: "Menu" })
      .getByRole("button", { name: "Visualiser mon futur site" })
      .click();
  } else {
    await page
      .getByRole("button", { name: "Visualiser mon futur site" })
      .first()
      .click();
  }
  const dialog = page.getByRole("dialog", {
    name: "Imaginez ce site pour votre entreprise.",
  });
  const field = dialog.getByLabel("Nom de l’entreprise");
  await field.fill("<img src=x onerror=alert(1)>");
  await expect(page.locator(".brand-name").first()).toHaveText(
    "img src=x onerror=alert(1)",
  );
  await expect(page.locator("img[src='x']")).toHaveCount(0);
  await expect(dialog.getByText("Vous aimez ce résultat ?")).toBeVisible();
  await field.fill("Électricité Martin");
  await expect(page.locator(".brand-name").first()).toHaveText(
    "Électricité Martin",
  );
  await dialog.getByRole("radio", { name: "Cuivre" }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "cuivre");
  await dialog.getByRole("button", { name: "Je veux mon site" }).click();
  await expect(
    page.getByRole("dialog", { name: /Un site professionnel/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Visualiser mon futur site" })
    .first()
    .click();
  await page.getByRole("button", { name: "Revenir à VOLT" }).click();
  await expect(page.locator(".brand-name").first()).toHaveText("VOLT");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "volt");
  await expect(page.getByText("Vous aimez ce résultat ?")).toBeHidden();
});

test("ouvre les offres et prépare un e-mail sans succès fictif", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Je veux mon site" }).first().click();
  const dialog = page.getByRole("dialog", {
    name: /Un site professionnel/,
  });
  await expect(dialog.getByText(/1\s290/).first()).toBeVisible();
  await expect(
    dialog.getByText("Offre principale", { exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Comment ça marche" }),
  ).toBeVisible();
  await expect(dialog.getByText("Garantie VOLT Sérénité")).toBeVisible();
  await dialog.locator("summary", { hasText: "Deux autres formules" }).click();
  await dialog.getByRole("button", { name: "Choisir Essentiel" }).click();
  await dialog.getByLabel("Nom", { exact: true }).fill("Camille Martin");
  await dialog.getByLabel("Entreprise").fill("Atelier Martin");
  await dialog.getByLabel("E-mail professionnel").fill("mauvais");
  await dialog
    .getByRole("button", { name: "Préparer la demande de présentation" })
    .click();
  await expect(dialog.getByRole("status")).toContainText("erreurs");
  await expect(dialog.getByRole("status")).not.toContainText("envoyé");

  await dialog.getByLabel("E-mail professionnel").fill("martin@example.com");
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
  await dialog
    .getByRole("button", { name: "Préparer la demande de présentation" })
    .click();
  await expect(dialog.getByRole("status")).toContainText(
    "application de messagerie",
  );
  await expect(dialog.getByRole("status")).not.toContainText("envoyé");
  const href = await page.evaluate(
    () => (window as unknown as { __mailto?: string }).__mailto || "",
  );
  expect(href).toContain("mailto:syabettan@gmail.com");
  expect(decodeURIComponent(href)).toContain("Essentiel");
  expect(decodeURIComponent(href)).not.toContain("message envoyé");
});

test("prépare un diagnostic sans score inventé", async ({ page }) => {
  await page
    .getByRole("button", { name: "Diagnostic gratuit" })
    .first()
    .click();
  const dialog = page.getByRole("dialog", { name: /Diagnostic gratuit/ });
  await expect(dialog.getByText("n’affiche aucun score")).toBeVisible();
  await dialog.getByRole("radio", { name: "J’ai déjà un site" }).check();
  await dialog.getByLabel("Nom", { exact: true }).fill("Camille Martin");
  await dialog.getByLabel("Entreprise").fill("Atelier Martin");
  await dialog.getByLabel("E-mail professionnel").fill("martin@example.com");
  await dialog
    .getByRole("button", { name: "Préparer la demande de diagnostic" })
    .click();
  await expect(dialog.getByRole("status")).toContainText("erreurs");
  await dialog.getByLabel(/Site actuel/).fill("atelier-martin.fr");
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
  await dialog
    .getByRole("button", { name: "Préparer la demande de diagnostic" })
    .click();
  await expect(dialog.getByRole("status")).not.toContainText("envoyé");
  const href = await page.evaluate(
    () => (window as unknown as { __mailto?: string }).__mailto || "",
  );
  const decoded = decodeURIComponent(href);
  expect(decoded).toContain("Diagnostic");
  expect(decoded).toContain("Aucun score");
  expect(decoded).not.toContain("martin@example.com/100");
});

test("n’inscrit pas l’e-mail dans les événements", async ({ page }) => {
  await page.evaluate(() => {
    const target = window as unknown as { __events?: unknown[] };
    target.__events = [];
    window.addEventListener("volt:commerce", (event) => {
      target.__events?.push((event as CustomEvent).detail);
    });
  });
  await page.getByRole("button", { name: "Je veux mon site" }).first().click();
  const dialog = page.getByRole("dialog", { name: /Un site professionnel/ });
  await dialog.getByLabel("Nom", { exact: true }).fill("Camille Martin");
  await dialog.getByLabel("Entreprise").fill("Atelier Martin");
  await dialog
    .getByLabel("E-mail professionnel")
    .fill("camille.martin.secret@example.com");
  await page.evaluate(() => {
    HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
      if (this.href.startsWith("mailto:")) return;
    };
  });
  await dialog
    .getByRole("button", { name: "Préparer la demande de présentation" })
    .click();
  const dumped = await page.evaluate(() =>
    JSON.stringify(
      (window as unknown as { __events?: unknown[] }).__events || [],
    ),
  );
  expect(dumped).not.toContain("camille.martin.secret@example.com");
  expect(dumped).not.toContain("Camille Martin");
  expect(dumped).toContain("presentation_requested");
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

test("centre le dialogue des offres", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium", "géométrie mesurée sur Chromium");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.getByRole("button", { name: "Je veux mon site" }).first().click();
  const dialog = page.getByRole("dialog", { name: /Un site professionnel/ });
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      dialog.evaluate((node) => Number(getComputedStyle(node).opacity)),
    )
    .toBeGreaterThan(0.95);
  const box = await dialog.boundingBox();
  expect(box?.x ?? 0).toBeGreaterThan(40);
  await expect(
    dialog.getByRole("heading", { name: "VOLT Acquisition locale" }),
  ).toBeVisible();
});

test("ferme la visualisation avec Échap", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium", "parcours clavier sur Chromium");
  const opener = page
    .getByRole("button", { name: "Visualiser mon futur site" })
    .first();
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", {
    name: "Imaginez ce site pour votre entreprise.",
  });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("accessibilité automatisée", async ({ page }, info) => {
  test.skip(
    info.project.name !== "chromium" && info.project.name !== "mobile-chrome",
  );
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
