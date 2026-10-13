// Global motion for the site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, setTransition } from '@/engine';

export function setupMotion() {
  transition();
  fields();
}

// IF squares fill the screen from where you clicked (the first one fires red); on the new page
// every square fires, turning round, and goes out from the center.
function transition() {
  const host = document.querySelector<HTMLElement>('.curtain__cells');
  if (!host) return;
  let cols = 0;
  let rows = 0;
  let cells: HTMLElement[] = [];
  const build = () => {
    const size = Math.max(innerWidth, innerHeight) / 12;
    cols = Math.ceil(innerWidth / size);
    rows = Math.ceil(innerHeight / size);
    host.replaceChildren(...Array.from({ length: cols * rows }, () => {
      const cell = document.createElement('div');
      cell.className = 'curtain__cell';
      return cell;
    }));
    host.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    host.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    cells = [...host.children].filter((c): c is HTMLElement => c instanceof HTMLElement);
    gsap.set(cells, { scale: 0 });
  };
  build();
  addEventListener('resize', build);

  let origin = 0;
  addEventListener('pointerdown', (e) => {
    const col = Math.min(cols - 1, Math.floor((e.clientX / innerWidth) * cols));
    const row = Math.min(rows - 1, Math.floor((e.clientY / innerHeight) * rows));
    origin = row * cols + col;
  }, { passive: true });

  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .set(cells, { scale: 0, borderRadius: '0%', backgroundColor: '' })
      .set(cells[origin] ?? [], { backgroundColor: 'var(--ponto)' })
      .to(cells, { scale: 1.02, duration: 0.28, ease: 'power3.out', stagger: { grid: [rows, cols], from: origin, amount: 0.45 } }),
    enter: (c) => gsap.timeline()
      .to(cells, { borderRadius: '50%', scale: 0, duration: 0.42, ease: ease.fire, stagger: { grid: [rows, cols], from: 'center', amount: 0.4 } })
      .set(c, { autoAlpha: 0 }),
  });
}

// The header takes the tone of the first field, the one it sits on; LED labels fire as they cross the
// reading line.
function fields() {
  onPage(() => {
    const first = document.querySelector<HTMLElement>('main [data-tone]');
    document.documentElement.dataset.tone = first?.dataset.tone ?? 'campo';
    document.querySelectorAll<HTMLElement>('[data-fire]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 62%',
        end: 'bottom 38%',
        toggleClass: { targets: el, className: 'is-fired' },
      });
    });
  });
}
