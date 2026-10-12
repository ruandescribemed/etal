// The hero field. On black, a halftone of IF squares: full green squares at the right edge, shrinking
// to nothing toward the title, with an edge that breathes (phones: only the empty band above the
// text). The pointer swells the squares around it and lights them (lime); the squares
// it crosses may fire (red, round); a tap sends a ripple of swollen squares.
// The pointer trail and the ripples are uniform arrays of recent events, so the shader keeps no state
// between frames. Without GL (no WebGL, Save-Data, reduced motion) the CSS halftone stays visible.
import { gsap } from 'gsap';
import { onPage, onScroll, setBackground, setBackgroundActive } from '@/engine';

const TRAIL = 24;
const RIPPLES = 4;

const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform float uDpr;
uniform vec2 uResolution;
uniform float uScrollY;
uniform float uCell;
uniform float uHeroH;
uniform float uPortrait;
uniform vec2 uBand;
uniform float uZone; // x (CSS px) where hover starts to show: past the title column
uniform vec3 uPointer;
uniform vec3 uTrail[${TRAIL}];
uniform vec3 uRipples[${RIPPLES}];
uniform vec3 uCampo;
uniform vec3 uLime;
uniform vec3 uPonto;
uniform float uStart; // uTime when the field started growing

const float SWELL = 0.5;    // seconds per e-fold of a swollen square
const float FIRE = 0.9;     // seconds per e-fold of a fired square
const float RIPPLE = 420.0; // CSS px per second
const float REACH = 4.0;    // swell radius, in cells

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 css = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 page = css + vec2(0.0, uScrollY);
  vec2 id = floor(page / uCell);
  vec2 center = (id + 0.5) * uCell;
  vec2 q = page - center;
  // Outside the hero and in the gaps between squares there is nothing to draw.
  if (page.y > uHeroH || max(abs(q.x), abs(q.y)) > uCell * 0.45) { gl_FragColor = vec4(0.0); return; }

  // Where the field lives: the right side, thinner under the header so the nav stays legible.
  float u = center.x / uResolution.x;
  float v = center.y / uHeroH;
  float band = uPortrait > 0.5
    ? smoothstep(uBand.x, uBand.x + uCell * 2.0, center.y) * (1.0 - smoothstep(uBand.y - uCell * 2.0, uBand.y, center.y))
    : mix(0.35, 1.0, smoothstep(uCell, uCell * 4.0, center.y));
  float edge = 0.05 * sin(v * 5.0 + uTime * 0.6) + 0.025 * sin(v * 13.0 - uTime * 0.9);
  float g = smoothstep(mix(0.5, 0.05, uPortrait), 0.97, u + edge) * band;
  // Switching on: the squares grow from nothing, the edge first, toward the title.
  g *= 1.0 - pow(2.0, -10.0 * clamp(uTime - uStart - (1.0 - u) * 0.8, 0.0, 1.0));
  float zone = uPortrait > 0.5 ? smoothstep(0.15, 0.35, u) * band : smoothstep(uZone, uZone + uResolution.x * 0.2, center.x);
  if (g <= 0.0 && zone <= 0.0) { gl_FragColor = vec4(0.0); return; }

  float swell = 0.0;
  float fire = 0.0;
  if (uPointer.z > 0.5) swell = 1.0 - distance(center, uPointer.xy) / (uCell * REACH);
  for (int i = 0; i < ${TRAIL}; i++) {
    vec3 s = uTrail[i];
    float since = uTime - s.z;
    if (s.z < 0.0 || since < 0.0 || since > 3.0) continue;
    swell = max(swell, (1.0 - distance(center, s.xy) / (uCell * REACH)) * exp(-since / SWELL));
    if (floor(s.xy / uCell) == id && hash(id + s.z) < 0.35) fire = max(fire, exp(-since / FIRE));
  }
  for (int i = 0; i < ${RIPPLES}; i++) {
    vec3 r = uRipples[i];
    float d = distance(center, r.xy);
    float after = uTime - r.z - d / RIPPLE;
    if (r.z < 0.0 || d > 1400.0 || after < -uCell * 0.7 / RIPPLE) continue;
    swell = max(swell, exp(-max(after, 0.0) / SWELL));
  }

  // Square at rest, its size the fade; lime when swollen; red and round when fired. Colours snap.
  float extent = uCell * 0.45 * max(g, swell * zone);
  bool fired = fire > 0.45 && zone > 0.5;
  if (!fired && extent < 0.75) { gl_FragColor = vec4(0.0); return; }
  float aa = 1.0 / uDpr;
  float dist = fired ? length(q) - max(extent, uCell * 0.2) : max(abs(q.x), abs(q.y)) - extent;
  float a = 1.0 - smoothstep(-aa, aa, dist);
  vec3 c = fired ? uPonto : (swell * zone > 0.5 ? uLime : uCampo);
  gl_FragColor = vec4(c * a, a);
}`;

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Plain arrays on purpose: OGL only recognizes uniform arrays through Array.isArray.
const trail: number[] = new Array(TRAIL * 3).fill(-1);
const ripples: number[] = new Array(RIPPLES * 3).fill(-1);
const pointer = [-1e4, -1e4, 0];
const band = [0, 0];
const uniforms = {
  uCell: { value: 32 },
  uHeroH: { value: 0 },
  uPortrait: { value: 0 },
  uBand: { value: band },
  uZone: { value: 0 },
  uPointer: { value: pointer },
  uTrail: { value: trail },
  uRipples: { value: ripples },
  uCampo: { value: rgb('#5aa323') },
  uLime: { value: rgb('#7dd13f') },
  uPonto: { value: rgb('#ed3237') },
  uStart: { value: 0 },
};
let nextTrail = 0;
let nextRipple = 0;

export function startHalftone() {
  const program = setBackground(FRAG, uniforms);
  setBackgroundActive(false);

  onPage(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const logo = hero?.querySelector('.hero__logo');
    const theme = hero?.querySelector('.hero__theme');
    if (!program || !hero || !logo || !theme) return;

    const measure = () => {
      const r = hero.getBoundingClientRect();
      const cell = parseFloat(getComputedStyle(hero).getPropertyValue('--cell')) || 32;
      uniforms.uCell.value = cell;
      uniforms.uHeroH.value = r.bottom + scrollY;
      uniforms.uPortrait.value = r.width < r.height ? 1 : 0;
      // Portrait: the field fills the tallest empty gap of the hero, wherever the text leaves it.
      const inner = hero.querySelector('.hero__inner')?.getBoundingClientRect() ?? r;
      const blocks = [logo, theme].map((el) => el.getBoundingClientRect()).sort((a, b) => a.top - b.top);
      const edges = [inner.top, ...blocks.flatMap((b) => [b.top, b.bottom]), inner.bottom];
      let [top, bottom] = [edges[0], edges[1]];
      for (let i = 2; i + 1 < edges.length; i += 2) if (edges[i + 1] - edges[i] > bottom - top) [top, bottom] = [edges[i], edges[i + 1]];
      band[0] = top + scrollY + cell;
      band[1] = bottom + scrollY - cell;
      uniforms.uZone.value = theme.getBoundingClientRect().right;
    };
    measure();
    addEventListener('resize', measure);
    // The field grows once GL is up: on a late boot it follows the type instead of popping in grown.
    uniforms.uStart.value = gsap.ticker.time;
    trail.fill(-1);
    ripples.fill(-1);
    setBackgroundActive(scrollY < uniforms.uHeroH.value);

    // Every square the pointer enters joins the trail (and may fire).
    let lastCell = '';
    const track = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY + scrollY;
      pointer[0] = x;
      pointer[1] = y;
      const cell = `${Math.floor(x / uniforms.uCell.value)}:${Math.floor(y / uniforms.uCell.value)}`;
      if (cell === lastCell) return;
      lastCell = cell;
      const i = (nextTrail++ % TRAIL) * 3;
      trail[i] = x;
      trail[i + 1] = y;
      trail[i + 2] = gsap.ticker.time;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.buttons === 0) return;
      pointer[2] = 1;
      track(e);
    };
    const down = (e: PointerEvent) => {
      const i = (nextRipple++ % RIPPLES) * 3;
      ripples[i] = e.clientX;
      ripples[i + 1] = e.clientY + scrollY;
      ripples[i + 2] = gsap.ticker.time;
      pointer[2] = 1;
      track(e);
    };
    const up = (e: PointerEvent) => { if (e.pointerType !== 'mouse') pointer[2] = 0; };
    const away = () => { pointer[2] = 0; };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerdown', down);
    hero.addEventListener('pointerup', up);
    hero.addEventListener('pointercancel', away);
    hero.addEventListener('pointerleave', away);

    // Only draw while the hero is on screen.
    const off = onScroll(({ y }) => setBackgroundActive(y < uniforms.uHeroH.value));

    return () => {
      removeEventListener('resize', measure);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerdown', down);
      hero.removeEventListener('pointerup', up);
      hero.removeEventListener('pointercancel', away);
      hero.removeEventListener('pointerleave', away);
      away();
      off();
      setBackgroundActive(false);
    };
  });
}
