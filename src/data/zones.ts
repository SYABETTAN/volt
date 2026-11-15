export const zones = {
  city: "Paris",
  arrondissements: [
    "1er",
    ...Array.from({ length: 19 }, (_, index) => `${index + 2}e`),
  ],
  communes: [
    "Boulogne-Billancourt",
    "Neuilly-sur-Seine",
    "Levallois-Perret",
    "Issy-les-Moulineaux",
    "Vanves",
    "Montrouge",
    "Vincennes",
    "Saint-Mandé",
    "Charenton-le-Pont",
    "Saint-Cloud",
  ],
  note: "Zone présentée à titre d’exemple. Aucune adresse d’établissement n’est publiée, et cette liste n’est pas un engagement d’intervention.",
};
