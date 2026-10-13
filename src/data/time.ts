/** '07:30' → '7h30', '13:00' → '13h' (Brazilian convention). */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
}

/** Whole seconds left until `at` (epoch ms), never below zero. */
export function secondsUntil(at: number) {
  return Math.max(0, Math.floor((at - Date.now()) / 1000));
}

/** A count of seconds as days (at most 99: the countdown has two digits for them), hours, minutes and
 *  seconds. */
export function splitSeconds(total: number) {
  return {
    days: Math.min(99, Math.floor(total / 86400)),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
