import { about } from '@/data/site';

export function About() {
  return (
    <section className="about field field--campo" id="sobre" data-tone="campo" aria-labelledby="sobre-title">
      <h2 className="about__title led" id="sobre-title" data-fire>
        <span className="node" aria-hidden="true" />O encontro
      </h2>
      <p className="about__statement" data-split="lines">
        {about.statement}
      </p>
    </section>
  );
}
