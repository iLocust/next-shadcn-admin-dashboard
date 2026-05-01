const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/** "1 Mei 2025" — locale-safe, parses "YYYY-MM-DD" without relying on Intl or server locale */
export function formatDateId(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTHS_SHORT[(month ?? 1) - 1]} ${year}`;
}

/** "Kam, 1 Mei" or "Kam, 1 Mei 2025" when includeYear=true */
export function formatDateWithDayId(dateStr: string, includeYear = false): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dow = DAYS_SHORT[new Date(Date.UTC(year!, (month ?? 1) - 1, day!)).getUTCDay()];
  const base = `${dow}, ${day} ${MONTHS_SHORT[(month ?? 1) - 1]}`;
  return includeYear ? `${base} ${year}` : base;
}
