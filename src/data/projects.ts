import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    id: "piece-ouverte",
    title: "Pièce de vie ouverte",
    category: "Installation contemporaine",
    summary:
      "Exemple de composition : suspensions au-dessus d’un plan de travail, points lumineux en plafond et circulations dégagées.",
    image: "ouvert",
    alt: "Séjour ouvert sur une cuisine claire, avec trois suspensions noires et un grand canapé gris.",
    illustrative: true,
    rightsConfirmed: false,
  },
  {
    id: "volume",
    title: "Volume avec escalier",
    category: "Rénovation d’appartement",
    summary:
      "Image d’ambiance pour une rénovation où l’escalier, le séjour et l’éclairage décoratif sont montrés ensemble.",
    image: "escalier",
    alt: "Grand séjour blanc avec escalier en bois, lustre contemporain et canapé bleu clair.",
    illustrative: true,
    rightsConfirmed: false,
  },
  {
    id: "facade",
    title: "Seuil éclairé",
    category: "Éclairage extérieur",
    summary:
      "Entrée de maison en début de soirée, utilisée pour illustrer un éclairage de seuil et de façade. Ce n’est pas un chantier VOLT.",
    image: "facade",
    alt: "Maison contemporaine au crépuscule, avec une entrée en bois chaudement éclairée.",
    illustrative: true,
    rightsConfirmed: false,
  },
  {
    id: "suspension",
    title: "Suspension",
    category: "Détail d’éclairage",
    summary:
      "Gros plan sur une suspension métallique, pour montrer comment un projet peut isoler un choix de luminaire.",
    image: "suspension",
    alt: "Suspension métallique grise avec une ampoule visible, sur fond gris clair.",
    illustrative: true,
    rightsConfirmed: false,
  },
  {
    id: "borne",
    title: "Recharge à domicile",
    category: "Borne de recharge",
    summary:
      "Visuel de câble branché sur un véhicule, uniquement pour illustrer la rubrique. Aucune installation n’est revendiquée.",
    image: "borne",
    alt: "Prise de recharge branchée sur le flanc d’une voiture, avec un anneau lumineux bleu.",
    illustrative: true,
    rightsConfirmed: false,
  },
  {
    id: "detail",
    title: "Lampe d’angle",
    category: "Éclairage intérieur",
    summary:
      "Détail calme d’une lampe sur pied, comme exemple de fiche projet plus intimiste.",
    image: "detail",
    alt: "Lampe de lecture gris foncé contre un mur blanc.",
    illustrative: true,
    rightsConfirmed: false,
  },
];
