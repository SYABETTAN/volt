import type { ProcessStep } from "../types/content";

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Premier échange",
    summary:
      "Le besoin, le logement et le moment souhaité sont posés simplement.",
  },
  {
    number: "02",
    title: "Analyse du besoin",
    summary:
      "Les pièces concernées et les contraintes visibles sont passées en revue.",
  },
  {
    number: "03",
    title: "Proposition de devis",
    summary:
      "Une proposition écrite décrit le périmètre, sans prix inventé sur ce site.",
  },
  {
    number: "04",
    title: "Intervention",
    summary:
      "Les travaux convenus sont réalisés dans le cadre précisé au devis.",
  },
  {
    number: "05",
    title: "Vérifications",
    summary:
      "Les points contrôlés sont expliqués au client avant de quitter les lieux.",
  },
  {
    number: "06",
    title: "Suivi",
    summary:
      "Une question après l’intervention trouve un interlocuteur identifié.",
  },
];
