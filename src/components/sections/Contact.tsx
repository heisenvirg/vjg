"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, Briefcase, MapPin } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "virgilj.garrido@gmail.com",
    href: "mailto:virgilj.garrido@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message me directly →",
    href: "https://wa.me/639991567747?text=Hi%20Virgil%2C%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you!",
  },
  {
    icon: Briefcase,
    label: "LinkedIn",
    value: "Virgil Joseph Garrido →",
    href: "https://www.linkedin.com/in/virgil-joseph-garrido-9ba0a3357/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dasmariñas, Cavite, Philippines",
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSending(false);

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Try emailing me directly at virgilj.garrido@gmail.com");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Get In Touch
          </p>
          <h2
            className="font-display font-bold text-text mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Start a Project
          </h2>
          <p className="font-sans text-sm text-muted max-w-md mx-auto">
            Have a project in mind? I&apos;m currently taking on new clients.
            I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Contact links row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={13} className="text-muted shrink-0" />
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-muted hover:text-text transition-colors"
                >
                  {value}
                </a>
              ) : (
                <span className="font-sans text-sm text-muted">{value}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {submitted ? (
            <div className="bg-bg rounded-2xl p-10 shadow-card text-center">
              <p className="text-4xl mb-4">🎉</p>
              <p className="font-display font-bold text-text text-2xl mb-2">
                Message sent!
              </p>
              <p className="font-sans text-sm text-muted">
                I&apos;ll reply within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-bg rounded-2xl p-6 shadow-card flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-surface rounded-xl px-4 py-3 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-surface rounded-xl px-4 py-3 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1.5">
                  Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-surface rounded-xl px-4 py-3 font-sans text-sm text-text outline-none focus:ring-2 focus:ring-accent/40 transition-all cursor-pointer"
                >
                  <option value="">What can I help you with?</option>
                  <option value="web-design">Web Design</option>
                  <option value="web-dev">Web Development</option>
                  <option value="web-design-dev">Web Design + Development</option>
                  <option value="ai-integration">AI Integration</option>
                  <option value="ai-chatbot">AI Chatbot</option>
                  <option value="automation">Workflow Automation</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-surface rounded-xl px-4 py-3 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="font-sans text-xs text-red-500 text-center -mt-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-text text-bg font-sans text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{sending ? "Sending…" : "Send Message"}</span>
                {!sending && <Send size={14} />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
