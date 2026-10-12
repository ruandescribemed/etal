// One WebGL layer under the DOM, at the top of the page and scrolling with it (the hero halftone): the
// browser moves it with the page, so it never trails the scroll the way a fixed layer redrawn from
// scrollY does on phones. No DOM-synced planes: this site only needs a background shader, so the plane
// machinery is left out.
// Disabled under reduced motion, without WebGL, or with Save-Data; the CSS fallback stays visible.
import { Renderer, Camera, Transform, Program, Mesh, Vec2, Triangle } from 'ogl';
import { gsap } from 'gsap';
import { scrollState } from '../scroll';
import { isMobile, prefersReducedMotion } from '../env';

let renderer: Renderer | null = null;
let host: HTMLElement | null = null;
let camera: Camera | null = null;
let vw = 0, vh = 0, velocity = 0;
let bg: { scene: Transform; program: Program } | null = null;
let active = true;
let cleared = false;
const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

export function glSupported() {
  if (prefersReducedMotion()) return false;
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return false;
  try { return !!document.createElement('canvas').getContext('webgl'); } catch { return false; }
}

export function initGL() {
  if (renderer || !glSupported()) return;
  // Phones get a lower DPR cap: the halftone is a full-screen fragment shader.
  renderer = new Renderer({ dpr: Math.min(devicePixelRatio, isMobile() ? 1.5 : 2), alpha: true, antialias: false, premultipliedAlpha: true });
  const gl = renderer.gl;
  gl.canvas.classList.add('gl-canvas');
  gl.canvas.setAttribute('aria-hidden', 'true');
  // Lives in a host element that persists across navigations (#gl in the layout), sized by CSS and
  // setBackgroundHeight.
  host = document.getElementById('gl') || document.body;
  host.appendChild(gl.canvas);
  camera = new Camera(gl, { near: -10, far: 10 });
  document.documentElement.classList.add('gl-on');
  resize();
  new ResizeObserver(resize).observe(host);
  addEventListener('pointermove', (e) => { mouse.tx = e.clientX / innerWidth; mouse.ty = 1 - e.clientY / innerHeight; }, { passive: true });
  gsap.ticker.add(render);
}

/**
 * Shader layer drawn under the DOM at the top of the page, scrolling with it: gl_FragCoord is page
 * space. Built-in uniforms: uTime (s), uResolution (the layer, CSS px), uDpr, uScroll (0..1 page
 * progress), uScrollY (CSS px), uVelocity, uMouse (0..1 of the viewport, smoothed).
 * Varying: vUv. Persists across navigations until clearBackground(). Returns the Program.
 */
export function setBackground(fragment: string, uniforms: Record<string, { value: unknown }> = {}) {
  if (!renderer) return null;
  clearBackground();
  const gl = renderer.gl;
  const program = new Program(gl, {
    vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`,
    fragment,
    uniforms: {
      uTime: { value: 0 }, uResolution: { value: new Vec2(vw, vh) }, uDpr: { value: renderer.dpr }, uScroll: { value: 0 },
      uScrollY: { value: 0 }, uVelocity: { value: 0 }, uMouse: { value: new Vec2(0.5, 0.5) }, ...uniforms,
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const scene = new Transform();
  new Mesh(gl, { geometry: new Triangle(gl), program }).setParent(scene);
  bg = { scene, program };
  return program;
}
export function clearBackground() { bg = null; }

/** The layer's height in CSS px, from the top of the page (e.g. the hero's). */
export function setBackgroundHeight(px: number) {
  if (host) host.style.height = `${px}px`;
}

/** Skip drawing while the background has nothing to show (e.g. the hero is off screen). */
export function setBackgroundActive(on: boolean) {
  if (on === active) return;
  active = on;
  cleared = false;
}

function resize() {
  if (!renderer || !camera || !host) return;
  vw = host.clientWidth; vh = host.clientHeight;
  renderer.setSize(vw, vh);
  camera.orthographic({ left: -vw / 2, right: vw / 2, top: vh / 2, bottom: -vh / 2, near: -10, far: 10 });
}

function render(t: number) {
  if (!renderer || !camera || document.hidden) return;
  if (!bg || !active) {
    if (!cleared) {
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      cleared = true;
    }
    return;
  }
  const target = Math.max(-40, Math.min(40, scrollState().velocity));
  velocity += (target - velocity) * 0.12;
  mouse.x += (mouse.tx - mouse.x) * 0.08;
  mouse.y += (mouse.ty - mouse.y) * 0.08;
  const u = bg.program.uniforms;
  const s = scrollState();
  u.uTime.value = t; u.uResolution.value.set(vw, vh); u.uDpr.value = renderer.dpr; u.uScroll.value = s.progress;
  u.uScrollY.value = s.y; u.uVelocity.value = velocity; u.uMouse.value.set(mouse.x, mouse.y);
  renderer.render({ scene: bg.scene, camera });
}
