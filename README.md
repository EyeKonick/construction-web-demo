# Haligi Builders — construction company website (demo)

Marketing site for **Haligi Builders**, a made-up general contractor in Metro Manila ("haligi" is Filipino for pillar).
Built with [Astro](https://astro.build), no UI framework. Smooth scrolling uses [Lenis](https://lenis.darkroom.engineering/);
every other effect is CSS driven by small TypeScript modules (no animation library).

Its motion system follows `../Architecture-Web-Demo`; the design, layout and content are its own.

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Dev server at `localhost:4321`           |
| `npm run build`   | Production build to `./dist/`            |
| `npm run preview` | Preview the build                        |

## Structure

```text
src/
├── assets/images/      Photography (optimised to WebP at build time)
├── components/         One component per section + Header, Footer, Tape, Preloader, Logo, Icon, BackToTop
├── data/site.ts        All copy: company details, services, projects, process, safety, quotes
├── layouts/Layout.astro
├── pages/              index.astro and 404.astro
├── scripts/            Smooth scroll, header, preloader, hero, reveals/parallax/counters,
│                       services, projects (filters, dialog), process timeline, quotes, form
└── styles/global.css   Design tokens and all styles
```

## Motion

- **Intro:** a yellow counter panel (once per browser session) lifts away, then the hero headline rises word by word,
  the "On site now" progress bar fills and the figures count up.
- **Scroll:** headings slide out of line masks, photographs are uncovered by a sweeping yellow plate, rulers draw,
  the company statement fills word by word as it scrolls, photos drift in parallax, the hero lifts and fades.
- **Services:** the photo frame is sticky; the service crossing the middle of the screen wipes its photo in.
- **Process:** the timeline rail fills with scroll and each stage marker turns as the line passes it.
- **Projects:** sliding filter indicator with FLIP re-layout, spec strip on hover, cursor "View" badge, full-screen
  project dialog with deep links (`#p-slug`).
- **Hover:** label roll + fill sweep on buttons, magnetic buttons, drawn underlines, 1.03 photo zoom.
- **Footer:** a curtain reveal with a tilted caution-tape marquee (pausable).
- `prefers-reduced-motion`: nothing hidden or moving; Lenis, parallax and the intro are off.

## Before launch

- Replace the stand-in photographs (Unsplash, credited in the footer) with the company's own site photography.
- All names, figures, projects and quotes are placeholders. Contacts use `.example` addresses.
- Set `PUBLIC_CONTACT_ENDPOINT` (see `.env.example`) to send the quote form to Formspree/Web3Forms/your API;
  without it the form opens a pre-filled email.
