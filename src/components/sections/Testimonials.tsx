"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "Before writing a single line of code, I dig into your business — who your customers are, what they need, and what's stopping them from converting. Most freelancers skip this. I don't.",
  },
  {
    num: "02",
    title: "Build",
    desc: "I use AI as a force multiplier to move fast without cutting corners. Clean code, real components, production-ready from day one. You get agency-quality output at a fraction of the timeline and cost.",
  },
  {
    num: "03",
    title: "Ship",
    desc: "You get a live, tested site — not a Figma file that needs another developer to finish. Deployed on Vercel, SEO-ready, and handed over with everything you need to run it yourself.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            How I Work
          </p>
          <h2
            className="font-display font-bold text-text max-w-xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Simple process,<br />
            <span className="text-accent">serious results.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-2xl p-7 shadow-card flex flex-col gap-5"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {s.num}
              </span>
              <h3
                className="font-display font-bold text-text"
                style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)" }}
              >
                {s.title}
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-theme"
        >
          <p className="font-sans text-sm text-muted">
            Most projects go from brief to live in{" "}
            <span className="text-text font-medium">1–2 weeks.</span>
          </p>
          <a
            href="#contact"
            className="shrink-0 px-6 py-2.5 rounded-full bg-text text-bg font-sans text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Start a Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
