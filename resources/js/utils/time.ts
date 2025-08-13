export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds ?? 0));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const two = (n: number) => String(n).padStart(2, '0');

  return hours > 0
    ? `${two(hours)}:${two(minutes)}:${two(seconds)}` // hh:mm:ss
    : `${two(minutes)}:${two(seconds)}`; // mm:ss
}
