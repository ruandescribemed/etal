'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { secondsUntil, splitSeconds } from '@/data/time';

const startsAt = Date.parse(site.dates.startsAt);
const pad = (n: number) => String(n).padStart(2, '0');
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// The server cannot know the time left: it renders zeros, which the inline script in Countdown overwrites
// before paint. In the browser the first render already reads the clock, so hydration lands on the digits
// the script wrote instead of going through 00:00:00:00 (the glyphs suppress the server/client warning).
const initial = () => (typeof window === 'undefined' ? null : secondsUntil(startsAt));

/** The bar's content: "Faltam dd:hh:mm:ss" on flip tiles, ticking on the second; hidden once it is time. */
export function CountdownClock() {
  const [left, setLeft] = useState(initial);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      setLeft(secondsUntil(startsAt));
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    return () => window.clearTimeout(id);
  }, []);

  const time = splitSeconds(left ?? 0);
  const digits = [time.days, time.hours, time.minutes, time.seconds].map(pad);

  return (
    <div className="countdown" hidden={left === 0} suppressHydrationWarning>
      <p className="countdown__line">
        <span className="countdown__lead">Faltam</span>
        <span className="countdown__clock" aria-hidden="true">
          {digits.map((pair, group) => (
            <span className="countdown__group" key={group}>
              {group > 0 && <span className="countdown__sep">:</span>}
              {[...pair].map((digit, i) => (
                <FlipDigit digit={digit} key={i} />
              ))}
            </span>
          ))}
        </span>
        {/* One text node, as the inline script writes it. */}
        <span className="sr-only" data-countdown-text suppressHydrationWarning>
          {`${plural(time.days, 'dia', 'dias')}, ${plural(time.hours, 'hora', 'horas')} e ${plural(time.minutes, 'minuto', 'minutos')}`}
        </span>
        <span className="countdown__note">
          para o {site.edition} ETAL · {site.dates.startsLabel}
        </span>
      </p>
    </div>
  );
}

// One tile. At rest its two halves show the digit. When the digit changes, two flaps run once (they are
// remounted per change): the old top half falls, then the new bottom half swings up over the old one.
function FlipDigit({ digit }: { digit: string }) {
  const [shown, setShown] = useState({ now: digit, before: digit });
  if (shown.now !== digit) setShown({ now: digit, before: shown.now });
  return (
    <span className="flip" data-flip>
      <span className="flip__half flip__half--top">
        <span className="flip__glyph" data-glyph suppressHydrationWarning>
          {shown.now}
        </span>
      </span>
      <span className="flip__half flip__half--bottom">
        <span className="flip__glyph" data-glyph suppressHydrationWarning>
          {shown.before}
        </span>
      </span>
      {shown.before !== shown.now && (
        <span className="flip__flaps" key={`${shown.before}${shown.now}`}>
          <span className="flip__half flip__half--top flip__flap-out">
            <span className="flip__glyph">{shown.before}</span>
          </span>
          <span className="flip__half flip__half--bottom flip__flap-in">
            <span className="flip__glyph">{shown.now}</span>
          </span>
        </span>
      )}
    </span>
  );
}
