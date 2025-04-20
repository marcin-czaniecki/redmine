export function getDateRange(date: string) {
  const today = new Date().toISOString().slice(0, 10);
  if (!date.includes("...")) {
    return [date, date];
  }
  const dateParts = date.split("...");
  const startDate = dateParts[0] || today;
  const endDate = dateParts[1] || today;
  return [startDate, endDate];
}
