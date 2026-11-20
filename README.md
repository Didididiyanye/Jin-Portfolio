# Jin Fanhao — Design Portfolio

Independent portfolio website for Jin Fanhao, a visual UI, product and creative designer working across interface systems, editorial layouts and motion-led digital experiences.

## Contents

- Monument-style 3D homepage with interactive section navigation
- Six selected projects presented as individual case studies
- HAPE brand website redesign
- Micro World insect science website
- PETLY interface study
- PETLY app design and user flow
- Y2K / CYBERGLOSS fashion website
- UI Motion external live project
- Bilingual English / Chinese interface
- Day / night themes
- Responsive layouts for desktop, tablet and mobile
- Loading screen, scroll-cover sections and motion-aware interactions

All projects are presented as independent concept work unless otherwise noted. No user research, usability testing or commercial results are fabricated.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Three.js / React Three Fiber
- GSAP and Framer Motion
- Locally hosted fonts via Fontsource

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run typecheck
npm run build
npm run start
```

No environment variables are required for the current version.

## Project structure

```text
app/          Next.js routes and page-specific styles
components/   Shared layout, interaction and case-study components
lib/          Project data, translations and site content
public/       Images, icons and static assets used by the website
```

## Deployment

The project is ready to deploy to Vercel or any environment that can run Next.js.  
If GitHub is used as the source repository, connect the repository to Vercel for automatic deployments.

## Author

Jin Fanhao — Visual UI, Product & Creative Designer