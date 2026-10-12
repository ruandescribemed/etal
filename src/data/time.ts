/** '07:30' → '7h30', '13:00' → '13h' (Brazilian convention). */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
}
