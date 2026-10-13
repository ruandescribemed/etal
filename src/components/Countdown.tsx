import { site } from '@/data/site';
import { CountdownClock } from './CountdownClock';

// Runs while the HTML is parsed, before the first paint: writes the time left into the clock just before
// it (the server cannot know it) and hides the bar once the event has begun, so the page never shows
// 00:00:00:00 nor jumps when React takes over. Mirrors secondsUntil and splitSeconds in data/time.
const prefill = `(function(s){var b=s.previousElementSibling,r=Math.max(0,Math.floor((${Date.parse(site.dates.startsAt)}-Date.now())/1e3));if(!r){b.hidden=true;return}var p=function(n){return String(n).padStart(2,'0')},w=function(n,o,m){return n+' '+(n===1?o:m)},d=Math.min(99,Math.floor(r/86400)),h=Math.floor(r%86400/3600),m=Math.floor(r%3600/60),v=p(d)+p(h)+p(m)+p(r%60);b.querySelectorAll('[data-flip]').forEach(function(u,i){u.querySelectorAll('[data-glyph]').forEach(function(g){g.textContent=v.charAt(i)})});b.querySelector('[data-countdown-text]').textContent=w(d,'dia','dias')+', '+w(h,'hora','horas')+' e '+w(m,'minuto','minutos')})(document.currentScript)`;

/** The time left to the credenciamento, in a bar above the header. */
export function Countdown() {
  return (
    <>
      <CountdownClock />
      <script dangerouslySetInnerHTML={{ __html: prefill }} />
    </>
  );
}
