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
      "Site adapté aux mobiles",
      "Expérience de contact",
      "SEO technique de base",
      "Maintenance de base",
    ],
    featured: false,
  },
  {
    id: "acquisition",
    name: "Acquisition locale",
    creationPrice: 1290,
    monthlyPrice: 99,
    summary:
      "La vitrine la plus complète pour présenter le métier et recevoir des demandes.",
    includes: [
      "Jusqu’à 6 pages",
      "Présentation des prestations",
      "Projets",
      "Demandes de contact et de devis",
      "Mise en place SEO locale initiale",
      "Suivi mensuel",
    ],
    featured: true,
  },
  {
    id: "croissance",
    name: "Croissance",
    creationPrice: 1990,
    monthlyPrice: 199,
    summary:
      "Un accompagnement plus large quand le site devient un outil suivi dans le temps.",
    includes: [
      "Jusqu’à 10 pages",
      "Contenus locaux supplémentaires",
      "Optimisation des conversions",
      "Reporting de performance",
      "Accompagnement suivi",
    ],
    featured: false,
  },
];

export const taxLabel =
  "Montants indicatifs en euros. Le régime de TVA est confirmé sur devis.";

export const priceExclusions =
  "Le nom de domaine, la publicité, les services tiers et les fonctionnalités sur mesure peuvent être facturés à part. Aucun classement, aucun volume de visites et aucune demande de devis ne sont garantis.";
