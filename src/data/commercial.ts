export type TimelineMode = "indicative" | "hidden";

export interface CommercialStep {
  number: string;
  title: string;
  summary: string;
}

export interface CommercialFaq {
  id: string;
  question: string;
  answer: string;
}

export const commercialPromise =
  "Un site professionnel pour votre entreprise d’électricité, sans avoir à gérer la technique.";

export const featuredPromise =
  "Votre site professionnel clé en main, conçu pour présenter votre activité et faciliter vos demandes de devis.";

export const proofLine =
  "Une approche du développement web nourrie par une expérience de projets digitaux et CRM pour de grandes maisons du luxe français. Ces maisons ne sont pas clientes de cette offre.";

export const commercialSteps: CommercialStep[] = [
  {
    number: "01",
    title: "15 minutes pour comprendre votre activité",
    summary:
      "Vous décrivez le métier, la zone et ce que vos clients doivent comprendre. Vous n’avez pas à choisir l’infrastructure ni à dessiner l’arborescence.",
  },
  {
    number: "02",
    title: "Nous préparons votre site",
    summary:
      "La structure, la mise en page et la mise en ligne technique sont prises en charge dans le périmètre convenu. Vous fournissez les informations, les documents et les droits.",
  },
  {
    number: "03",
    title: "Vous validez le résultat",
    summary:
      "Vous relisez le site et signalez les écarts avec ce qui a été convenu. Vous n’avez pas à écrire le code ni à installer d’outil.",
  },
  {
    number: "04",
    title: "Votre site est mis en ligne",
    summary:
      "La publication se fait après votre validation. Le nom de domaine, s’il est nouveau, et la publicité restent en dehors de ce prix.",
  },
];

export const timelineMode: TimelineMode = "indicative";

export const timelinePreview = "Premier aperçu visé sous 72 heures.";
export const timelinePublish = "Site prêt à être publié sous 7 jours ouvrés.";

export const timelineConditions = [
  "Validation de la commande et du périmètre.",
  "Réception des informations, contenus et droits nécessaires.",
  "Réalisation des actions préalables convenues, comme l’accès au domaine.",
];

export const timelineCaution =
  "Ces délais sont un objectif de travail. Ils commencent seulement après ces conditions. Ils deviennent un engagement uniquement s’ils sont repris sur le devis accepté.";

export const guaranteeTitle = "Garantie VOLT Sérénité";

export const guaranteeSummary =
  "Votre site est livré conformément au cahier des charges validé. Les défauts de conformité couverts, signalés pendant les 30 jours suivant la livraison, sont corrigés sans frais supplémentaires.";

export const guaranteeConditions = [
  "Le cahier des charges est le devis accepté, avec les contenus validés.",
  "Un défaut couvert est un écart entre le site livré et ce document. Une nouvelle page ou une nouvelle fonction n’en est pas un.",
  "La garantie ne porte ni sur le chiffre d’affaires, ni sur le nombre de demandes, ni sur le classement Google, ni sur le trafic.",
  "Elle ne prévoit pas de remboursement automatique.",
  "Le signalement se fait par e-mail, avec une description du défaut, pendant les 30 jours.",
];

export const bonuses = [
  "Aide à la rédaction initiale des textes du site.",
  "Vérification des coordonnées et des parcours de contact.",
  "Mini-guide pour traiter les demandes de devis reçues.",
];

export const maintenanceDefinition =
  "La maintenance mensuelle couvre le suivi technique du site, la vérification du parcours de contact et les corrections de contenu prévues au devis. Les nouvelles pages et les évolutions se chiffrent à part.";

export const commercialFaqs: CommercialFaq[] = [
  {
    id: "delai",
    question: "Combien de temps faut-il pour créer mon site ?",
    answer: `${timelinePreview} ${timelinePublish} ${timelineCaution}`,
  },
  {
    id: "contenus",
    question: "Dois-je fournir les textes et les photographies ?",
    answer:
      "Vous fournissez les faits, les photos dont vous avez les droits et vos validations. L’aide à la première rédaction est incluse dans l’offre principale. Vous n’avez pas à concevoir la structure du site.",
  },
  {
    id: "domaine",
    question: "Puis-je utiliser mon domaine actuel ?",
    answer:
      "Oui, si vous en avez la maîtrise. L’achat d’un nouveau nom et les frais du bureau d’enregistrement ne sont pas inclus dans le prix de création. Le branchement est prévu avec vous.",
  },
  {
    id: "mensuel",
    question: "Que comprend l’abonnement mensuel ?",
    answer: maintenanceDefinition,
  },
  {
    id: "modifications",
    question: "Puis-je demander des modifications ?",
    answer:
      "Oui. Les corrections prévues dans le suivi mensuel sont incluses. Une nouvelle fonction ou une page supplémentaire est chiffrée avant d’être faite.",
  },
  {
    id: "arret",
    question: "Que se passe-t-il si je souhaite arrêter l’abonnement ?",
    answer:
      "Les conditions de sortie sont écrites sur le devis avant signature. L’arrêt se demande par e-mail. Aucun prélèvement n’est prévu au-delà de la période convenue dans ce devis.",
  },
  {
    id: "propriete",
    question:
      "Est-ce que je reste propriétaire de mon nom de domaine et des contenus ?",
    answer:
      "Le nom de domaine enregistré à votre nom reste le vôtre. Les textes et photos que vous fournissez restent les vôtres. Le transfert des fichiers du site est organisé selon le devis. Il n’est pas présenté comme automatique en dehors de ce document.",
  },
  {
    id: "google",
    question:
      "Est-ce que mon site apparaîtra automatiquement en premier sur Google ?",
    answer:
      "Non. La mise en place SEO technique prépare un site compréhensible. Elle ne garantit ni la première place, ni un volume de visites, ni des demandes de devis.",
  },
];
