"use client";

import { motion } from "framer-motion";

interface Tool {
  name: string;
  slug: string | null;
  invert?: boolean;
  customIcon?: string;
}

const tools: Tool[] = [
  { name: "Next.js",       slug: "nextdotjs",    invert: true },
  { name: "React",         slug: "react" },
  { name: "TypeScript",    slug: "typescript" },
  { name: "Tailwind CSS",  slug: "tailwindcss" },
  { name: "Framer",        slug: "framer" },
  { name: "Node.js",       slug: "nodedotjs" },
  { name: "Supabase",      slug: "supabase" },
  { name: "Vercel",        slug: "vercel",        invert: true },
  { name: "Stripe",        slug: "stripe" },
  { name: "WordPress",     slug: "wordpress" },
  { name: "Figma",         slug: "figma" },
  { name: "Photoshop",     slug: "adobephotoshop" },
  { name: "Illustrator",   slug: "adobeillustrator" },
  { name: "n8n",           slug: "n8n" },
  { name: "Make",          slug: "make" },
  { name: "Zapier",        slug: "zapier" },
  { name: "Airtable",      slug: "airtable" },
  { name: "Sanity",        slug: "sanity",         invert: true },
  { name: "OpenAI",        slug: null,             customIcon: "openai" },
  { name: "Claude",        slug: "anthropic",     invert: true },
  { name: "Elementor",     slug: "elementor" },
  { name: "GoHighLevel",   slug: null },
  { name: "HubSpot",       slug: "hubspot" },
];

const row1 = tools.slice(0, 10);
const row2 = tools.slice(10);

function GHLIcon() {
  return (
    <span className="w-7 h-7 rounded-md bg-[#F97316] flex items-center justify-center text-white font-black text-[10px] leading-none shrink-0">
      GHL
    </span>
  );
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 dark:fill-white fill-[#111]" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.387 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.498 4.498 0 0 1-.692 8.115v-5.678a.79.79 0 0 0-.386-.668zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
}

function ToolCard({ tool, idx }: { tool: Tool; idx: number }) {
  return (
    <div
      key={idx}
      className="flex flex-col items-center gap-2.5 px-5 py-4 shrink-0 w-27.5"
    >
      {tool.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}`}
          alt={tool.name}
          width={28}
          height={28}
          className={`w-7 h-7 object-contain${tool.invert ? " dark:invert" : ""}`}
        />
      ) : tool.customIcon === "openai" ? (
        <OpenAIIcon />
      ) : (
        <GHLIcon />
      )}
      <span className="font-mono text-[9px] uppercase tracking-wide text-muted text-center leading-tight">
        {tool.name}
      </span>
    </div>
  );
}

const edgeFade = {
  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
};

export default function TechStack() {
  return (
    <section className="py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Tech Stack
          </p>
          <h2
            className="font-display font-bold text-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Tools I Work With
          </h2>
        </div>
      </div>

      {/* Row 1 — slides right */}
      <div className="overflow-hidden mb-3" style={edgeFade}>
        <div
          className="flex gap-3"
          style={{ width: "max-content", animation: "marquee-right 30s linear infinite", willChange: "transform" }}
        >
          {[...row1, ...row1, ...row1].map((tool, i) => (
            <ToolCard key={i} tool={tool} idx={i} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides left */}
      <div className="overflow-hidden" style={edgeFade}>
        <div
          className="flex gap-3"
          style={{ width: "max-content", animation: "marquee-left 30s linear infinite", willChange: "transform" }}
        >
          {[...row2, ...row2, ...row2].map((tool, i) => (
            <ToolCard key={i} tool={tool} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
