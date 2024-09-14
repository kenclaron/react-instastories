const DURATION_WEEK = 604_800_000; // 7 * 24 * 60 * 60 * 1000

export function weeksBetween(date1: Date, date2: Date) {
  const differenceInMilliseconds = Number(date1) - Number(date2);
  const weeksDifference = differenceInMilliseconds / DURATION_WEEK;

  return Math.floor(Math.abs(weeksDifference));
}

export default weeksBetween;
