const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatEuros(amount: number): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error("Le montant doit être un entier positif.");
  }
  return euros.format(amount);
}

export function formatMonthly(amount: number): string {
  return `${formatEuros(amount)}\u00a0/\u00a0mois`;
}
