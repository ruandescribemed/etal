'use client';
import { gsap } from 'gsap';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { days, schedule, type DayId } from '@/data/site';
import { prefersReducedMotion } from '@/engine';

const DIGITS = '0123456789';

/** Scoreboard flip: the digits of each time run through random numbers before settling. */
function flip(panel: HTMLElement) {
  const times = [...panel.querySelectorAll<HTMLElement>('[data-flip]')];
  const tl = gsap.timeline();
  times.forEach((el, i) => {
    const final = el.dataset.flip ?? '';
    const o = { p: 0 };
    tl.to(o, {
      p: 1,
      duration: 0.5,
      ease: 'none',
      onUpdate: () => {
        const settled = Math.floor(o.p * final.length);
        el.textContent = [...final].map((c, k) => (k < settled || !DIGITS.includes(c) ? c : DIGITS[(Math.random() * 10) | 0])).join('');
      },
      onComplete: () => { el.textContent = final; },
    }, i * 0.03);
  });
  tl.from(panel.querySelectorAll('.board__title'), { autoAlpha: 0, x: -12, duration: 0.6, stagger: 0.04, ease: 'expo.out' }, 0.1);
  return tl;
}

export function Board() {
  const [active, setActive] = useState<DayId>(days[0]?.id ?? 'qua');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<Partial<Record<DayId, HTMLDivElement | null>>>({});
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const panel = panels.current[active];
    if (!panel || prefersReducedMotion()) return;
    const tl = flip(panel);
    return () => { tl.progress(1).kill(); };
  }, [active]);

  // Arrow keys move between days (automatic activation, as in a tab list).
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + days.length) % days.length;
    const day = days[next];
    if (!day) return;
    setActive(day.id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="board">
      <div className="board__tabs" role="tablist" aria-label="Dias do evento">
        {days.map((day, i) => (
          <button
            key={day.id}
            ref={(el) => { tabs.current[i] = el; }}
            className="board__tab"
            type="button"
            role="tab"
            id={`aba-${day.id}`}
            aria-selected={active === day.id}
            aria-controls={`painel-${day.id}`}
            tabIndex={active === day.id ? 0 : -1}
            onClick={() => setActive(day.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="board__tab-day led">
              {day.weekday.slice(0, 3)} {Number(day.isoDate.slice(8))}
            </span>
            <span className="board__tab-date">{day.date}</span>
          </button>
        ))}
      </div>
      {days.map((day) => (
        <div
          key={day.id}
          ref={(el) => { panels.current[day.id] = el; }}
          className="board__panel"
          role="tabpanel"
          id={`painel-${day.id}`}
          aria-labelledby={`aba-${day.id}`}
          hidden={active !== day.id}
        >
          <p className="board__summary">{day.summary}</p>
          <ol>
            {schedule
              .filter((s) => s.day === day.id)
              .map((s) => (
                <li className="board__row" key={`${s.start}-${s.title}`}>
                  <time className="board__time led" dateTime={`${day.isoDate}T${s.start}`} data-flip={s.start}>
                    {s.start}
                  </time>
                  <time className="board__time board__time--end led" dateTime={`${day.isoDate}T${s.end}`} data-flip={s.end}>
                    <span className="sr-only">até </span>
                    {s.end}
                  </time>
                  <span className="board__title">{s.title}</span>
                </li>
              ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
