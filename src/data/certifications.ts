import type { CertificationSlot } from "../types/content";

export const certifications: CertificationSlot[] = [
  {
    id: "assurance",
    title: "Assurance",
    summary:
      "Références d’assurance décennale ou de responsabilité civile, uniquement lorsqu’elles sont réelles.",
    documented: false,
  },
  {
    id: "qualification",
    title: "Qualification professionnelle",
    summary:
      "Emplacement pour une qualification effectivement détenue, avec son intitulé exact.",
    documented: false,
  },
  {
    id: "habilitations",
    title: "Habilitations",
    summary:
      "Emplacement pour des habilitations nominatives, jamais suggérées par un logo générique.",
    documented: false,
  },
  {
    id: "garanties",
    title: "Garanties",
    summary:
      "Emplacement pour les garanties que l’entreprise peut réellement documenter.",
    documented: false,
  },
];
