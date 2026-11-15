import type { SiteConfig } from "../types/content";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PLACEHOLDER = /à compléter|a completer|lorem ipsum|xxx+|\[\s*todo\s*\]/i;

export function validateDeployment(config: SiteConfig): string[] {
  const errors: string[] = [];

  if (!EMAIL.test(config.inquiry.recipient)) {
    errors.push(
      "Le destinataire des demandes de création de site doit être un e-mail valide.",
    );
  }

  if (config.mode === "demo") {
    requireDemo(config, errors);
  } else {
    requireClient(config, errors);
  }

  const featured = config.packages.filter((offer) => offer.featured);
  if (featured.length !== 1) {
    errors.push("Exactement une offre doit être marquée comme principale.");
  }
  if (config.packages.length !== 3) {
    errors.push("Le comparatif doit contenir trois offres.");
  }

  return errors;
}

function requireDemo(config: SiteConfig, errors: string[]): void {
  if (config.indexing !== "noindex")
    errors.push("Le mode démonstration doit rester en noindex.");
  if (!config.showFictionLabels)
    errors.push("Les mentions de fiction doivent rester visibles.");
  if (!config.showAgencyCta)
    errors.push("L’appel à la création de site doit rester disponible.");
  if (config.quoteFlow !== "simulated") {
    errors.push("Le devis électricien de la démonstration doit rester simulé.");
  }
  if (config.inquiry.delivery !== "mailto") {
    errors.push(
      "Sans prestataire configuré, la demande réelle passe par la messagerie.",
    );
  }
  if (config.legal.clientSupplied) {
    errors.push(
      "Les mentions légales client ne peuvent pas être activées en démonstration.",
    );
  }
  if (config.business.publishAddress || config.business.address) {
    errors.push("La démonstration ne publie pas d’adresse.");
  }
  if (
    config.business.siret ||
    config.business.phone ||
    config.business.email ||
    config.business.legalName
  ) {
    errors.push(
      "La démonstration ne publie pas d’identité légale, de téléphone ni de SIRET.",
    );
  }
  if (
    config.testimonials.length === 0 ||
    config.testimonials.some((item) => !item.fictional || item.verified)
  ) {
    errors.push(
      "Chaque avis de démonstration doit être fictif et non vérifié.",
    );
  }
  if (
    config.stats.length === 0 ||
    config.stats.some((item) => !item.fictional || item.verified)
  ) {
    errors.push(
      "Chaque chiffre de démonstration doit être fictif et non vérifié.",
    );
  }
  if (
    config.projects.length === 0 ||
    config.projects.some((item) => !item.illustrative || item.rightsConfirmed)
  ) {
    errors.push("Chaque projet de démonstration doit rester illustratif.");
  }
  if (
    config.certifications.length === 0 ||
    config.certifications.some((item) => item.documented)
  ) {
    errors.push(
      "Les certifications de démonstration ne peuvent pas être présentées comme documentées.",
    );
  }
}

function requireClient(config: SiteConfig, errors: string[]): void {
  if (config.showFictionLabels) {
    errors.push(
      "Le mode client ne peut pas afficher les pastilles de fiction.",
    );
  }
  if (config.showAgencyCta) {
    errors.push(
      "Le mode client retire l’appel commercial de création de site.",
    );
  }
  if (config.quoteFlow === "simulated") {
    errors.push("Le mode client ne peut pas simuler le devis.");
  }
  if (!config.legal.clientSupplied) {
    errors.push(
      "Le mode client exige des mentions légales fournies par le client.",
    );
  }
  if (
    config.legal.privacy.trim().length < 200 ||
    config.legal.mentions.trim().length < 200
  ) {
    errors.push(
      "Les textes légaux client doivent être renseignés de façon substantielle.",
    );
  }
  if (
    PLACEHOLDER.test(config.legal.privacy) ||
    PLACEHOLDER.test(config.legal.mentions)
  ) {
    errors.push("Les textes légaux contiennent encore un espace réservé.");
  }
  if (
    !config.business.legalName ||
    config.business.legalName.trim().length < 2
  ) {
    errors.push("La raison sociale est obligatoire en mode client.");
  }
  if (!config.business.email || !EMAIL.test(config.business.email)) {
    errors.push(
      "Un e-mail d’entreprise vérifié est obligatoire en mode client.",
    );
  }
  if (
    config.business.publishAddress &&
    (config.business.address?.trim().length ?? 0) < 8
  ) {
    errors.push("Une adresse publiée doit être renseignée.");
  }
  if (config.testimonials.some((item) => item.fictional || !item.verified)) {
    errors.push("Le mode client refuse un avis fictif ou non vérifié.");
  }
  if (config.stats.some((item) => item.fictional || !item.verified)) {
    errors.push("Le mode client refuse un chiffre fictif ou non vérifié.");
  }
  if (
    config.projects.some((item) => item.illustrative || !item.rightsConfirmed)
  ) {
    errors.push(
      "Le mode client refuse un projet illustratif ou sans droits confirmés.",
    );
  }
  if (config.certifications.some((item) => !item.documented)) {
    errors.push(
      "Retirez les certifications non documentées avant le mode client.",
    );
  }
  if (config.indexing === "index" && config.showFictionLabels) {
    errors.push("L’indexation exige un contenu vérifié, sans fiction.");
  }
  if (config.quoteFlow === "mailto" && !config.business.email) {
    errors.push("Le devis par messagerie exige l’e-mail de l’entreprise.");
  }
  if (
    config.quoteFlow === "endpoint" &&
    (!config.inquiry.endpoint || !isHttps(config.inquiry.endpoint))
  ) {
    errors.push("Le devis distant exige une URL HTTPS.");
  }
}

function isHttps(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function assertValidDeployment(config: SiteConfig): SiteConfig {
  const errors = validateDeployment(config);
  if (errors.length > 0) {
    throw new Error(
      `Configuration de déploiement invalide.\n- ${errors.join("\n- ")}`,
    );
  }
  return config;
}
