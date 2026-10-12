import type { ComponentProps } from 'react';

// The ETAL mark as pixels of the panel: the "EtaL" lettering of past editions rebuilt on the IF grid,
// its three red dots fired (round), and the year on a finer module beside the L. The hero pulses
// leave from the fired dots ([data-dot]). '#' is a pixel at rest, 'o' a fired one.
const word = [
  '###o.#........#...',
  '#....#........#...',
  '#....##o.o###.#...',
  '###..#......#.#...',
  '#....#...####.#...',
  '#....#...#..#.#...',
  '####..##.####.####',
];
const year = [
  '###.###.###.###',
  '..#.#.#...#.#..',
  '###.#.#.###.###',
  '#...#.#.#...#.#',
  '###.###.###.###',
];

const PITCH = 10; // viewBox units per pixel of the word; the year uses half

const cells = (rows: string[], pitch: number, left: number, top: number) =>
  rows.flatMap((row, y) =>
    [...row].flatMap((c, x) => (c === '.' ? [] : [{ x: left + x * pitch, y: top + y * pitch, pitch, fired: c === 'o' }])),
  );

const pixels = [...cells(word, PITCH, 0, 0), ...cells(year, PITCH / 2, PITCH * 19, PITCH * 4.5)];
const rest = pixels
  .filter((p) => !p.fired)
  .map(({ x, y, pitch }) => `M${x + pitch * 0.1} ${y + pitch * 0.1}h${pitch * 0.8}v${pitch * 0.8}h${-pitch * 0.8}z`)
  .join('');
const fired = pixels.filter((p) => p.fired);

export function Logo(props: ComponentProps<'svg'>) {
  return (
    <svg className="logo" viewBox={`0 0 ${PITCH * 26.5} ${PITCH * 7}`} role="img" aria-label="ETAL 2026" {...props}>
      <path d={rest} />
      {fired.map((p) => (
        <circle key={`${p.x}-${p.y}`} cx={p.x + p.pitch / 2} cy={p.y + p.pitch / 2} r={p.pitch / 2} data-dot />
      ))}
    </svg>
  );
}
