import { Board } from './Board';

export function Schedule() {
  return (
    <section className="schedule field field--noite" id="programacao" data-tone="noite" data-edge aria-labelledby="programacao-title">
      <div className="section-head">
        <h2 className="section-title led" id="programacao-title" data-split="lines">
          Programação
        </h2>
        <p className="section-note">Os horários ainda podem mudar até a semana do evento.</p>
      </div>
      <Board />
    </section>
  );
}
