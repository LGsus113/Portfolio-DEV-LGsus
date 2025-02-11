export function formatYears(startDate: string, endDate: string | null): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = endDate !== null ? new Date(endDate).getFullYear() : "Actual";
  return `${startYear} - ${endYear}`;
}
