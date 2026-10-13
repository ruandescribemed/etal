// Engine core: framework-agnostic page lifecycle. No DOM access at import time (SSR-safe).
// A framework adapter calls:
//   boot(setup)            once, on first load: setup → page init → intro
//   leave() → cleanup()    before the route swaps (leave can run in parallel with the fetch)
//   enter()                after the new page is in the DOM: init → enter animation → intro
// Project code hooks in with onPage(fn): fn runs on every page load inside a gsap.context, so the
// tweens and ScrollTriggers it creates are reverted automatically. Return a cleanup for the rest.
// No loader on this site: the audience is on mobile data, so the first frame is the HTML itself.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, jumpTo, resetScroll, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { initMagnetic } from './interactions';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline = gsap.timeline({ paused: true });
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => { pageFns.delete(fn); };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

// Flags on <html>. Re-applied on every page because some routers swap root attributes.
export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
    initMagnetic(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** First load. `setup` runs once on the client after scroll init and before the first page:
 *  register setTransition and driver modules there. */
export function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  initPage();
  document.documentElement.classList.add('is-loaded');
  startScroll();
  intro.play();
}

/** Play the leave animation (resolve when the screen is covered). */
export async function leave() {
  stopScroll();
  await playLeave();
}

/** Tear down the current page: reverts every tween, ScrollTrigger and split. */
export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => c());
  ctx?.revert();
  ctx = null;
}

/** Init the new page. `transition: false` for back/forward, where no leave ran.
 *  `target` (a hash like '#programacao') lands on that section instead of the top. */
export async function enter({ transition = true, scrollTop = true, target }: { transition?: boolean; scrollTop?: boolean; target?: string } = {}) {
  if (!booted) return;
  cleanup(); // no-op if the adapter already cleaned up
  if (target) jumpTo(target);
  else if (scrollTop) resetScroll();
  initPage();
  if (transition) await playEnter();
  startScroll();
  intro.play();
}
