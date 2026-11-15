import { describe, expect, it } from "vitest";
import { ACCENT_PRESETS } from "../../src/lib/accents";
import { contrastRatio } from "../../src/lib/contrast";
import { site } from "../../src/config/site";
import { validateDeployment } from "../../src/lib/deployment";
import { formatEuros, formatMonthly } from "../../src/lib/format";
import { buildInquiryMailto, validateInquiry } from "../../src/lib/inquiry";
import { sanitizeBrandName } from "../../src/lib/sanitize";
import { structuredData } from "../../src/lib/schema";
import type { SiteConfig } from "../../src/types/content";

const INK = "#1a1916";
const CHARCOAL = "#171614";

describe("démonstration", () => {
  it("accepte la configuration publiée", () => {
    expect(validateDeployment(site)).toEqual([]);
    expect(site.mode).toBe("demo");
    expect(site.indexing).toBe("noindex");
  });

  it("ne produit aucune donnée structurée", () => {
    expect(structuredData(site)).toBeNull();
  });

  it("refuse d’indexer la fiction", () => {
    const next = structuredClone(site) as SiteConfig;
    next.indexing = "index";
    expect(validateDeployment(next).length).toBeGreaterThan(0);
  });
});

describe("mode client", () => {
  it("refuse un simple basculement sans contenu vérifié", () => {
    const next = structuredClone(site) as SiteConfig;
    next.mode = "client";
    expect(validateDeployment(next).join(" ")).toMatch(
      /fiction|illustratif|certification|légal/i,
    );
  });

  it("accepte un dossier complet sans avis inventés", () => {
    const next = structuredClone(site) as SiteConfig;
    next.mode = "client";
    next.indexing = "noindex";
    next.showFictionLabels = false;
    next.showAgencyCta = false;
    next.quoteFlow = "mailto";
    next.legal = {
      clientSupplied: true,
      privacy:
        "Politique de confidentialité fournie par l’entreprise cliente. Elle décrit la finalité du formulaire de contact, la durée de conservation, l’identité du responsable de traitement et les droits d’accès, de rectification et d’opposition, avec un contact réel vérifié avant la mise en ligne.",
      mentions:
        "Mentions légales fournies par l’entreprise cliente, comprenant sa raison sociale, sa forme juridique, son contact professionnel et les informations d’hébergement qu’elle a effectivement vérifiées avant publication du site.",
    };
    next.business = {
      brand: "Martin",
      descriptor: "Électricité",
      cityLabel: "Lyon",
      legalName: "Martin Électricité",
      email: "contact@example.com",
      publishAddress: false,
    };
    next.testimonials = [];
    next.stats = [];
    next.projects = [];
    next.certifications = [];
    expect(validateDeployment(next)).toEqual([]);
    expect(structuredData(next)).toBeNull();
  });
});

describe("nom affiché", () => {
  it("retire les balises et limite la longueur", () => {
    expect(sanitizeBrandName("<img src=x onerror=alert(1)>")).toBe(
      "img src=x onerror=alert(1)",
    );
    expect(sanitizeBrandName("  Électricité   Martin  ")).toBe(
      "Électricité Martin",
    );
    expect(sanitizeBrandName("A".repeat(80)).length).toBe(32);
  });
});

describe("demande réelle", () => {
  const valid = {
    name: "Martin Électricité",
    email: "martin@example.com",
    phone: "",
    website: "",
    packageId: "acquisition",
    message: "Je souhaite un site pour présenter mon activité à Paris.",
    consent: true,
  };

  it("signale les champs incomplets", () => {
    const errors = validateInquiry({
      ...valid,
      email: "non",
      consent: false,
      message: "court",
    });
    expect(errors.email).toBeTruthy();
    expect(errors.consent).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it("prépare un mailto sans prétendre à un envoi", () => {
    const href = buildInquiryMailto(
      valid,
      "syabettan@gmail.com",
      "Acquisition locale",
    );
    expect(href.startsWith("mailto:syabettan@gmail.com")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Aucun envoi automatique");
    expect(href).not.toContain("<");
  });
});

describe("prix et contraste", () => {
  it("formate les montants en français", () => {
    expect(formatEuros(790)).toContain("790");
    expect(formatEuros(1290).replace(/\s/g, "")).toContain("1290");
    expect(formatMonthly(99)).toContain("mois");
  });

  it("garde des accents lisibles", () => {
    for (const preset of ACCENT_PRESETS) {
      expect(contrastRatio(INK, preset.value)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(preset.value, CHARCOAL)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
