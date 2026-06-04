"use client";

import { motion } from "framer-motion";
import { Palette, Code2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  num: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const services: Service[] = [
  {
    num: "01",
    icon: Palette,
    title: "Web Design",
    subtitle: "No templates. No compromises.",
    desc: "Every pixel is intentional. I design from scratch in Figma — layouts, typography, color, and motion all built around your specific audience and goals. The result looks like it cost $15k. The timeline doesn't.",
    tags: ["Figma", "UI/UX", "Branding", "Prototyping"],
  },
  {
    num: "02",
    icon: Code2,
    title: "Web Development",
    subtitle: "Shipped fast. Built to last.",
    desc: "Production-ready sites built with Next.js, TypeScript, and Tailwind — SEO-optimized, fast-loading, and deployable in days. I use AI as a force multiplier to move at a speed agencies can't match, without cutting corners on quality.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    num: "03",
    icon: Zap,
    title: "AI Integration",
    subtitle: "Features your competitors don't have yet.",
    desc: "I wire real AI into your site — not gimmicks. Chatbots that handle customer inquiries around the clock, automations that cut out manual work, and smart tools your team will actually use. All integrated cleanly into your existing site or as part of a fresh build.",
    tags: ["Claude AI", "n8n", "OpenAI", "Make", "Zapier"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              What I Offer
            </p>
            <h2
              className="font-display font-bold text-text"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              My Services
            </h2>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-full bg-text text-bg font-sans text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Let&apos;s Talk →
          </a>
        </motion.div>

        {/* Alternating rows */}
        <div className="mt-10">
          {services.map((s, i) => {
            const isEven = i % 2 === 0;
            const Icon = s.icon;

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center border-b border-theme py-8 lg:py-10 hover:bg-surface rounded-2xl px-5 -mx-5 transition-colors"
              >
                {/* Title side — alternates left/right */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-surface group-hover:bg-accent/10 border border-theme flex items-center justify-center transition-colors shrink-0">
                      <Icon size={18} className="text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {s.num}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-text group-hover:text-accent transition-colors mb-1"
                    style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {s.subtitle}
                  </p>
                </div>

                {/* Description side — alternates right/left */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <p className="font-sans text-sm text-muted leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-surface border border-theme text-[10px] font-mono text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
