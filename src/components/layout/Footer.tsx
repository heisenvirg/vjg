const serviceLinks = [
  "Web Design",
  "Web Development",
  "AI Integration",
  "AI Chatbot",
  "Workflow Automation",
];

const contactLinks = [
  { label: "virgilj.garrido@gmail.com", href: "mailto:virgilj.garrido@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/virgil-joseph-garrido-9ba0a3357/" },
  { label: "WhatsApp", href: "https://wa.me/639991567747?text=Hi%20Virgil%2C%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you!" },
  { label: "GitHub", href: "https://github.com/heisenvirg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-theme">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display font-black text-2xl uppercase tracking-widest text-text">
              VJG<span className="text-accent">.</span>
            </span>
            <p className="font-sans text-sm text-muted mt-4 leading-relaxed max-w-xs">
              Freelance web designer, developer, and AI automation specialist based in the Philippines.
            </p>
            <a
              href="mailto:virgilj.garrido@gmail.com"
              className="inline-block mt-4 font-sans text-sm text-accent hover:underline"
            >
              virgilj.garrido@gmail.com
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-sans text-sm text-muted hover:text-text transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              {contactLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-muted hover:text-text transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            &copy; {year} Virgil Joseph Garrido — All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Open for work
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
