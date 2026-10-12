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
              <p className="talk__when">
                <span className="talk__stamp led">
                  {day.weekday.slice(0, 3)} {talk.start}
                </span>
                <span className="talk__format">{talk.format}</span>
              </p>
              <h3 className="talk__title">{talk.title}</h3>
              <Who speaker={talk.speaker} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
