import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'Esta página não existe no site do ETAL 2026. Volte para o início para ver a programação, as palestras e os minicursos.',
};

// A panel where nothing lights up.
export default function NotFound() {
  return (
    <section className="missing field field--noite" data-tone="noite">
      <div className="lattice lattice--lime" aria-hidden="true" />
      <p className="missing__code led" aria-hidden="true">
        404
      </p>
      <h1 className="missing__title led">Nenhum neurônio respondeu</h1>
      <p className="missing__text">Esta página não existe ou mudou de endereço.</p>
      <Link className="cta cta--outline" href="/">
        <span className="cta__dot" aria-hidden="true" />
        <span>Voltar para o início</span>
      </Link>
    </section>
  );
}
