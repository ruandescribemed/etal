# ETAL 2026: design

## Brief

- **Subject:** VIII ETAL, Encontro de Tecnologia do Alto Oeste Potiguar. IFRN Campus Pau dos Ferros, 2 a 4 de dezembro de 2026 (quarta a sexta). Provisional theme: inteligência artificial.
- **Audience:** technical high school and college students from the Alto Oeste, plus teachers, researchers and professionals. Mostly on phones, often on mobile data.
- **Job:** in under 3 seconds say what it is, when and where, then lead to registration (SUAP). After that: schedule, talks, minicursos, e-sports.
- **Assets:** the ETAL mark (`src/components/Logo.tsx`): the "EtaL" lettering of past editions rebuilt as LED pixels on the IF grid, its three red dots fired, "2026" on a finer module beside the L. Inline SVG, lit in the LED colour of the field it sits on.
- **Constraints:** domain etal.nadic.com.br on Vercel. All 2026 content is mocked in `src/data/site.ts`. pt-BR.

## History

v1 (paper ground, sections as lists, network only in the hero) was rejected: "muito branco", too close to the 2025 site, not creative enough. The owner chose the "Painel de LED" direction below and gave freedom in structure and color.

The first LED hero (full green field, white lit cells running through the title) was rejected: "muito verde", the white animation "nada a ver", AI asks for more contrast. Of the black heroes prototyped with a green grid fading into the black, the owner chose the halftone (variant C, "Meio-tom").

Red was then dropped wherever it sat on green or filled a surface (fired numbers on green, ::selection, the red e-sports field, the header over it). Of three prototyped palettes the owner chose "Lima": red only fires on black; on green, firing lights a black cell with lime LEDs; e-sports became a lime screen.

The hero first switched on with a stepped-opacity flicker (an LED sign booting); the owner disliked it. Of four entrances prototyped (that flicker, letters firing at random, a column scanning the panel, the type rising while the halftone grows), the owner chose the last.

Of four ways to show the speakers prototyped (no photos, an avatar by the name, a lineup of portraits, one sticky screen), the owner chose the lineup.

Of the hero layouts prototyped (a centered column, the title as a full-width sign, the mark as the hero, then sizes and order inside the original split), the owner kept the split with everything in one block at the bottom: mark, theme, info, the dark above them.

The hero's info was too much text (a ruled block, "Quando / Onde" labels). Of four organizations prototyped (as it was, one line under the title, beside the name, an LED tag), the owner chose the LED tag: dates and place take the tag above the title ("2–4 dez · Pau dos Ferros, RN"), and "Tema de 2026" goes.

That LED hero then read as too decorative: "excesso de LED", and the halftone took a large share of the first screen without adding anything. Of four heroes prototyped without it (one sans headline, the three days beside the theme, colour bands, a countdown), the owner chose the days; their background was "muito seco", and of four backgrounds prototyped for it (two soft lights drifting, the lattice twinkling, a neural network, a small halftone corner), the owner chose the soft lights. The halftone and the WebGL layer went with it. The event's name sits under the mark.

A countdown to the event: of ten countdown components found in the shadcn registries and prototyped as banners (flip clocks, split-flap boards, sliding and rolling numbers, a launch card, NumberFlow), the owner chose the flip clock, in the dark tiles and lime figures of one of the split-flaps, as a bar above the header. Its figures went from Doto to Mona Sans ("letras pixelizadas tá feia"), and the "dias" label went.

## Concept

```
Idea:        ETAL 2026 is an LED panel made of the IF grid: every square is a pixel and a neuron.
             When the network thinks, the pixels light up; when they fire, they turn round: the red
             dot on black, a lit black cell on green.
Metaphor:    Stadium scoreboard / festival LED panel, built with the IF module (squares, one circle).
Signature:   Hero: on black, the mark, the theme in big Mona Sans, when and where in one line and the
             way in (the schedule, registration); beside them the three days, whose numbers are the
             hero's one LED and fire with their link. Two soft green lights drift behind it all.
Emotion:     A panel switching on in the dark. Loud, bright, playful, IFRN green on black.
Motion verb: light up. Snap on (0.12 to 0.18 s), slow decay (about 1 s). Numbers flip like a scoreboard.
Screenshot:  Black, the ETAL mark over "Inteligência Artificial" in big white type on the left; on the
             right the three days with lime LED numbers 2, 3, 4; a green glow in the top corner.
```

The concept beyond the hero:
- **Dot-matrix type (Doto)** for display lines, numbers and labels on the panel (not the hero's theme, set in Mona Sans: the hero keeps LED to the mark and the day numbers). Its ROND axis is the shape rule: square dots at rest, round dots when fired (CSS can transition it, so it works everywhere).
- **Color fields as screens of the panel**, alternating: green (campo), black (noite), lime (lima). The border between two fields is a row of pixels, not a straight line.
- **Countdown:** a bar above the header with the time left to the credenciamento, dd:hh:mm:ss on flip tiles (dark tiles, lime figures in Mona Sans). It hides once the event begins.
- **Ticker:** one black LED strip scrolling the event info, a plain marquee at a steady pace (the scroll and the pointer leave it alone).
- **Programação is a scoreboard:** day tabs; switching days flips the times like an LED board.
- **Talks:** a lineup, the people first: the panel shows each speaker in lime through its square dots; as the card crosses the reading line it fires, the photo comes in colour and the dots turn round. No photo yet: the panel stays off, with lit initials.
- **Local is a real map on the panel:** Pau dos Ferros from OpenStreetMap, rasterized once to LEDs (`src/data/venue-map.ts`): roads lit, streets dimmer, water in big dark green squares, the campus fired red on the BR-405 south of the centre, with a ring pulsing from it. Static SVG, no map library or tiles; "Abrir no mapa" is the interactive one. The plot carries the OpenStreetMap credit (ODbL).
- **Transition:** IF squares fill the screen from where you clicked; on the new page they fire (turn round) and go out.
- **404:** a panel where nothing lights up: "nenhum neurônio respondeu".

## Palette

| Role | Hex | Use |
|---|---|---|
| campo | `#5AA323` | green field (sampled from the logo). Text on it: ink only (5.9:1) |
| ink | `#08160B` | text on green and lime |
| noite | `#08110A` | black field |
| noite ink | `#EEF5E9` | text on black (17:1) |
| noite muted | `#9FB3A2` | secondary text on black (8.6:1) |
| lime | `#7DD13F` | lit LED type on black (10:1), lit cells on green, the lime field (ink on it 10:1) |
| ponto | `#ED3237` | logo red: fired dots, on black only (the logo's dots, the hero, the ticker) |

No secondary grey text on green or lime: hierarchy there comes from size and weight, because muted greens fail AA on the field.

## Type

- **Doto** (Google, variable `wght` + `ROND`): display, numbers, tabs, labels. Uppercase, weight 900, ROND 0 at rest, 100 when fired. Monospaced, so line widths are predictable (0.59 em per character).
- **Mona Sans** (Google, variable `wght` + `wdth`): reading text, talk titles, UI. 16 to 18 px body.

## Grid & rhythm

- 12 columns, fluid gutter; strong lines at col 1, 5 and 9. Phones: 4 columns.
- Fields: countdown (black bar) → hero (black) → ticker (black strip) → sobre (green) → programação + palestras (black) → minicursos (green) → e-sports (lime) → local (black) → inscrição (green) → footer (black).

## Motion

- Hero: its blocks settle in, in CSS (works before JS); two soft green lights drift behind it, slowly (16 and 21 s). No WebGL anywhere.
- Countdown: a tile flips when its digit changes (the old top half falls, the new bottom half swings up, 0.6 s). The time left is written into the HTML by an inline script before the first paint, so the page opens on the real time, with no 00:00:00:00 and no shift when React takes over.
- Scroll: Doto labels fire as they cross the reading line (CSS transition of `font-variation-settings`).
- Reduced motion: no drift, no ticker motion, no entrance; fired states stay static.
- No loader.
