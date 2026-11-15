import type { Service } from "../types/content";

export const services: Service[] = [
  {
    id: "installation",
    number: "01",
    title: "Installation électrique",
    summary:
      "Circuits, prises, éclairages et alimentations pour un logement neuf ou réagencé, expliqués pièce par pièce.",
  },
  {
    id: "renovation",
    number: "02",
    title: "Rénovation électrique",
    summary:
      "Remise à niveau d’une installation ancienne, avec un périmètre de travaux lisible avant toute intervention.",
  },
  {
    id: "securite",
    number: "03",
    title: "Mise en sécurité",
    summary:
      "Repérage des points sensibles et travaux destinés à réduire les risques les plus courants dans l’habitat.",
  },
  {
    id: "tableaux",
    number: "04",
    title: "Tableaux électriques",
    summary:
      "Remplacement ou réorganisation d’un tableau pour rendre l’installation plus claire et plus simple à entretenir.",
  },
  {
    id: "eclairage",
    number: "05",
    title: "Éclairage intérieur et extérieur",
    summary:
      "Ambiances, circulations et façades : la lumière est pensée avec les usages du quotidien, pas seulement avec le décor.",
  },
  {
    id: "depannage",
    number: "06",
    title: "Diagnostic et dépannage",
    summary:
      "Recherche de panne et explication des suites possibles. Aucun délai d’arrivée n’est affiché, faute d’engagement vérifiable.",
  },
  {
    id: "borne",
    number: "07",
    title: "Bornes de recharge",
    summary:
      "Exemple de présentation pour une installation de borne de véhicule électrique. Cette ligne est illustrative.",
  },
];
