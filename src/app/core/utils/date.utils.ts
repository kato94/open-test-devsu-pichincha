export const getNextYear = (date: string): string => {
  const dateControl: number[] = date.split('-').map(Number);
  const nextYear = new Date(dateControl[0] + 1, dateControl[1] - 1, dateControl[2]);

  return nextYear.toISOString().split('T')[0];
}
