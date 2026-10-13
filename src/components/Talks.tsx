import Image from 'next/image';
import { dayById, talks, type Speaker } from '@/data/site';

function Who({ speaker }: { speaker: Speaker }) {
  switch (speaker.kind) {
    case 'announced':
      return (
        <p className="talk__who">
          <span className="talk__name">{speaker.name}</span>
          <span className="talk__role">{speaker.role}</span>
        </p>
      );
    case 'tba':
      return <p className="talk__who talk__who--tba">{speaker.note}</p>;
  }
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter((_, i, words) => i === 0 || i === words.length - 1)
    .map((word) => word.charAt(0))
    .join('');

// A panel with no photo: a green screen with the initials once the name is out, half on with
// "a confirmar" before that.
function Off({ label, lit }: { label: string; lit: boolean }) {
  return (
    <div className={`talk__face talk__face--off${lit ? ' talk__face--lit' : ''}`}>
      <span className="talk__off led">{label}</span>
    </div>
  );
}

function Face({ speaker }: { speaker: Speaker }) {
  switch (speaker.kind) {
    case 'announced':
      return speaker.photo ? (
        <div className="talk__face">
          <Image src={speaker.photo} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
        </div>
      ) : (
        <Off label={initials(speaker.name)} lit />
      );
    case 'tba':
      return <Off label="A confirmar" lit={false} />;
  }
}

export function Talks() {
  return (
    <section className="talks field field--noite" id="palestras" data-tone="noite" aria-labelledby="palestras-title">
      <div className="section-head">
        <h2 className="section-title led" id="palestras-title" data-split="lines">
          Palestras
        </h2>
        <p className="section-note">Palestras e mesas-redondas, do modelo de linguagem ao mercado de trabalho no Alto Oeste.</p>
      </div>
      <ol className="talks__list">
        {talks.map((talk) => {
          const day = dayById(talk.day);
          return (
            <li className="talk" key={talk.slug} data-fire>
              <div className="talk__photo">
                <Face speaker={talk.speaker} />
                <span className="talk__stamp led">
                  {day.weekday.slice(0, 3)} {talk.start}
                </span>
              </div>
              <span className="talk__format">{talk.format}</span>
              <h3 className="talk__title">{talk.title}</h3>
              <Who speaker={talk.speaker} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
