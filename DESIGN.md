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

## Concept

```
Idea:        ETAL 2026 is an LED panel made of the IF grid: every square is a pixel and a neuron.
             When the network thinks, the pixels light up; when they fire, they turn round: the red
             dot on black, a lit black cell on green.
Metaphor:    Stadium scoreboard / festival LED panel, built with the IF module (squares, one circle).
Signature:   Hero panel: on black, the giant dot-matrix title rises into place letter by letter. Beside it a
             halftone of green IF squares fades toward the title by shrinking (full squares at the
             edge, nothing near the words); the pointer swells and lights them, crossed squares fire
             (round, red), a tap sends a ripple. A WebGL shader on the panel's grid.
Emotion:     A panel switching on in the dark. Loud, bright, playful, IFRN green on black.
Motion verb: light up. Snap on (0.12 to 0.18 s), slow decay (about 1 s). Numbers flip like a scoreboard.
Screenshot:  Black, "INTELIGÊNCIA ARTIFICIAL" in pale LED dots on the left; on the right, green
             squares growing from nothing to a full wall, a swell of lime ones around the pointer.
```

The concept beyond the hero:
- **Dot-matrix type (Doto)** for every display line, numbers and labels on the panel. Its ROND axis is the shape rule: square dots at rest, round dots when fired (CSS can transition it, so it works everywhere).
- **Color fields as screens of the panel**, alternating: green (campo), black (noite), lime (lima). The border between two fields is a row of pixels, not a straight line.
- **Ticker:** one black LED strip scrolling the event info, faster when the page scrolls.
- **Programação is a scoreboard:** day tabs; switching days flips the times like an LED board.
- **Talks:** a lineup, the people first: the panel shows each speaker in lime through its square dots; as the card crosses the reading line it fires, the photo comes in colour and the dots turn round. No photo yet: the panel stays off, with lit initials.
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
- Fields: hero (black, 100svh) → ticker (black strip) → sobre (green) → programação + palestras (black) → minicursos (green) → e-sports (lime) → local (black) → inscrição (green) → footer (black).

## Motion

- Hero entrance in CSS (the type rises letter by letter, works before JS); the halftone and its hover in a GL shader, growing from the edge once GL is up, with a static CSS halftone when GL is off.
- Scroll: Doto labels fire as they cross the reading line (CSS transition of `font-variation-settings`).
- Reduced motion: no GL, no ticker motion, no entrance; fired states stay static.
- No loader.
