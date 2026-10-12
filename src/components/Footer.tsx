import Image from 'next/image';
import { pastEditions, site } from '@/data/site';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer field field--noite" data-tone="noite" data-edge>
      <div className="footer__brand">
        <Logo />
        <p className="footer__when">
          {site.dates.label}
          <br />
          {site.venue.name}
        </p>
      </div>
      <div className="footer__col">
        <h2 className="label">Realização</h2>
        <ul>
          {site.organizers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="footer__col footer__col--wide">
        <h2 className="label">Edições anteriores</h2>
        <ul className="footer__editions">
          {pastEditions.map((edition) => (
            <li key={edition.year}>
              <span className="led">{edition.year}</span>
              <span>{edition.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__base">
        <p>ETAL 2026, {site.fullName}</p>
        <p>
          Desenvolvido por{' '}
          <a className="footer__credit" href={site.credit.href} target="_blank" rel="noopener noreferrer">
            <Image className="footer__avatar" src={site.credit.avatar} alt="" width={28} height={28} />
            {site.credit.handle}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
