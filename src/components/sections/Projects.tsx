"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

type FilterKey = "All" | "Web Design" | "Web Dev" | "AI Automation";

interface Project {
  num: string;
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  color: string;
  accent: string;
  badge?: string;
  image?: string;
  images?: string[];
  href?: string;
  filters: FilterKey[];
}

const FILTERS: FilterKey[] = ["All", "Web Design", "Web Dev", "AI Automation"];

const projects: Project[] = [
  {
    num: "01",
    title: "Lumière Collection",
    category: "Web Design · Development",
    year: "2025",
    desc: "Curated collection of five private luxury villas across Tulum, Lisbon, Saint-Tropez, Santorini, and Maui. Editorial split-screen layout, direct booking with no platform fees, and a WhatsApp concierge flow.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    color: "bg-[#0F0C07]",
    accent: "#C9A96E",
    image: "/lumiere-collection.png",
    href: "https://lumiere-collection.vercel.app/",
    filters: ["Web Design", "Web Dev"],
  },
  {
    num: "02",
    title: "Sunset Villa",
    category: "Web Design · Development",
    year: "2025",
    desc: "Luxury beachfront villa rental site for a private residence on Collins Avenue, Miami. Full-bleed hero, scroll animations, direct booking flow with Stripe, local guide, and Airbnb/VRBO sync — built to drive direct bookings and cut platform fees.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    color: "bg-[#0A0E17]",
    accent: "#C9A052",
    image: "/sunset-villa.png",
    href: "https://vacation-rental-lrom.vercel.app/",
    filters: ["Web Design", "Web Dev"],
  },
  {
    num: "03",
    title: "AI Candidate Screening",
    category: "AI Automation · Make.com",
    year: "2026",
    desc: "End-to-end hiring pipeline that captures Tally form submissions, scores candidates 1–10 using Claude AI, logs results with strengths/weaknesses/recommendations into Airtable, and automatically sends follow-up emails to top scorers — zero manual work.",
    tags: ["Make.com", "Claude AI", "Airtable", "Tally", "Gmail"],
    color: "bg-[#1A0A2E]",
    accent: "#A855F7",
    image: "/make-candidate-pipeline.png",
    images: [
      "/tally-candidate-pipeline.png",
      "/make-candidate-pipeline.png",
      "/airtable-candidate-pipeline.png",
    ],
    filters: ["AI Automation"],
  },
  {
    num: "04",
    title: "Birdhouse Wingerie & Bar",
    category: "Web Design · Development · Framer",
    year: "2025",
    desc: "Full site for a multi-location restaurant chain in Quebec, Canada. Bold dark branding with red accents, bilingual EN/FR toggle, menus, online reservations, corporate events, food truck section, franchise page, and Instagram feed integration.",
    tags: ["Framer", "UI/UX", "Bilingual", "Restaurant"],
    color: "bg-[#1A0000]",
    accent: "#EF4444",
    image: "/birdhouse-wings.png",
    href: "https://birdhousewings.com/en/",
    filters: ["Web Design", "Web Dev"],
  },
  {
    num: "05",
    title: "CoolAir Pro",
    category: "Web Development · AI-Powered",
    year: "2025",
    desc: "Full-stack HVAC contractor site for Dallas, TX — AI chatbot scoped strictly to HVAC queries, 3-step quote calculator, EN/ES toggle, membership plans, financing page, and an admin dashboard with lead management and CSV export.",
    tags: ["Next.js", "TypeScript", "Claude AI", "Resend"],
    color: "bg-[#0D1B2A]",
    accent: "#F97316",
    image: "/coolair-pro.png",
    href: "https://coolair-pro-xquy.vercel.app/",
    filters: ["Web Dev", "AI Automation"],
  },
];

const GALLERY_LABELS: Record<string, string> = {
  "/tally-candidate-pipeline.png": "Step 1 — Tally Form",
  "/make-candidate-pipeline.png": "Step 2 — Make.com Pipeline",
  "/airtable-candidate-pipeline.png": "Step 3 — Airtable Results",
};

export default function Projects() {
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.filters.includes(activeFilter));

  const handleCardClick = (p: Project) => {
    if (p.images || p.image) {
      setGalleryIndex(0);
      setLightbox(p);
    } else if (p.href) {
      window.open(p.href, "_blank", "noopener,noreferrer");
    }
  };

  const lightboxImages = lightbox?.images ?? (lightbox?.image ? [lightbox.image] : []);
  const isGallery = lightboxImages.length > 1;

  const prev = () => setGalleryIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const next = () => setGalleryIndex((i) => (i + 1) % lightboxImages.length);

  return (
    <>
      <section id="projects" className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              My Work
            </p>
            <h2
              className="font-display font-bold text-text"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Latest Projects
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-10 flex-wrap"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-text text-bg"
                    : "bg-bg text-muted hover:text-text shadow-card"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.num}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleCardClick(p)}
                  className="group bg-bg rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className={`relative w-full h-48 ${p.color} overflow-hidden`}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity"
                      />
                    )}
                    <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/60 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/70 to-transparent z-10" />

                    <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pt-3.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                        {p.num}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {p.badge && (
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                            {p.badge}
                          </span>
                        )}
                        {p.images && (
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                            {p.images.length} slides
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                          {p.year}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 z-20 px-4 pb-3.5">
                      <span className="inline-block font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-text text-lg leading-tight group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-muted group-hover:text-accent transition-colors mt-1"
                      />
                    </div>
                    <p className="font-sans text-xs text-muted leading-relaxed mb-4 line-clamp-3">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-surface text-[10px] font-mono text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg shadow-card hover:shadow-card-hover font-sans text-sm text-muted hover:text-text transition-all border border-theme"
            >
              <span>Have a project in mind?</span>
              <span className="text-text font-medium">Let&apos;s talk →</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-bg rounded-2xl overflow-hidden shadow-card-hover flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-y-auto flex-1 min-h-0"
                >
                  <Image
                    src={lightboxImages[galleryIndex]}
                    alt={lightbox.title}
                    width={1200}
                    height={2000}
                    className="w-full h-auto"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gallery nav */}
              {isGallery && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Footer */}
              <div className="p-5 bg-bg border-t border-theme shrink-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="font-display font-bold text-text text-lg leading-tight">{lightbox.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted shrink-0 mt-1">
                    {lightbox.year}
                  </p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-3">
                  {isGallery
                    ? GALLERY_LABELS[lightboxImages[galleryIndex]] ?? `${galleryIndex + 1} / ${lightboxImages.length}`
                    : lightbox.category}
                </p>
                <p className="font-sans text-sm text-muted leading-relaxed mb-4">
                  {lightbox.desc}
                </p>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {lightbox.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-surface text-[10px] font-mono text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  {lightbox.href && (
                    <a
                      href={lightbox.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-text text-bg font-sans text-xs font-medium hover:opacity-80 transition-opacity"
                    >
                      View Live <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
