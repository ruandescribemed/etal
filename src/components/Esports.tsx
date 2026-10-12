import { esports, games } from '@/data/site';

export function Esports() {
  return (
    <section className="esports field field--lima" id="e-sports" data-tone="lima" data-edge aria-labelledby="esports-title">
      <div className="section-head">
        <h2 className="section-title led" id="esports-title" data-split="lines">
          E-sports
        </h2>
        <p className="section-note">{esports.intro}</p>
      </div>
      <ul className="games">
        {games.map((game) => (
          <li className="game" key={game.slug}>
            <span className="node" aria-hidden="true" />
            <span className="game__name led">{game.name}</span>
            <span className="game__seats led">{game.seats} vagas</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
