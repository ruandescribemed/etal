import { site, type Registration } from '@/data/site';
import { RegistrationCta } from './RegistrationCta';

const copy: Record<Registration['status'], { title: [string, string]; lead: string }> = {
  soon: { title: ['Inscrições', 'em breve'], lead: 'A inscrição vai ser feita pelo SUAP, e é lá também que você escolhe o seu minicurso.' },
  open: { title: ['Inscrições', 'abertas'], lead: 'A inscrição é feita pelo SUAP. É lá também que você escolhe o seu minicurso.' },
  closed: { title: ['Inscrições', 'encerradas'], lead: 'As inscrições desta edição terminaram. Até o próximo ETAL.' },
};

export function Finale() {
  const { title, lead } = copy[site.registration.status];
  return (
    <section className="finale field field--campo" id="inscricao" data-tone="campo" data-edge aria-labelledby="inscricao-title">
      <h2 className="finale__title led" id="inscricao-title">
        <span>{title[0]}</span>
        <span>
          {title[1]}
          <span className="finale__cursor" aria-hidden="true" />
        </span>
      </h2>
      <div className="finale__row">
        <p className="finale__lead">{lead}</p>
        <div className="finale__act">
          <RegistrationCta registration={site.registration} />
          <p className="finale__entry">{site.entry}</p>
        </div>
      </div>
    </section>
  );
}
