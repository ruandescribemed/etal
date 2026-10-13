import { days, site, type Registration } from '@/data/site';
import { Logo } from './Logo';
import { RegistrationCta } from './RegistrationCta';

// The first screen: what, when and where on the left; the three days on the right, each leading to the
// schedule. Behind them two soft green lights drift. LED is kept to the mark and the day numbers.
export function Hero() {
  return (
    <section className="hero field field--noite" id="inicio" data-hero data-tone="noite" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__main">
        <h1 className="hero__mark" id="hero-title">
          <Logo />
          <span className="hero__name">
            {site.edition} {site.fullName}
          </span>
        </h1>
        <p className="hero__title">{site.theme.lines.join(' ')}</p>
        <p className="hero__facts">
          {site.dates.label}, {site.dates.weekdays} · {site.venue.name} · {site.entryShort}
        </p>
        <div className="hero__acts">
          <Actions registration={site.registration} />
        </div>
      </div>

      <ol className="hero__days" aria-label="Os três dias">
        {days.map((day) => (
          <li key={day.id}>
            <a className="hero__day" href="#programacao">
              <span className="hero__day-num led tnum">{Number(day.isoDate.slice(-2))}</span>
              <span className="hero__day-name">{day.weekday}</span>
              <span className="hero__day-summary">{day.summary}</span>
              <span className="hero__day-go" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

// While registration is open it leads; otherwise the schedule does. The other way in is plain text.
function Actions({ registration }: { registration: Registration }) {
  const schedule = (
    <a className="cta cta--open" href="#programacao">
      <span className="cta__dot" aria-hidden="true" />
      <span>Ver programação</span>
    </a>
  );
  switch (registration.status) {
    case 'open':
      return (
        <>
          <RegistrationCta registration={registration} />
          <a className="link" href="#programacao">
            Ver programação
          </a>
        </>
      );
    case 'soon':
      return (
        <>
          {schedule}
          <a className="link" href="#inscricao">
            Inscrições em breve
          </a>
        </>
      );
    case 'closed':
      return (
        <>
          {schedule}
          <p className="hero__note">Inscrições encerradas</p>
        </>
      );
  }
}
