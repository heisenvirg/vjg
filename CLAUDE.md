# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js with Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite exists in this project.

## Environment Variables

Two required secrets in `.env.local`:
- `ANTHROPIC_API_KEY` — powers the AI chat widget (`/api/chat`)
- `RESEND_API_KEY` — powers the contact form (`/api/contact`)

## Architecture

Single-page portfolio (`src/app/page.tsx`) that renders all sections in order: Navbar → Hero → Services → Projects → About → TechStack → Testimonials → Contact → Footer → ChatWidget.

**Styling system — Tailwind v4 with `@theme`**
All design tokens are CSS custom properties defined in `globals.css` via `@theme {}`. Use semantic tokens (`bg-bg`, `text-text`, `text-muted`, `bg-surface`, `text-accent`) rather than raw Tailwind colors. Dark mode is class-based (`.dark`) via `next-themes`, defaulting to dark. Use `bg-linear-to-b` not `bg-gradient-to-b` (Tailwind v4 canonical). Custom utilities: `border-theme`, `shadow-card`, `shadow-card-hover`.

**Fonts** — Three Google fonts loaded in `layout.tsx` and exposed as CSS variables: `--font-syne` (display/headings), `--font-space-grotesk` (body), `--font-space-mono` (mono/labels). Use via `font-display`, `font-sans`, `font-mono` Tailwind classes.

**Theme** — `ThemeProvider` wraps the app in `layout.tsx`. It uses `attribute="class"` and `defaultTheme="dark"` with `enableSystem={false}`.

**Projects section** (`src/components/sections/Projects.tsx`) — Most complex component. Key concepts:
- `FilterKey` type gates the four filter tabs: `"All" | "Mockup" | "Web Dev" | "AI Automation"`
- "All" tab excludes Mockup projects and paginates at 6 (`visibleCount` state, +6 on Load More)
- Three lightbox modes determined at render: `isMockup` (two-column layout, left scrollable image + right case study), `isCaseStudy` (fixed hero + scrollable details, single image + details), gallery (multi-image slider)
- `isMockup` takes priority — if a project has `"Mockup"` in `filters`, it uses the two-column layout even if it has `details`
- Adding a project: add an entry to the `projects` array with `filters`, `image` (path under `public/`), and optionally `details` for case study mode or `images[]` for gallery mode

**API routes**
- `POST /api/chat` — Streams Claude Haiku responses. In-memory rate limiter: 20 req/hr per IP. Keeps last 10 messages only. System prompt is inline in the file and contains all of Virgil's bio, services, and pricing.
- `POST /api/contact` — Sends email via Resend. Validates `name`, `email`, `message`.

**ChatWidget** (`src/components/ui/ChatWidget.tsx`) — Client component with its own markdown renderer (`renderMarkdown`, `renderInline`). Has a built-in lead capture form (name, email, brief) triggered by the "Get a Quote" button. Streams responses from `/api/chat` by reading the `ReadableStream` body directly.

**Static assets** — All project screenshots live in `public/`. Mockup images follow naming conventions from Figma exports (e.g. `atlas-grey-v02-latest.png`). Regular project screenshots use descriptive kebab-case names.
