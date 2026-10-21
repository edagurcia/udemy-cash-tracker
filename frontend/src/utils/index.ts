export function formatCurrency(
  value: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
  }).format(date);
}
