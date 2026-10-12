import { Doto, Mona_Sans } from 'next/font/google';

// Text and UI. The width axis keeps long Portuguese words in check on phones.
export const mona = Mona_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-mona',
  display: 'swap',
});

// The LED panel: a dot-matrix face whose ROND axis turns square dots (the IF grid) into round ones
// (a neuron firing).
export const doto = Doto({
  subsets: ['latin'],
  axes: ['ROND'],
  variable: '--font-doto',
  display: 'swap',
});
