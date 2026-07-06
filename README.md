# AnushkaOS

Anushka Nayak's personal site — framed as an AI product studio dashboard rather than a
traditional portfolio. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

**Live:** [anushkanayak.vercel.app](https://anushkanayak.vercel.app)
**Source:** [github.com/anushkanayak15/personal_website](https://github.com/anushkanayak15/personal_website)

---

## Design philosophy

Minimal. Intelligent. Interactive. The site borrows from Linear's spacing and calm layouts,
Supabase's glass-card engineering aesthetic, Mixpanel's dashboard/KPI language, and Rauno
Freiberg-style micro-interactions — merged into something that reads as a product, not a resume.

Every page pulls from real, structured content (resume, GitHub repos, project READMEs) rather
than lorem-ipsum placeholders. See [Content model](#content-model) below.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based theme, no `tailwind.config.js`) |
| Animation | Framer Motion |
| Diagrams | React Flow (`@xyflow/react`) |
| Charts | Recharts |
| Command palette | `cmdk` |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Icons | `lucide-react` + hand-rolled brand SVGs (GitHub/LinkedIn) |
| Deployment target | Vercel |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (also type-checks)
npm run lint    # ESLint
```

---

## Architecture

### Layout shell

`src/app/layout.tsx` renders the persistent chrome shared by every route:

- `SiteNav` — sticky top nav with active-route indicator
- `CommandPalette` — ⌘K palette (navigate + quick actions), backed by a tiny pub-sub store
  (`command-palette-store.ts`) so any component can open/close it without prop drilling
- `GlobalShortcuts` — bare-letter keyboard shortcuts (`H` `P` `R` `E` `W` `C`) that mirror the
  hints shown in the command palette, disabled while typing in an input
- `LiveDashboard` — a persistent right-hand workspace panel (visible at `2xl` breakpoints and
  up) showing current build, latest GitHub commit (fetched live from the GitHub REST API),
  stack, and status
- `SiteFooter`
- `PersonJsonLd` — Schema.org `Person` structured data
- `MotionProvider` — wraps the tree in `MotionConfig reducedMotion="user"` so every Framer
  Motion animation site-wide respects the OS-level reduced-motion preference

### Content model

All real-world content — resume facts, project write-ups, research model cards, skills,
metrics — lives in `src/content/*.ts` as typed data, not scattered through JSX. Pages import
from there and render. This keeps content edits (new project, updated metric, new role) to a
single file with no risk of breaking layout code.

```
src/content/
├── profile.ts           # name, links, resume URL, status — single source of truth
├── experience.ts         # work history + involvement, used by the Experience timeline
├── products.ts            # 4 full case studies incl. React Flow diagram data
├── research.ts            # Hugging-Face-style model cards
├── skills.ts               # skill taxonomy cross-referenced to project slugs
├── metrics.ts              # home page KPI numbers (derived, not guessed)
├── other-builds.ts         # secondary GitHub repos shown as a compact strip
├── github-activity.ts      # snapshot of real repo push activity for the home chart
└── writing/*.mdx           # engineering journal posts (frontmatter + MDX body)
```

`src/lib/writing.ts` reads the `writing/*.mdx` directory at request time with `gray-matter` for
frontmatter and `reading-time` for estimated read time — no external CMS.

### Products

`src/app/products/page.tsx` lists the four featured case studies (GrowthOS, the American
Express DNS platform, Biomedical RAG, Fairness-Aware ASR fine-tuning) plus a compact "more on
GitHub" strip. Each case study has a full page at `src/app/products/[slug]/page.tsx`
(`generateStaticParams`-driven, fully static) with a consistent section order: Overview →
Problem → Solution → Architecture → **Interactive Diagram** → Engineering Decisions → Metrics →
Tech Stack → Lessons → (Roadmap where relevant).

The diagram for each product is plain data (`nodes`/`edges` with a `tone`) defined in
`content/products.ts` and rendered by `components/diagrams/flow-diagram.tsx` — a thin,
reusable wrapper around React Flow. It's lazy-loaded via `flow-diagram-lazy.tsx`
(`next/dynamic`) so the React Flow bundle only loads on pages that actually use it.

### Research

`src/app/research/page.tsx` renders `ModelCard` components (Dataset / Models / Evaluation /
Pipeline / Results) for the research-flavored projects — deliberately styled after Hugging Face
model cards rather than blog-style write-ups.

### Experience

`src/components/experience/timeline.tsx` is a Railway-inspired vertical timeline with a
scroll-linked accent line (`useScroll` + `useSpring` from Framer Motion drawing the line as you
scroll). The featured entry (American Express) embeds the same `FlowDiagram` used on its
Products case study page.

### Live Data Field

`src/components/live-data-field/live-data-field.tsx` is the homepage's signature
interaction: a `<canvas>` background with a cursor-following radial glow, a faint node grid
that brightens near the pointer, and drifting particles. It's driven by
`useSyncExternalStore` (not `useEffect` + `setState`) so capability detection —
`prefers-reduced-motion`, coarse pointers, small viewports — reacts live to `matchMedia` changes
instead of only checking once on mount. Disabled entirely (canvas never mounts) under any of
those conditions.

### SEO

- `src/app/sitemap.ts` / `robots.ts` — generated from the same content files as the pages
- Per-route `metadata` exports with a title template (`%s — AnushkaOS`)
- `PersonJsonLd` (global) and `SoftwareJsonLd` (per product) structured data
- `src/app/icon.svg` — brand favicon

---

## Folder structure

```
src/
├── app/                    # routes (App Router)
│   ├── layout.tsx          # root shell: nav, command palette, dashboard, footer
│   ├── page.tsx             # home dashboard
│   ├── products/            # index + [slug] case studies
│   ├── research/             # model cards
│   ├── experience/            # timeline
│   ├── writing/                # index + [slug] MDX posts
│   ├── contact/                 # minimal contact cards
│   ├── sitemap.ts / robots.ts
│   └── icon.svg / favicon.ico
├── components/
│   ├── ui/                  # design-system primitives (Card, Badge, KpiStat, ...)
│   ├── nav/                  # nav, footer, skip link, global shortcuts
│   ├── command-palette/
│   ├── dashboard/             # persistent Live Dashboard + GitHub commit hook
│   ├── diagrams/               # React Flow wrapper + lazy variant
│   ├── products/, research/, experience/, home/, writing/  # feature-specific components
│   ├── live-data-field/
│   ├── motion/                  # Reveal + MotionConfig provider
│   └── seo/                       # JSON-LD components
├── content/                # typed content — see above
└── lib/                    # small framework-agnostic helpers (cn, relative-time, etc.)
```

---

## Deployment

The app is a standard Next.js App Router project with no external services required at build
time (the only runtime network call is a client-side, unauthenticated fetch to the public
GitHub REST API for the "Latest Commit" widget, which fails gracefully if rate-limited).

**Currently deployed on Vercel:**

- Production: https://personalwebsite-three-ebon.vercel.app
- Project dashboard: https://vercel.com/anushkanayak/personal_website
- Source: https://github.com/anushkanayak15/personal_website

Deployed via the Vercel CLI (`vercel --prod`). The project was created directly from the CLI
rather than the dashboard's "Import Git Repository" flow, so **auto-deploy-on-push isn't wired
up yet** — to enable it, open the project on Vercel → Settings → Git → Connect Git Repository
and select `anushkanayak15/personal_website`. Once connected, every push to `main` deploys
automatically and PRs get preview URLs.

**Redeploying manually in the meantime:**

```bash
npx vercel --prod
```

**Custom domain:** add one under Project Settings → Domains in Vercel, then update `SITE_URL`
in `src/content/profile.ts` to match (used by the sitemap, robots.txt, and Open
Graph/structured data) and redeploy.

**Deploying elsewhere / from scratch:**

1. Push this repo to GitHub (already done).
2. Import it in [Vercel](https://vercel.com/new) — no configuration needed, it auto-detects Next.js.
3. Update `SITE_URL` in `src/content/profile.ts` to the deployed domain.
4. Deploy.

**Self-hosted:** `npm run build && npm run start` serves the production build on port 3000.

---

## Updating content

- **New project / update metrics / change status:** edit the relevant file in `src/content/`.
  No JSX changes needed for text/data updates.
- **New journal entry:** add a `.mdx` file to `src/content/writing/` with `title`, `date`,
  `excerpt`, and `tags` frontmatter — it's picked up automatically by the writing index and
  `generateStaticParams`.
- **Replace the résumé:** overwrite `public/resume.pdf`.
- **Swap the GitHub handle:** update `PROFILE.githubHandle` in `src/content/profile.ts` — the
  command palette, contact page, and Live Dashboard's commit widget all read from there.
