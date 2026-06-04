"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Happy Clients" },
  { value: "7+", label: "Years Experience" },
  { value: "5★", label: "Client Rating" },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] uppercase tracking-widest text-muted text-center mb-8"
        >
          About Me
        </motion.p>

        {/* Big centered statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-display font-bold text-text text-center mx-auto max-w-4xl leading-tight mb-12"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          I build websites and AI tools that help businesses{" "}
          <span className="text-accent">get more customers,</span>{" "}
          save time, and look like they spent 10x more.
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="h-px bg-theme mb-12 origin-left"
          style={{ backgroundColor: "var(--divider)" }}
        />

        {/* Two-column bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16"
        >
          <p className="font-sans text-base text-muted leading-relaxed">
            I&apos;m Virgil — a fullstack developer, UI/UX designer, and AI integrator
            based in the Philippines. Before going independent, I spent 4 years as a
            UI/UX designer at Growmodo, a global design platform serving 200+ brands
            worldwide. I use AI as a force multiplier: what used to take an agency three
            weeks, I ship in days — without cutting corners on quality.
          </p>
          <p className="font-sans text-base text-muted leading-relaxed">
            I don&apos;t stop at websites. I wire in AI tools that actually do work —
            answer customer questions around the clock, automate repetitive tasks, and
            save your team hours every week. Things that used to require a full dev team
            or an agency retainer. You get the same results for a fraction of the cost.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              className="bg-surface rounded-2xl p-6 text-center shadow-card"
            >
              <p className="font-display font-black text-accent leading-none mb-2"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                {s.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row: location + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-theme"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🇵🇭</span>
            <div>
              <p className="font-sans text-sm text-text font-medium">
                Dasmariñas, Cavite, Philippines
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
                Open to freelance &amp; full-time roles
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-text text-bg font-sans text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Let&apos;s Talk →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
