export function formatYears(startDate: string, endDate: string | null): string {
  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const startYear: number = new Date(startDate).getFullYear();
  const startMonth: string = months[new Date(startDate).getMonth()];

  const endYear: number | "Actual" =
    endDate !== null ? new Date(endDate).getFullYear() : "Actual";
  const endMonth: string | "Actual" =
    endDate !== null ? months[new Date(endDate).getMonth()] : "Actual";

  if (endYear === "Actual" && endMonth === "Actual") {
    return `${startMonth}, ${startYear} - Actual`;
  }

  return `${startMonth}, ${startYear} - ${endMonth}, ${endYear}`;
}
