# Virgil Joseph Garrido — Portfolio

Personal portfolio site built with Next.js 15, Tailwind CSS v4, and Framer Motion.

**Live:** [vjg.vercel.app](https://vjg.vercel.app)

## Features

- AI chat widget powered by Claude Haiku — answers questions about services, projects, and pricing with in-chat lead capture
- Contact form with Resend email delivery
- Project gallery with filter tabs (Web Design, Web Dev, AI Automation)
- Dark / light theme toggle
- Downloadable resume at `/resume.html`
- Rate-limited API routes (20 req/hr per IP)

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **AI:** Anthropic Claude Haiku (`claude-haiku-4-5-20251001`)
- **Email:** Resend
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Add your RESEND_API_KEY and ANTHROPIC_API_KEY
npm run dev
```

## Environment Variables

```
RESEND_API_KEY=
ANTHROPIC_API_KEY=
```

## Contact

- Email: virgilj.garrido@gmail.com
- WhatsApp: +63 999 156 7747
- LinkedIn: [virgil-joseph-garrido](https://www.linkedin.com/in/virgil-joseph-garrido-9ba0a3357/)
