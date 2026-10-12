import { site } from '@/data/site';

export function Venue() {
  const { venue } = site;
  return (
    <section className="venue field field--noite" id="local" data-tone="noite" data-edge aria-labelledby="local-title">
      {/* Pau dos Ferros as the one fired LED of the panel, plotted on its own coordinates. A click opens
          the map; the "Abrir no mapa" link is the accessible one. */}
      <a className="venue__plot" href={venue.mapUrl} target="_blank" rel="noopener noreferrer" aria-hidden="true" tabIndex={-1}>
        <div className="lattice lattice--lime" />
        <span className="venue__axis venue__axis--x" />
        <span className="venue__axis venue__axis--y" />
        <span className="venue__ring" />
        <span className="venue__pin" />
        <span className="venue__label venue__label--lat led">6°06′ S</span>
        <span className="venue__label venue__label--lng led">38°12′ O</span>
      </a>
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
