# Suthikshan K — Premium Portfolio (Desktop Web)

Dark, desktop-first portfolio with scroll-triggered GSAP animations. Built with
React 18 + Vite, Tailwind CSS v4, GSAP (ScrollTrigger), and Lucide icons.

## Sections

1. **Hero** — headline fade-in, divider draw, staggered subtitle, pulsing scroll hint
2. **Creative Developer** — slide-in headline words, avatar + bio, tech pills, stats
3. **Projects** — 5 full-viewport sections (TrustPulse, Civic Flow, CurriSync, AMS, Bearing RUL)
   with parallax visuals, tech pills, and Live/GitHub CTAs
4. **Experience** — timeline with drawing spine, pulsing dots, cascading cards
5. **Skills & Tech** — categorized badges with cascade + hover glow
6. **Achievements** — rotating cards with bounce icons
7. **Contact / Footer** — elastic headline, mail/phone, socials, CTA buttons

## Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy on Vercel

```bash
npm i -g vercel
vercel            # first deploy
vercel --prod     # production
```

Or connect the repo to Vercel — framework preset **Vite** is auto-detected,
build command `npm run build`, output directory `dist`.

## Customization

- **Profile photo** — replace `public/avatar.svg` with your photo (keep the same
  filename or update the `src` in `src/components/About.jsx`).
- **Project GitHub links** — currently point at `github.com/suthiks20`; update
  the `github` link in `src/lib/data.js` per project if you have repo URLs.
- **All content** (projects, experience, skills, achievements, contact links)
  lives in `src/lib/data.js`.