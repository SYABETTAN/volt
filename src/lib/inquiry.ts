import { stripControls } from "./sanitize";

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  website: string;
  packageId: string;
  message: string;
  consent: boolean;
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
  const email = compact(input.email, 120);
  const phone = compact(input.phone, 20);
  const website = compact(input.website, 120);
  const message = stripControls(input.message).trim();

  if (name.length < 2 || /[<>]/.test(input.name)) {
    errors.name = "Indiquez un nom ou une entreprise, sans balises.";
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
  if (website && !isPublicWebsite(website)) {
    errors.website =
      "Indiquez une adresse de site valide, ou laissez le champ vide.";
  }
  if (!PACKAGE_IDS.has(input.packageId)) {
    errors.packageId = "Choisissez une offre.";
  }
  if (message.length < 10 || message.length > 1000 || /[<>]/.test(message)) {
    errors.message =
      "Écrivez un message de 10 à 1 000 caractères, sans balises.";
  }
  if (!input.consent) {
    errors.consent =
      "Confirmez que votre messagerie va s’ouvrir. Ce site n’envoie rien lui-même.";
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
  const lines = [
    "Bonjour,",
    "",
    "Je souhaite échanger au sujet d’un site pour mon entreprise d’électricité.",
    "",
    `Nom / entreprise : ${compact(input.name, 80)}`,
    `E-mail : ${compact(input.email, 120)}`,
    `Téléphone : ${compact(input.phone, 20) || "Non précisé"}`,
    `Site actuel : ${compact(input.website, 120) || "Non précisé"}`,
    `Offre : ${compact(packageName, 40)}`,
    "",
    compact(stripControls(input.message).replace(/\s+/g, " "), 1000),
    "",
    "— Message préparé localement depuis la démonstration. Aucun envoi automatique.",
  ];
  const href = `mailto:${recipient}?subject=${encodeURIComponent(
    `Site pour électricien — ${compact(packageName, 40)} — ${compact(input.name, 80)}`,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
  if (href.length > 1900) {
    throw new Error(
      "Le message est trop long pour être ouvert dans une messagerie.",
    );
  }
  return href;
}
