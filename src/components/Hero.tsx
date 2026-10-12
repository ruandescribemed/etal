import { site } from '@/data/site';
import { Logo } from './Logo';

export function Hero() {
  return (
    <section className="hero field field--noite" id="inicio" data-hero data-tone="noite" aria-labelledby="hero-title">
      {/* Static frame of the halftone for the no-GL path; the live one is drawn by motion/halftone. */}
      <div className="hero__halftone" aria-hidden="true" />

      <div className="hero__inner">
        <h1 className="hero__logo" id="hero-title">
          <Logo data-logo />
          <span className="hero__name">
            {site.edition} {site.fullName}
          </span>
        </h1>

        <div className="hero__theme">
          <p className="hero__label led">{site.theme.label}</p>
          <p className="hero__title led">
            {site.theme.lines.map((line) => (
              <span className="hero__line" key={line}>
                <span className="sr-only">{line}</span>
                {[...line].map((char, i) => (
                  <span className="hero__char" key={i} style={{ '--i': i }} aria-hidden="true">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>

        <dl className="hero__meta">
          <div>
            <dt className="label">Quando</dt>
            <dd>
              {site.dates.label}, {site.dates.weekdays}
            </dd>
          </div>
          <div>
            <dt className="label">Onde</dt>
            <dd>
              {site.venue.name}, {site.venue.city}, {site.venue.region}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
