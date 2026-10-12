import type { Registration } from '@/data/site';

/** The network's output: one component per registration state, so no screen can show a stale CTA. */
export function RegistrationCta({ registration }: { registration: Registration }) {
  switch (registration.status) {
    case 'open':
      return (
        <a className="cta cta--open" href={registration.url} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
          <span className="cta__dot" aria-hidden="true" />
          <span>Inscreva-se no SUAP</span>
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      );
    case 'soon':
      // The finale already announces it in its title.
      return null;
    case 'closed':
      return (
        <p className="cta cta--closed">
          <span className="cta__dot" aria-hidden="true" />
          <span>Inscrições encerradas</span>
        </p>
      );
  }
}
