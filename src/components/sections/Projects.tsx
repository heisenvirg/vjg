"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

type FilterKey = "All" | "Mockup" | "Web Dev" | "AI Automation";

interface ProjectDetails {
  goal: string;
  built: string[];
  result: string;
}

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
  details?: ProjectDetails;
}

const FILTERS: FilterKey[] = ["All", "Mockup", "Web Dev", "AI Automation"];

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
    filters: ["Web Dev"],
    details: {
      goal: "Build a luxury villa rental platform for 5 private properties across Tulum, Lisbon, Saint-Tropez, Santorini, and Maui — designed to drive direct bookings and eliminate OTA platform fees.",
      built: [
        "Editorial split-screen layout with full-bleed property photography",
        "Direct booking flow with no OTA platform fees",
        "WhatsApp concierge integration for guest inquiries",
        "Individual property pages with unique layouts for all 5 villas",
        "SEO-optimized structure with metadata and sitemap",
      ],
      result: "Live booking platform delivering a premium guest experience and cutting OTA dependency for villa hosts.",
    },
  },
  {
    num: "02",
    title: "Sunset Villa",
    category: "Web Design · Development",
    year: "2025",
    desc: "Luxury beachfront villa rental site for a private residence on Collins Avenue, Miami. Full-bleed hero, scroll animations, direct booking flow with Stripe, local guide, and Airbnb/VRBO sync — built to drive direct bookings and cut platform fees.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Stripe"],
    color: "bg-[#0A0E17]",
    accent: "#C9A052",
    image: "/sunset-villa.png",
    href: "https://vacation-rental-lrom.vercel.app/",
    filters: ["Web Dev"],
    details: {
      goal: "Help a Miami beachfront villa owner drive direct bookings and reduce reliance on Airbnb and VRBO platform fees.",
      built: [
        "Full-bleed hero with scroll-triggered animations",
        "Direct booking flow with Stripe payment integration",
        "Airbnb and VRBO calendar sync to avoid double bookings",
        "Local guide and property highlights sections",
        "Mobile-first responsive layout",
      ],
      result: "Live site enabling direct bookings with full payment processing and platform calendar sync — cutting OTA fees for the host.",
    },
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
    details: {
      goal: "Eliminate manual work from the entire hiring process — from candidate intake to scoring and follow-up — using AI and automation.",
      built: [
        "Tally form to capture structured candidate submissions",
        "Make.com pipeline connecting all tools end-to-end",
        "Claude AI scoring each applicant 1–10 with strengths, weaknesses, and hire recommendations",
        "Airtable logging all results with full candidate profiles",
        "Automated Gmail follow-up emails sent to top scorers automatically",
      ],
      result: "Zero manual work — every applicant is scored, logged, and followed up automatically within minutes of submitting their application.",
    },
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
    filters: ["Web Dev"],
    details: {
      goal: "Build a full website for a multi-location restaurant chain in Quebec, Canada — bilingual, brand-forward, and capable of handling online reservations and franchise inquiries.",
      built: [
        "Bilingual EN/FR toggle across all pages",
        "Menus, online reservations, and corporate events sections",
        "Food truck section and franchise inquiry page",
        "Instagram feed integration",
        "Bold dark branding with red accents built in Framer",
      ],
      result: "Live site serving multiple Quebec locations with full bilingual support, online reservations, and a franchise inquiry pipeline.",
    },
  },
  {
    num: "05",
    title: "Deloitte Digital",
    category: "Web Design · Development",
    year: "2024",
    desc: "Design and development work for Deloitte Digital's US web presence — one of the world's leading digital transformation consultancies. Cinematic hero experience, structured service and insights architecture, and enterprise-grade UI.",
    tags: ["Web Design", "UI/UX", "Development", "Enterprise"],
    color: "bg-[#0A0A0A]",
    accent: "#86BC25",
    image: "/deloitte-digital.png",
    href: "https://www.deloittedigital.com/us/en.html",
    filters: ["Web Dev"],
    details: {
      goal: "Design and development work for Deloitte Digital's US web presence — enterprise-grade digital experience for one of the world's top digital transformation consultancies.",
      built: [
        "Cinematic video hero with enterprise-grade typography",
        "Structured service and capabilities architecture",
        "DD Insights and thought leadership sections",
        "Conversion-focused contact and inquiry flows",
        "Responsive design across all device sizes",
      ],
      result: "Enterprise-grade web presence representing Deloitte Digital's US brand and service offering.",
    },
  },
  {
    num: "06",
    title: "OC Fitness Coach",
    category: "Web Design · Development · Migration",
    year: "2025",
    desc: "WordPress migration from private server to HostGator with zero SEO loss — preserved all URLs, metadata, and Google rankings. Then redesigned the full site using Elementor, ACF, and Custom Post Types based on Figma-approved layouts.",
    tags: ["WordPress", "Elementor", "ACF", "Figma", "SEO", "HostGator"],
    color: "bg-[#0A0F0A]",
    accent: "#22C55E",
    image: "/oc-fitness-coach.png",
    href: "https://ocfitnesscoach.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Safely migrate a high-ranking WordPress site from a private server to HostGator without losing SEO performance, then modernize the design to improve conversions.",
      built: [
        "Full WordPress migration with database backup and DNS/SSL setup",
        "SEO integrity checks before and after — preserved all URLs, metadata, and internal links",
        "Full site redesign in staging environment using Elementor, ACF, and Custom Post Types",
        "Mobile-optimized layouts based on Figma-approved designs",
        "Reusable blog templates and performance optimizations",
      ],
      result: "Zero SEO loss after migration — all Google rankings maintained. Faster, modern site with improved mobile UX and conversion structure.",
    },
  },
  {
    num: "07",
    title: "Texas Fruit Festival",
    category: "Web Design · Development · CRO",
    year: "2025",
    desc: "Landing page design and full site overhaul for a raw vegan wellness festival in Austin, TX. Figma mockup, WordPress + Elementor build optimized for mobile traffic from Instagram and Facebook ads. Streamlined ticket purchase flow across 11 pages — resulted in significant lift in ticket sales.",
    tags: ["WordPress", "Elementor", "WooCommerce", "Figma", "CRO"],
    color: "bg-[#1A0A00]",
    accent: "#F97316",
    image: "/texas-fruit-festival.png",
    href: "https://texasfruitfestival.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Increase ticket sales from Instagram and Facebook ad traffic by redesigning the landing page and streamlining the ticket purchase flow.",
      built: [
        "Figma mockup delivered for client approval before development",
        "WordPress + Elementor landing page fully optimized for mobile ad traffic",
        "Ticket purchase flow redesigned to reduce friction and drop-off",
        "Full site update across 11 pages — Homepage, Speakers, Experience, About, FAQs, Contact, Schedule, Sponsors, and more",
        "Consistent typography, spacing, and mobile responsiveness across all pages",
      ],
      result: "Significant increase in ticket sales from both paid and organic traffic. Reduced drop-off during checkout. Cohesive, mobile-first experience across all 11 pages.",
    },
  },
  {
    num: "08",
    title: "Stucky Injury Law",
    category: "Web Design · Development · Local SEO",
    year: "2025",
    desc: "Professional law firm website for a Dallas & Fort Worth personal injury attorney. Dedicated practice area pages, SEO-optimized content, case results, testimonials, and consultation lead forms — built to rank locally and convert visitors into clients.",
    tags: ["WordPress", "Elementor", "Figma", "SEO", "Legal"],
    color: "bg-[#0A0F1A]",
    accent: "#B8912A",
    image: "/stucky-law.png",
    href: "https://stuckylaw.com",
    filters: ["Web Dev"],
    details: {
      goal: "Build a professional law firm website for a Dallas & Fort Worth personal injury attorney to generate consultation leads and improve local SEO visibility.",
      built: [
        "Dedicated practice area pages: personal injury, car accidents, truck accidents, motorcycle accidents, pedestrian accidents, wrongful death",
        "SEO-optimized content structure with strong CTAs on every page",
        "Case results and testimonials sections to build trust and credibility",
        "Consultation lead forms integrated throughout the site",
        "Clear navigation and authoritative visual design",
      ],
      result: "Professional law firm presence with a strong local SEO foundation and multiple lead capture touchpoints across all practice area pages.",
    },
  },
  {
    num: "M01",
    title: "Atlas Grey",
    category: "UI/UX Design · E-Commerce · Baby Fashion",
    year: "2024",
    desc: "Minimal e-commerce mockup for a neutral baby clothing brand — cream editorial aesthetic with lifestyle photography, new looks grid, essential items feature, and press coverage row.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Baby Fashion"],
    color: "bg-[#1A1510]",
    accent: "#C9A96E",
    image: "/atlas-grey-v02-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a minimal, editorial e-commerce experience for a neutral baby clothing brand — warm and premium without being loud, built to convert on mobile and desktop.",
      built: [
        "Clean navigation with Organic and Blog sections",
        "Hero with lifestyle photography and soft editorial headline",
        "New Looks product grid with minimal pricing cards",
        "Essential Items for Hot Climates editorial feature section",
        "Shop By Category with lifestyle imagery",
        "Press coverage bar: Vogue, People, domino, Travel+Leisure, Mother, Forbes",
        "Customer testimonials and blog/editorial section",
      ],
      result: "Minimal Scandinavian-inspired aesthetic — neutral cream palette, generous white space, editorial photography, and clean typography designed to feel premium without being cold.",
    },
  },
  {
    num: "M02",
    title: "BuildaPill",
    category: "UI/UX Design · B2B E-Commerce · Pharma",
    year: "2024",
    desc: "B2B pharmaceutical e-commerce mockup for a tablet excipient manufacturer — science-forward blue and white design with product catalog, All-In-One Premium feature, Tablet Builder tool, and trust sections.",
    tags: ["Figma", "UI/UX", "B2B", "E-Commerce", "Pharma"],
    color: "bg-[#041224]",
    accent: "#3B82F6",
    image: "/build-a-pill-v05-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a trustworthy B2B e-commerce platform for a pharmaceutical excipient manufacturer — science-forward, professional, and easy to navigate for industry buyers.",
      built: [
        "Dual CTA hero with credibility headline and product visual",
        "Product catalog: All-In-One White and Blue excipient variants",
        "All-In-One Premium feature with Functionality / Compatibility / Safety pillars",
        "Innovative Pill Pressing Excellence content section",
        "Science-backed products grid with star ratings",
        "Tablet Builder interactive section",
        "Shop by Category navigation",
        "Quality trust section and Connect with Support form",
      ],
      result: "Clean blue-and-white pharmaceutical aesthetic — radiates precision and quality. Layout balances scientific credibility with accessible product discovery for B2B buyers.",
    },
  },
  {
    num: "M03",
    title: "CusrichAI",
    category: "UI/UX Design · SaaS · AI Platform",
    year: "2024",
    desc: "Dark-theme SaaS mockup for an AI-powered customer advocacy platform — dashboard hero, integration logos, feature grid, platform comparison table, and two-sided value messaging for growth-oriented e-commerce brands.",
    tags: ["Figma", "UI/UX", "SaaS", "Dark Theme", "AI"],
    color: "bg-[#0A0A0A]",
    accent: "#6366F1",
    image: "/cusrichai-v05-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a dark-theme SaaS website for an AI-powered customer advocacy platform — data-forward, integration-heavy, and targeted at growth-oriented e-commerce brands.",
      built: [
        "Hero with live platform dashboard preview and dual CTAs (Request Demo + Install Now)",
        "Integration logos: Recharge, Arc Shift, GlassHouse, Prescriptiv, CajaMetaverse",
        "4-feature grid: AI customer insights, automated flows, personalized rules engine, data ownership",
        "Social proof ticker with 30+ brand logo strip",
        "Customer Data Platform vs Customer Experience Platform comparison section",
        "Two-sided value messaging: We're a good fit / You're a good fit",
        "Newsletter and final demo request CTA",
      ],
      result: "Dark professional SaaS aesthetic with data visualization emphasis — designed to speak to technical buyers and growth marketers at the same time.",
    },
  },
  {
    num: "M04",
    title: "Dreaming Earth",
    category: "UI/UX Design · E-Commerce · Wellness",
    year: "2024",
    desc: "Sage green wellness e-commerce mockup for an essential oils brand with retail and wholesale paths — sourcing story, product solutions grid, countdown sale section, FAQ, and testimonials.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Wellness", "Essential Oils"],
    color: "bg-[#0A140A]",
    accent: "#4ADE80",
    image: "/dreaming-earth-botanicals-v03-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a calm, nature-forward e-commerce site for an essential oils brand offering both retail and wholesale — built to educate as much as it sells.",
      built: [
        "Split hero with Retail and Wholesale paths",
        "Bestsellers product carousel",
        "How We Source editorial section with lifestyle photography",
        "Essential Oils & Blends category section",
        "Product solutions grid: Pure Taste, Serums, Low Energy, Balance Reset, Ache & Pain, Skin Care",
        "Browse Collections and Apply for Wholesale access CTAs",
        "On Sale countdown timer section",
        "Our Story narrative, testimonials slider, and FAQ accordion",
      ],
      result: "Sage green and warm neutral palette — botanical, calming, and trustworthy. The design educates buyers on sourcing and benefits before pushing the sale.",
    },
  },
  {
    num: "M05",
    title: "Earth Energy",
    category: "UI/UX Design · E-Commerce · Supplements",
    year: "2024",
    desc: "Green supplement e-commerce mockup for a superfoods brand — popular products carousel, nature's power proof pillars, Raw Reds product spotlight, Instagram shop integration, and testimonials.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Health", "Supplements"],
    color: "bg-[#071209]",
    accent: "#22C55E",
    image: "/earth-energy-v02-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a conversion-focused supplement e-commerce site for a superfoods brand — science-backed, lifestyle-aspirational, and built to drive product sales.",
      built: [
        "Split hero with product lineup and social proof (14,293 customers)",
        "Popular items carousel: Fruits & Veggies, Joint Support, Power Greens, Raw Reds",
        "Nutrition You Can Trust section with certification icons",
        "Nature's Power feature: Immune Boosting, Convenient Form, Real Results, Personal Mission",
        "Superfood-Powered Wellness feature section",
        "Earth Energy Difference with 4-pillar proof icons",
        "Raw Reds Energy Elixir product spotlight with pricing",
        "Shop Our Instagram feed and Testimonials from Earth Advocates",
      ],
      result: "Fresh green-and-white palette with clean typography — health-conscious but accessible. Balances scientific credibility with everyday wellness positioning.",
    },
  },
  {
    num: "M06",
    title: "For Real Flowers",
    category: "UI/UX Design · Service Business · Retro",
    year: "2024",
    desc: "Retro playful website mockup for a floral design and landscaping business — bold coral and navy palette, illustrated botanical shapes, services split, full-service wedding package, and image gallery.",
    tags: ["Figma", "UI/UX", "Retro Design", "Service Business", "Floral"],
    color: "bg-[#1A0808]",
    accent: "#F97316",
    image: "/for-real-flowers-v03-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a personality-forward website for a floral and landscaping business — bold, playful, and immediately memorable while clearly communicating services and driving bookings.",
      built: [
        "Bold retro hero with illustrated botanical shapes and display typography",
        "Services split: Landscaping and Floral Design with circular photo treatment",
        "Full-Service Wedding Package feature section with editorial copywriting",
        "Image gallery carousel with Book an Appointment CTA",
        "Newsletter with 10% first order discount incentive",
        "Marquee footer ticker with brand name repetition",
      ],
      result: "Retro-playful design language — coral orange, muted pink, dark navy, and mustard yellow. Custom illustrated botanical elements make it instantly stand out in a saturated floral market.",
    },
  },
  {
    num: "M07",
    title: "Austin DRC",
    category: "UI/UX Design · Professional Services · Legal",
    year: "2024",
    desc: "Professional mediation center website mockup — sage green corporate palette, service cards for community mediation, civil litigation and facilitation, step-by-step access guide, FAQ, and free consultation form.",
    tags: ["Figma", "UI/UX", "Professional Services", "Legal", "Non-Profit"],
    color: "bg-[#081410]",
    accent: "#16A34A",
    image: "/austindrc.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a professional, approachable website for a legal mediation center in Travis County — builds trust quickly and makes services easy to understand for non-legal audiences.",
      built: [
        "Split hero: strong headline + team photo with Contact CTA",
        "Association/partner logos bar for instant credibility",
        "Service cards: Community Mediation, Civil Litigation, Facilitation Services",
        "Step-by-step access guide: Contact → Consultation → Participate → Follow Up",
        "Join Our Mediation Training feature section",
        "FAQ accordion with 5 key questions",
        "Community impact CTA and Contact form with address and location",
      ],
      result: "Professional sage green palette — communicates trust, growth, and resolution without the intimidating corporate law firm aesthetic. Designed for community accessibility.",
    },
  },
  {
    num: "M08",
    title: "Kimika",
    category: "UI/UX Design · E-Commerce · Beauty",
    year: "2024",
    desc: "Premium beauty e-commerce mockup for a professional waxing products brand — soft pink aesthetic, 25-year credibility bar, product categories, Made in Canada story, testimonials, and blog.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Beauty", "Waxing"],
    color: "bg-[#1A0010]",
    accent: "#EC4899",
    image: "/kimika-v03-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a premium beauty e-commerce site for a professional waxing brand bringing salon-quality results home — credible, aspirational, and easy to shop.",
      built: [
        "Hero with lifestyle model photography and bold brand headline",
        "25 Years credibility bar with certifications: Cruelty Free, Vegan, Paraben Free, Eco-Friendly, All Skin Types, Microwaveable",
        "Most Popular Products carousel with Quick View",
        "Shop by Category grid: Bestsellers, Mini, Strips, Body Products, Accessories, Wax Bundles",
        "Proudly Made in Canada brand story section",
        "Customer testimonials grid with star ratings",
        "Latest News blog section and newsletter subscription",
      ],
      result: "Soft pink and white beauty aesthetic — clean, feminine, and professional. Balances clinical credibility of a professional product with the warmth of a consumer brand.",
    },
  },
  {
    num: "M09",
    title: "Lobsty",
    category: "UI/UX Design · E-Commerce · Outdoor",
    year: "2024",
    desc: "Family outdoor e-commerce mockup for a kids bike clamp brand — fresh green lifestyle aesthetic, product category grid, family testimonials, promotional sale section, and active parenting CTA.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Outdoor", "Family"],
    color: "bg-[#081208]",
    accent: "#15803D",
    image: "/lobsty-website-v02-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design an outdoor lifestyle e-commerce site for a family-friendly bike clamp brand — active, approachable, and built around the joy of family adventures.",
      built: [
        "Hero with outdoor family lifestyle photography and primary product feature",
        "Shop by Category navigation with visual icons",
        "Product grid: Blockaddy, Playllner, ToyHaul, FunCarry, Jaxkin Journey, Bikedall Pro clamps",
        "Partner logos bar: Perfect for families who love biking, hiking, and exploring nature",
        "Daily Outdoors Essentials product section",
        "15% Sale promotional banner",
        "Shop the Look lifestyle editorial section",
        "Customer reviews grid and Latest News blog",
      ],
      result: "Fresh green and white palette with active family imagery — trustworthy and adventure-forward without being extreme-sports intimidating. Built for active parents.",
    },
  },
  {
    num: "M10",
    title: "Milioti Olive Oil",
    category: "UI/UX Design · E-Commerce · Artisan Food",
    year: "2024",
    desc: "Dual-brand Greek olive oil e-commerce mockup — warm neutral tones, split olive oil and cosmetics shop paths, Our Story section, featured products in EUR, quality benefit pillars, and testimonials.",
    tags: ["Figma", "UI/UX", "E-Commerce", "Artisan", "Greek Brand"],
    color: "bg-[#14100A]",
    accent: "#B45309",
    image: "/milioti-olive-oil-v04-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a premium dual-brand e-commerce site for a Greek olive oil producer selling both food-grade oil and olive oil cosmetics — artisan quality, Mediterranean heritage.",
      built: [
        "Split hero: E-Shop Olive Oil / E-Shop Olive Oil Cosmetics paths with full-bleed photography",
        "Our Story editorial section with farm and production photography",
        "Partner and stockist logos: hofbar, Sp. Travels EE, Memories, ASTIR",
        "Featured Products carousel with EUR pricing",
        "3-column quality benefits: Quality Olive Oil, Fusion Flavors, Taste The Difference",
        "Customer Testimonials slider",
        "Discover Our Exquisite Products CTA and newsletter subscription",
      ],
      result: "Warm beige and olive green palette with serif typography — evokes Mediterranean farmstead quality and artisan heritage. Dual-brand structure keeps food and cosmetics distinct while unified.",
    },
  },
  {
    num: "M11",
    title: "Smith + Malek Attorneys",
    category: "UI/UX Design · Law Firm · Multi-State",
    year: "2024",
    desc: "Multi-state law firm website mockup — dark forest green authority aesthetic, practice areas carousel, awards bar, values section, four office location cards, and free consultation form.",
    tags: ["Figma", "UI/UX", "Law Firm", "Professional Services"],
    color: "bg-[#060E08]",
    accent: "#166534",
    image: "/smith+malek-v02-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a multi-state law firm website that projects authority and trust — serious without being cold, accessible without being corporate and intimidating.",
      built: [
        "Full-bleed team conference room hero with bold overlapping headline",
        "Mission statement: We will be a force of justice for the world",
        "Practice Areas carousel: Corporate, Healthcare, Real Estate",
        "Awards credibility bar: Empowering Women, Leaders in Law, Women of the Year",
        "Our Values section",
        "Office Locations grid: North Idaho, Boise, Spokane, Salt Lake City",
        "Client testimonials and Ready to Work With Us CTA",
        "Free Consultation contact form",
      ],
      result: "Dark forest green, cream, and gold palette — conveys stability, authority, and justice. Real team photography and values-led messaging humanize a serious industry.",
    },
  },
  {
    num: "M12",
    title: "Tarpon Springs Distillery",
    category: "UI/UX Design · Craft Distillery · Events",
    year: "2024",
    desc: "Craft distillery brand site mockup — navy rustic aesthetic, storytelling sections, whiskey tasting notes, upcoming events grid, spirit-based recipes by category, and Book a Tour CTA.",
    tags: ["Figma", "UI/UX", "Hospitality", "Craft Brand", "Events"],
    color: "bg-[#040C18]",
    accent: "#B45309",
    image: "/tarpon-springs-distillery-v04-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design an immersive brand site for a craft distillery — storytelling-first, with space to showcase spirits, events, and recipes while driving tour bookings.",
      built: [
        "Full-bleed hero with distillery atmosphere photography and Book a Tour + Shop Our Spirits CTAs",
        "Discover the Art of Distilling editorial section with barrel aging imagery",
        "Immersive media/video experience section",
        "Spirits showcase: Gambling Goods Whiskey with full tasting notes (size, strength, ABV, bitterness, color)",
        "Legacy and production story sections",
        "Upcoming Events cards with dates",
        "Spirit-Based Recipes section by category",
        "Newsletter subscription and Book a Tour final CTA",
      ],
      result: "Navy blue, cream, and warm wood tones — rustic craft heritage meets modern artisan branding. Storytelling-first design prioritizes sensory anticipation to drive visits and product discovery.",
    },
  },
  {
    num: "M13",
    title: "Villa Tortuga",
    category: "UI/UX Design · Vacation Rental · Costa Rica",
    year: "2024",
    desc: "Luxury tropical vacation rental mockup for a multi-villa property in Playa Guiones, Nosara — nature-forward greens, villa listings with Book Now CTAs, hidden gem destination content, and direct booking form.",
    tags: ["Figma", "UI/UX", "Vacation Rental", "Luxury", "Travel"],
    color: "bg-[#061208]",
    accent: "#15803D",
    image: "/villa-tortuga-v06-latest.png",
    filters: ["Mockup"],
    details: {
      goal: "Design a luxury tropical vacation rental site for a multi-villa property in Playa Guiones, Nosara, Costa Rica — natural, aspirational, and built to drive direct bookings.",
      built: [
        "Full-bleed tropical property hero with brand headline and Book Now CTA",
        "Villa listings with individual Book Now buttons: Casa Percano, Casa Tortuga, Suite del Mar",
        "Discover Our Exclusive Collection of Luxurious Villas gallery section",
        "Guest testimonials section",
        "Exclusive Room Deals promotional section",
        "Uncover The Hidden Gem of Nosara — destination content with activity icons",
        "Comprehensive villa tour visual section",
        "Contact form with Google Maps integration and property manager details",
      ],
      result: "Tropical green and natural sand tones with lush photography — communicates exclusivity and eco-luxury without feeling overproduced. Designed to convert destination-curious visitors into direct bookers.",
    },
  },
  {
    num: "09",
    title: "LBL Services",
    category: "Web Design · Development",
    year: "2025",
    desc: "Full design and development for an AI model development and training services company. Clean purple-accented UI, service showcase, team section, and contact form — built with WordPress and Elementor.",
    tags: ["WordPress", "Elementor", "UI/UX", "Figma"],
    color: "bg-[#0D0D1A]",
    accent: "#7C3AED",
    image: "/lbl-services.png",
    href: "https://lbl-services.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Build a professional website for an AI model development and training services company to establish credibility and generate business inquiries.",
      built: [
        "Clean purple-accented design reflecting the AI and tech brand",
        "Service showcase with clear value propositions for each offering",
        "Team and about sections to build credibility",
        "Contact and inquiry forms for lead generation",
      ],
      result: "Professional web presence establishing LBL Services as a credible AI training and model development partner.",
    },
  },
  {
    num: "10",
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
    details: {
      goal: "Build a full-stack HVAC contractor site for Dallas, TX that qualifies leads automatically and handles customer inquiries around the clock.",
      built: [
        "AI chatbot powered by Claude, scoped strictly to HVAC queries",
        "3-step quote calculator for instant project estimates",
        "Bilingual EN/ES toggle for Dallas's Spanish-speaking market",
        "Membership plans and financing page",
        "Admin dashboard with lead management and CSV export",
      ],
      result: "Live full-stack site with AI-powered lead qualification operating 24/7, plus a complete admin system for managing and exporting leads.",
    },
  },
  {
    num: "11",
    title: "The Man Shop",
    category: "Web Design · Development · Geo-Targeting",
    year: "2024",
    desc: "Six geo-targeted landing pages for a regional barbershop chain's advertising campaign. Each page served a specific store location with dynamic SMS offer delivery via Twilio, Google Maps integration, and GA4 tracking.",
    tags: ["WordPress", "Elementor", "Twilio", "Google Analytics 4", "CRO"],
    color: "bg-[#1A0000]",
    accent: "#DC2626",
    image: "/man-shop-offers.png",
    href: "https://themanshopoffers.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Launch a geo-fencing advertising campaign for a regional barbershop chain — six location-specific landing pages serving as digital touchpoints for targeted social media ads.",
      built: [
        "Six SEO-optimized landing pages, each tailored to a different store location",
        "Mobile-first design ensuring fast load times for social ad traffic",
        "Twilio integration for dynamic SMS delivery of offer codes",
        "Google Maps integration per location for easy directions",
        "Google Analytics 4 setup to track campaign performance and user behavior",
        "Template-based development ensuring consistency and speed across all six pages",
      ],
      result: "All six landing pages delivered ahead of deadline. Fully mobile-optimized with fast load times, geo-targeted offer delivery via SMS, and GA4 capturing real campaign performance data.",
    },
  },
  {
    num: "12",
    title: "Hidden Sauna Club",
    category: "Web Design · Development · CMS",
    year: "2025",
    desc: "End-to-end Figma design and WordPress/Elementor build for a sauna and wellness brand. Pixel-perfect responsive UI, booking system integration, Klaviyo email automation, lead capture forms, and 1-on-1 client training for ongoing management.",
    tags: ["WordPress", "Elementor", "Figma", "Klaviyo", "Booking System"],
    color: "bg-[#0F0A00]",
    accent: "#EA580C",
    image: "/hidden-sauna-club.png",
    href: "https://hiddensaunaclub.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Design and build an end-to-end website for a sauna and wellness brand — conversion-focused, booking-ready, and scalable with a marketing automation stack.",
      built: [
        "Strategic UI/UX design in Figma — conversion-focused layout and visual hierarchy",
        "Pixel-perfect Figma to WordPress/Elementor build",
        "Booking system integration with optimized user flow",
        "Klaviyo integration for automated email marketing",
        "Advanced lead capture forms setup",
        "Fully mobile-first responsive design",
        "1-on-1 client training for WordPress and Elementor management",
      ],
      result: "High-end wellness brand website with streamlined booking experience, marketing automation in place, and a client fully equipped to manage and scale the site independently.",
    },
  },
  {
    num: "13",
    title: "Turks & Caicos Resort Guide",
    category: "Web Dev · WordPress · Migration",
    year: "2025",
    desc: "Migrated a travel platform from Loveable to WordPress + Elementor. Built custom post types for resorts and rooms, a trip budget calculator, room comparison feature, dynamic room detail pages, category filtering, and Calendly booking integration.",
    tags: ["WordPress", "Elementor", "Custom Post Types", "Calendly", "Migration"],
    color: "bg-[#041420]",
    accent: "#0EA5E9",
    image: "/turks-caicos-resort-guide.png",
    href: "https://turksandcaicosresortguide.com/",
    filters: ["Web Dev"],
    details: {
      goal: "Migrate a travel discovery platform from Loveable to WordPress — giving the client full content control, a scalable structure, and custom travel planning features that Loveable couldn't support.",
      built: [
        "Full Loveable to WordPress migration with branding and content transfer",
        "Custom Post Types for resorts and individual room listings",
        "Room comparison feature and dynamic room detail pages",
        "Product category filtering for resort discovery",
        "Trip budget calculator for visitor trip planning",
        "Calendly booking integration for consultation scheduling",
        "About Us, Contact, and Planning Guides pages",
      ],
      result: "Scalable travel platform on WordPress with simplified content management, custom discovery tools, room comparison, and a live booking integration — giving the client full ownership of the site.",
    },
  },
  {
    num: "14",
    title: "Email Follow-Up Automation",
    category: "AI Automation · GoHighLevel · CRM",
    year: "2025",
    desc: "Multi-step email follow-up workflow in GoHighLevel for nurturing leads and existing clients. Branch logic splits by intent (Positive, Not Positive, Not Replied), with timed wait steps, drip sequences, internal notifications, and a secondary email path — reducing manual follow-ups and improving conversion rates.",
    tags: ["GoHighLevel", "CRM", "Email Automation", "Workflow", "Lead Nurture"],
    color: "bg-[#0D0018]",
    accent: "#7C3AED",
    image: "/gohighlevel-email-follow-up.png",
    filters: ["AI Automation"],
    details: {
      goal: "Automate the entire email follow-up process in GoHighLevel for both new leads and existing clients — eliminating manual outreach and ensuring every contact gets the right message at the right time.",
      built: [
        "Multi-step follow-up workflow triggered by user actions and behavior",
        "3-way branch logic: Positive/Yes intent, Not Positive, and Not Replied paths",
        "Wait step with timed delays before sending follow-up emails to warm leads",
        "Drip Mode for non-replying contacts — keeps the sequence alive without spamming",
        "Email replied path with internal notification to alert the team of hot leads",
        "Secondary email (Email 2) for continued nurturing of non-engaged contacts",
        "Wait 1 day for contact reply step before escalating to the next action",
      ],
      result: "Reduced manual follow-up work to near zero. Every lead and client is nurtured automatically — hot leads trigger internal team alerts, cold leads stay in drip sequences, and campaign performance is fully trackable.",
    },
  },
  {
    num: "15",
    title: "Doula Business Sales Funnel",
    category: "Web Design · GoHighLevel · Sales Funnel",
    year: "2025",
    desc: "End-to-end sales funnel built in GoHighLevel for a doula coaching brand — bold dark purple landing page with video hero, tools and training offers, and full automation integration to capture and nurture leads through a multi-step funnel.",
    tags: ["GoHighLevel", "Sales Funnel", "Web Design", "Automation"],
    color: "bg-[#1A0028]",
    accent: "#A855F7",
    image: "/ghl.png",
    href: "https://app.winwavesolutions.com/v2/preview/JHCN7rDRn1DJIFJal78h",
    filters: ["AI Automation"],
    details: {
      goal: "Design and build a complete sales funnel for a doula coaching brand — converting cold visitors into enrolled clients through a professional, high-converting multi-step page sequence with backend automation.",
      built: [
        "Bold dark purple landing page with video hero and strong CTA — designed to stop the scroll",
        "Multi-step funnel pages: opt-in, sales page, order form, and thank you page",
        "Automation integration for lead capture, tagging, and follow-up sequences",
        "Mobile-first responsive design optimized for social media traffic",
        "GoHighLevel funnel builder with custom design and branding applied throughout",
      ],
      result: "Professional sales funnel live in GoHighLevel — brand-consistent, mobile-optimized, and fully automated from lead capture to follow-up.",
    },
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
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeFilter === "All"
    ? projects.filter((p) => !p.filters.includes("Mockup"))
    : projects.filter((p) => p.filters.includes(activeFilter));

  const visible = activeFilter === "All" ? filtered.slice(0, visibleCount) : filtered;
  const hasMore = activeFilter === "All" && visibleCount < filtered.length;

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
  const lightboxDetails = lightbox?.details ?? null;
  const isMockup = lightbox?.filters.includes("Mockup") ?? false;
  const isCaseStudy = !!lightboxDetails && !isGallery && !isMockup;

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
                onClick={() => { setActiveFilter(f); setVisibleCount(6); }}
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
              {visible.map((p, i) => (
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
                        {p.details && (
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                            Case Study
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

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg shadow-card hover:shadow-card-hover font-sans text-sm text-text transition-all border border-theme"
              >
                Load More
                <span className="text-muted font-mono text-[10px]">
                  {filtered.length - visibleCount} more
                </span>
              </button>
            </motion.div>
          )}

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
              className={`relative w-full ${isMockup ? "max-w-5xl" : "max-w-4xl"} max-h-[90vh] bg-bg rounded-2xl overflow-hidden shadow-card-hover flex flex-col`}
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

              {/* Mockup two-column layout */}
              {isMockup ? (
                <div className="flex-1 flex flex-col sm:flex-row overflow-hidden min-h-0">
                  {/* Left: scrollable full-page mockup */}
                  <div className="h-52 sm:h-auto sm:w-[42%] overflow-y-auto border-b sm:border-b-0 sm:border-r border-theme shrink-0">
                    {lightboxImages[0] && (
                      <Image
                        src={lightboxImages[0]}
                        alt={lightbox.title}
                        width={720}
                        height={6000}
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                  {/* Right: project info */}
                  <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <p className="font-display font-bold text-text text-xl leading-tight">{lightbox.title}</p>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-muted shrink-0 mt-1.5">{lightbox.year}</p>
                        </div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{lightbox.category}</p>
                      </div>
                      {lightboxDetails && (
                        <>
                          <div className="bg-surface rounded-xl p-4">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2">Overview</p>
                            <p className="font-sans text-sm text-text leading-relaxed">{lightboxDetails.goal}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-3">Design Highlights</p>
                            <ul className="flex flex-col gap-2">
                              {lightboxDetails.built.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 font-sans text-sm text-muted leading-relaxed">
                                  <span className="text-accent mt-0.5 shrink-0 font-bold">→</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-surface rounded-xl p-4">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2">Visual Direction</p>
                            <p className="font-sans text-sm text-text leading-relaxed">{lightboxDetails.result}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="px-6 py-4 bg-bg border-t border-theme shrink-0 flex items-center justify-between gap-4 flex-wrap">
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
                </div>
              ) : isCaseStudy ? (
                <>
                  {/* Fixed hero image */}
                  <div className="relative h-56 shrink-0 overflow-hidden">
                    <Image
                      src={lightboxImages[0]}
                      alt={lightbox.title}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/10" />
                  </div>

                  {/* Scrollable case study content */}
                  <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5 flex flex-col gap-5">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <p className="font-display font-bold text-text text-xl leading-tight">{lightbox.title}</p>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-muted shrink-0 mt-1.5">{lightbox.year}</p>
                      </div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{lightbox.category}</p>
                    </div>

                    {/* Goal */}
                    <div className="bg-surface rounded-xl p-4">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2">Goal</p>
                      <p className="font-sans text-sm text-text leading-relaxed">{lightboxDetails?.goal}</p>
                    </div>

                    {/* What I Built */}
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-3">What I Built</p>
                      <ul className="flex flex-col gap-2">
                        {(lightboxDetails?.built ?? []).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 font-sans text-sm text-muted leading-relaxed">
                            <span className="text-accent mt-0.5 shrink-0 font-bold">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Result */}
                    <div className="bg-surface rounded-xl p-4">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2">Result</p>
                      <p className="font-sans text-sm text-text leading-relaxed">{lightboxDetails?.result}</p>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="px-6 py-4 bg-bg border-t border-theme shrink-0 flex items-center justify-between gap-4 flex-wrap">
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
                </>
              ) : (
                <>
                  {/* Regular / gallery layout */}
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
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
