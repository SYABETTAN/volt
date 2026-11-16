import { stripControls } from "./sanitize";

export type RequestKind = "presentation" | "diagnostic";
export type SiteSituation = "" | "has-site" | "no-site";

export interface InquiryInput {
  kind: RequestKind;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  packageId: string;
  situation: SiteSituation;
  message: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PACKAGE_IDS = new Set(["essentiel", "acquisition", "croissance"]);

function compact(value: string, max: number): string {
  return stripControls(value).replace(/\s+/g, " ").trim().slice(0, max);
}

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = compact(input.name, 80);
  const company = compact(input.company, 80);
  const email = compact(input.email, 120);
  const phone = compact(input.phone, 20);
  const website = compact(input.website, 160);
  const message = stripControls(input.message).trim();

  if (input.kind !== "presentation" && input.kind !== "diagnostic") {
    errors.kind = "Choisissez le type de demande.";
  }
  if (name.length < 2 || /[<>]/.test(input.name)) {
    errors.name = "Indiquez votre nom, sans balises.";
  }
  if (company.length < 2 || /[<>]/.test(input.company)) {
    errors.company = "Indiquez le nom de l’entreprise, sans balises.";
  }
  if (!EMAIL.test(email) || /[<>]/.test(input.email)) {
    errors.email = "Indiquez un e-mail professionnel valide.";
  }
  if (
    phone &&
    (!/^[0-9+().\s-]{8,20}$/.test(phone) || phone.replace(/\D/g, "").length < 8)
  ) {
    errors.phone =
      "Le téléphone doit contenir au moins 8 chiffres, ou rester vide.";
  }
  if (input.kind === "diagnostic") {
    if (input.situation !== "has-site" && input.situation !== "no-site") {
      errors.situation = "Indiquez si vous avez déjà un site.";
    }
    if (input.situation === "has-site" && !isPublicWebsite(website)) {
      errors.website = "Indiquez l’adresse du site à examiner ensemble.";
    }
  }
  if (website && !errors.website && !isPublicWebsite(website)) {
    errors.website =
      "Indiquez une adresse de site valide, ou laissez le champ vide.";
  }
  if (input.kind === "presentation" && !PACKAGE_IDS.has(input.packageId)) {
    errors.packageId = "Choisissez une offre.";
  }
  if (message.length > 1000 || /[<>]/.test(input.message)) {
    errors.message =
      "Le message doit rester sous 1 000 caractères, sans balises.";
  }
  return errors;
}

function isPublicWebsite(value: string): boolean {
  if (/\s|[<>]/.test(value)) return false;
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

export function buildInquiryMailto(
  input: InquiryInput,
  recipient: string,
  packageName: string,
): string {
  if (!EMAIL.test(recipient)) {
    throw new Error("Destinataire d’e-mail invalide.");
  }
  const situation =
    input.situation === "has-site"
      ? "Possède déjà un site"
      : input.situation === "no-site"
        ? "Pas encore de site"
        : "Non précisée";
  const lines =
    input.kind === "diagnostic"
      ? [
          "Bonjour,",
          "",
          "Je demande un diagnostic gratuit de ma présence internet.",
          "Aucun score n’a été calculé et aucun site n’a été audité automatiquement.",
          "",
          `Nom : ${compact(input.name, 80)}`,
          `Entreprise : ${compact(input.company, 80)}`,
          `E-mail : ${compact(input.email, 120)}`,
          `Téléphone : ${compact(input.phone, 20) || "Non précisé"}`,
          `Situation : ${situation}`,
          `Site : ${compact(input.website, 160) || "Pas de site indiqué"}`,
          "",
          compact(stripControls(input.message).replace(/\s+/g, " "), 1000) ||
            "Pas de message complémentaire.",
          "",
          "— Préparé localement. Aucun envoi automatique par le site.",
        ]
      : [
          "Bonjour,",
          "",
          "Je souhaite une présentation de site pour mon entreprise d’électricité.",
          "",
          `Nom : ${compact(input.name, 80)}`,
          `Entreprise : ${compact(input.company, 80)}`,
          `E-mail : ${compact(input.email, 120)}`,
          `Téléphone : ${compact(input.phone, 20) || "Non précisé"}`,
          `Site actuel : ${compact(input.website, 160) || "Non précisé"}`,
          `Offre : ${compact(packageName, 60) || "Non précisée"}`,
          "",
          compact(stripControls(input.message).replace(/\s+/g, " "), 1000) ||
            "Pas de message complémentaire.",
          "",
          "— Préparé localement. Aucun envoi automatique par le site.",
        ];
  const subject =
    input.kind === "diagnostic"
      ? `Diagnostic de présence internet — ${compact(input.company, 80)}`
      : `Présentation de site — ${compact(packageName, 60)} — ${compact(input.company, 80)}`;
  const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  if (href.length > 1900) {
    throw new Error(
      "Le message est trop long pour être ouvert dans une messagerie.",
    );
  }
  return href;
}
