export function getPreviousWeekRange(): { start: Date; end: Date } {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 1 = Monday, ...
  const end = new Date(today);
  end.setDate(today.getDate() - day); // last Sunday

  const start = new Date(end);
  start.setDate(end.getDate() - 6); // last Monday

  return { start, end }; // e.g., { start: Mon 7/7/2025, end: Sun 7/13/2025 }
}