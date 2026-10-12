import 'react';

// Allow CSS custom properties (style={{ '--col': 3 }}) without casting.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
