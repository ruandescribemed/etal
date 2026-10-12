import { ticker } from '@/data/site';

/** One LED strip. The track holds the items twice so the loop is seamless; it is decorative. */
export function Ticker() {
  return (
    <div className="ticker field field--noite" data-ticker data-tone="noite" aria-hidden="true">
      <div className="ticker__track" data-track>
        {[0, 1].map((copy) =>
          ticker.map((item) => (
            <span className="ticker__item led" key={`${copy}-${item}`}>
              {item}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
