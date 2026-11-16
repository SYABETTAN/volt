import type { PackageOffer } from "../types/content";

export const packages: PackageOffer[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    creationPrice: 790,
    monthlyPrice: 49,
    summary: "Une présence claire, pour une entreprise qui commence en ligne.",
    includes: [
      "Jusqu’à 3 pages",
      "Design responsive",
      "Présentation de l’activité",
      "Moyen de contact",
      "Mise en ligne",
      "Maintenance technique de base",
    ],
    featured: false,
  },
  {
    id: "acquisition",
    name: "VOLT Acquisition locale",
    creationPrice: 1290,
    monthlyPrice: 99,
    summary:
      "Le périmètre le plus complet pour présenter le métier et recevoir des demandes.",
    includes: [
      "Jusqu’à 6 pages",
      "Design premium responsive",
      "Présentation des prestations",
      "Présentation des zones d’intervention",
      "Galerie de réalisations",
      "Formulaire de devis",
      "Bouton d’appel",
      "SEO technique initial",
      "Mise en ligne",
      "Tests de fonctionnement",
      "Maintenance mensuelle définie",
    ],
    featured: true,
  },
  {
    id: "croissance",
    name: "Croissance",
    creationPrice: 1990,
    monthlyPrice: 199,
    summary:
      "Le même cadre, avec plus de pages et un suivi plus régulier du contenu.",
    includes: [
      "Jusqu’à 10 pages",
      "Le périmètre d’Acquisition locale",
      "Pages supplémentaires",
      "Ajustements de contenu après la mise en ligne",
      "Point mensuel",
    ],
    featured: false,
  },
];

export const taxLabel =
  "Montants indicatifs en euros. Le régime de TVA est confirmé sur devis.";

export const priceExclusions =
  "Le nom de domaine, la publicité, les services tiers et les fonctions hors périmètre peuvent être facturés à part. Aucun classement, aucun volume de visites et aucune demande de devis ne sont garantis.";
