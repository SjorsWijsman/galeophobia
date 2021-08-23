// Returns current day of year (1-365)
export function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Returns hours until tomorrow
export function hoursTillNextDay() {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0,
    0,
    0 // ...at 00:00:00 hours
  );
  const msTillMidnight = night.getTime() - now.getTime();
  return Math.ceil(msTillMidnight / 1000 / 60 / 60);
}