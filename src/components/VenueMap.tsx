import { venueMap } from '@/data/venue-map';

// The streets around the campus as LEDs of the panel (data/venue-map). Each kind of cell is one path of
// runs along the rows, filled with a pattern that draws that kind's LED in every cell the run covers.
// Sliced to the plot: on phones the square crop keeps the middle, where the campus is.
const cols = venueMap.rows[0]?.length ?? 0;
const rows = venueMap.rows.length;

function cellsOf(kind: string) {
  let d = '';
  venueMap.rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      if (row[x] !== kind) {
        x++;
        continue;
      }
      let n = 1;
      while (row[x + n] === kind) n++;
      d += `M${x} ${y}h${n}v1h${-n}z`;
      x += n;
    }
  });
  return d;
}

const led = (id: string, size: number) => (
  <pattern id={`venue-${id}`} width="1" height="1" patternUnits="userSpaceOnUse">
    <rect className={`venue__led venue__led--${id}`} x={(1 - size) / 2} y={(1 - size) / 2} width={size} height={size} />
  </pattern>
);

export function VenueMap() {
  return (
    <svg className="venue__map" viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {led('off', 0.15)}
        {led('water', 0.8)}
        {led('street', 0.5)}
        {led('road', 0.8)}
        <pattern id="venue-campus" width="1" height="1" patternUnits="userSpaceOnUse">
          <circle className="venue__led venue__led--campus" cx="0.5" cy="0.5" r="0.4" />
        </pattern>
      </defs>
      <rect width={cols} height={rows} fill="url(#venue-off)" />
      <path d={cellsOf('~')} fill="url(#venue-water)" />
      <path d={cellsOf('+')} fill="url(#venue-street)" />
      <path d={cellsOf('#')} fill="url(#venue-road)" />
      <path d={cellsOf('@')} fill="url(#venue-campus)" />
    </svg>
  );
}
