"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Code2, Camera, Briefcase, FolderKanban, Star, MessageCircle, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const socialLinks = [
  { icon: Code2, href: "https://github.com/heisenvirg", label: "GitHub" },
  { icon: Camera, href: "https://www.instagram.com/heisenvirg/", label: "Instagram" },
  { icon: Briefcase, href: "https://www.linkedin.com/in/virgil-joseph-garrido-9ba0a3357/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:virgilj.garrido@gmail.com", label: "Email" },
  { icon: MessageCircle, href: "https://wa.me/639991567747?text=Hi%20Virgil%2C%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you!", label: "WhatsApp" },
  { icon: Download, href: "/resume.html", label: "Resume" },
];

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: FolderKanban, value: "50+", label: "Projects Delivered" },
  { icon: Star, value: "5★", label: "Client Rating" },
];

const skills = [
  "#WebDesign", "#WebDevelopment", "#AIIntegration", "#NextJS", "#MakeAutomation", "#ClaudeAI",
];

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center bg-bg pt-28 pb-20 px-6">
      <div className="w-full max-w-2xl mx-auto text-center">

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-6"
        >
          <div className="w-32 h-32 rounded-full shadow-card mx-auto overflow-hidden border-4 border-bg">
            <Image
              src="/profile-picture.jpg"
              alt="Virgil Joseph Garrido"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Availability badge */}
          <div className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-card border-2 border-bg">
            <span className="text-xs font-bold text-bg">✓</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-text mb-2"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Virgil Joseph Garrido
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-muted text-base mb-3"
        >
          Web Developer &amp; AI Integrator
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm text-muted max-w-md mx-auto leading-relaxed mb-6"
        >
          I build websites and AI tools that help businesses get more customers,
          save time, and{" "}
          <span className="text-text font-medium">look like they spent 10x more.</span>
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full bg-surface shadow-card flex items-center justify-center text-muted hover:text-text hover:shadow-card-hover transition-all"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

        {/* Skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {skills.map((s) => (
            <span
              key={s}
              className="px-4 py-1.5 rounded-full bg-surface text-xs font-mono text-muted border border-theme"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* Stats pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface shadow-card text-sm font-sans text-muted"
            >
              <Icon size={15} className="text-muted shrink-0" />
              <span className="font-semibold text-text">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-text text-bg font-sans text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full bg-surface text-text font-sans text-sm font-medium shadow-card hover:shadow-card-hover transition-all border border-theme"
          >
            Let&apos;s Talk →
          </a>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted"
        >
          🇵🇭 Dasmariñas, Cavite, Philippines · Available now
        </motion.p>
      </div>
    </section>
  );
}
