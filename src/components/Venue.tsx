import { site } from '@/data/site';
import { venueMap } from '@/data/venue-map';
import { VenueMap } from './VenueMap';

// A cell's centre as a percentage of the plot.
const at = (cell: number, of: number) => `${((cell + 0.5) / of) * 100}%`;
const cols = venueMap.rows[0]?.length ?? 0;
const rows = venueMap.rows.length;

export function Venue() {
  const { venue } = site;
  return (
    <section className="venue field field--noite" id="local" data-tone="noite" data-edge aria-labelledby="local-title">
      {/* Pau dos Ferros as LEDs of the panel, the campus fired red on the BR-405, south of the centre. A
          click opens the map; the "Abrir no mapa" link is the accessible one. */}
      <div className="venue__figure">
        <a
          className="venue__plot"
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden="true"
          tabIndex={-1}
          style={{ '--px0': at(venueMap.campus.col, cols), '--py0': at(venueMap.campus.row, rows), '--py-centre': at(venueMap.centre.row, rows) }}
        >
          <VenueMap />
          <span className="venue__ring" />
          <span className="venue__label venue__label--lat led">6°08′ S</span>
          <span className="venue__label venue__label--lng led">38°12′ O</span>
          <span className="venue__label venue__label--centre led">Centro</span>
        </a>
        <a className="venue__credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
          © OpenStreetMap<span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
      <div className="venue__text">
        <h2 className="section-title led" id="local-title" data-split="lines">
          Local
        </h2>
        <p className="venue__name">{venue.name}</p>
        <address className="venue__address">
          {venue.street}
          <br />
          {venue.city}, {venue.region}, {venue.postalCode}
        </address>
        <dl className="venue__facts">
          <div>
            <dt className="label">Coordenadas</dt>
            <dd className="tnum">{venue.coordinates.label}</dd>
          </div>
        </dl>
        <a className="link" href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
          Abrir no mapa<span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}
