"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { MessageCircle, X, Send, ArrowUpRight, RotateCcw } from "lucide-react";

const MAX_CHARS = 500;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LeadForm {
  name: string;
  email: string;
  brief: string;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "How fast can you build?",
  "How do I hire you?",
];

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm Virgil's AI assistant. Ask me anything about his services, projects, pricing, or how to get started.",
};

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/);
  return parts.map((part, i) => {
    if (/^\*\*(.+)\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (/^\*([^*]+)\*$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (/^`([^`]+)`$/.test(part)) {
      return <code key={i} className="bg-bg px-1 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline opacity-80 hover:opacity-100">
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderMarkdown(md: string): ReactNode {
  const lines = md.split("\n");
  const nodes: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const isUnordered = /^[-*]\s/.test(line);
    const isOrdered = /^\d+\.\s/.test(line);

    if (isUnordered || isOrdered) {
      const items: string[] = [];
      while (i < lines.length && (/^[-*]\s/.test(lines[i]) || /^\d+\.\s/.test(lines[i]))) {
        items.push(lines[i].replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""));
        i++;
      }
      const Tag = isOrdered ? "ol" : "ul";
      nodes.push(
        <Tag key={`list-${i}`} className={`pl-4 my-0.5 space-y-0.5 ${isOrdered ? "list-decimal" : "list-disc"} list-outside`}>
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </Tag>
      );
      continue;
    }

    nodes.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="flex flex-col gap-1 text-sm">{nodes}</div>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState<LeadForm>({ name: "", email: "", brief: "" });
  const [leadSent, setLeadSent] = useState(false);
  const [leadSending, setLeadSending] = useState(false);

  const apiHistory = useRef<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!openedRef.current) setHasUnread(true);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [display, showLeadForm]);

  useEffect(() => {
    if (open) {
      openedRef.current = true;
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const handleClear = () => {
    setDisplay([GREETING]);
    apiHistory.current = [];
    setInput("");
    setShowLeadForm(false);
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading || content.length > MAX_CHARS) return;

    const userMsg: Message = { role: "user", content };
    apiHistory.current = [...apiHistory.current, userMsg];
    setDisplay((prev) => [...prev, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiHistory.current }),
      });

      if (res.status === 429) {
        setDisplay((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "You've sent a lot of messages — please wait a few minutes before trying again. Or reach Virgil directly on WhatsApp: +63 999 156 7747",
          };
          return updated;
        });
        setLoading(false);
        return;
      }

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value);
        setDisplay((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: reply };
          return updated;
        });
      }

      apiHistory.current = [...apiHistory.current, { role: "assistant", content: reply }];
    } catch {
      setDisplay((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try contacting Virgil directly at virgilj.garrido@gmail.com",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const submitLead = async () => {
    if (!lead.name || !lead.email) return;
    setLeadSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          service: "General Inquiry",
          message: lead.brief || "Reached out via the chat widget.",
        }),
      });
      setLeadSent(true);
      setShowLeadForm(false);
      setDisplay((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Got it, ${lead.name}! Virgil will reach out to **${lead.email}** shortly. You can also message him directly on WhatsApp: +63 999 156 7747`,
        },
      ]);
    } finally {
      setLeadSending(false);
    }
  };

  const showSuggestions = display.length === 1 && !loading;

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-bg rounded-2xl shadow-card-hover border border-theme flex flex-col overflow-hidden"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-theme shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-sans text-sm font-medium text-text">Ask Virgil&apos;s AI</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/639991567747?text=Hi%20Virgil%2C%20I%20came%20across%20your%20portfolio!"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface text-muted hover:text-text border border-theme transition-colors"
              >
                WhatsApp ↗
              </a>
              <button
                onClick={handleClear}
                aria-label="Clear chat"
                title="Start over"
                className="text-muted hover:text-text transition-colors p-1"
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted hover:text-text transition-colors p-1"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
            {display.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl ${
                    m.role === "user"
                      ? "bg-text text-bg rounded-br-sm font-sans text-sm"
                      : "bg-surface text-text rounded-bl-sm"
                  }`}
                >
                  {m.content ? (
                    m.role === "assistant" ? renderMarkdown(m.content) : m.content
                  ) : (
                    <span className="flex gap-1 items-center py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "240ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Quick reply suggestions */}
            {showSuggestions && (
              <div className="flex flex-col items-end gap-1.5 mt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-3.5 py-2 rounded-2xl rounded-br-sm bg-surface border border-theme font-sans text-xs text-muted hover:text-text hover:border-accent/40 transition-all text-right"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Inline lead form */}
            {showLeadForm && (
              <div className="bg-surface rounded-2xl rounded-bl-sm p-4 border border-theme flex flex-col gap-2.5">
                <p className="font-sans text-xs text-muted leading-relaxed">
                  I&apos;ll pass your details to Virgil right now.
                </p>
                <input
                  type="text"
                  placeholder="Your name *"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="bg-bg rounded-xl px-3 py-2 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 border border-theme"
                />
                <input
                  type="email"
                  placeholder="Your email *"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="bg-bg rounded-xl px-3 py-2 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 border border-theme"
                />
                <textarea
                  placeholder="What do you need built? (optional)"
                  value={lead.brief}
                  onChange={(e) => setLead({ ...lead, brief: e.target.value })}
                  rows={2}
                  className="bg-bg rounded-xl px-3 py-2 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 border border-theme resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={submitLead}
                    disabled={leadSending || !lead.name || !lead.email}
                    className="flex-1 px-4 py-2 rounded-xl bg-text text-bg font-sans text-xs font-medium hover:opacity-80 transition-opacity disabled:opacity-40"
                  >
                    {leadSending ? "Sending…" : "Send to Virgil →"}
                  </button>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="px-3 py-2 rounded-xl bg-bg border border-theme font-sans text-xs text-muted hover:text-text transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="px-3 py-2.5 border-t border-theme shrink-0 flex items-center gap-2">
            {!leadSent && !showLeadForm && (
              <button
                onClick={() => setShowLeadForm(true)}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-surface border border-theme font-sans text-xs text-muted hover:text-text transition-colors whitespace-nowrap"
              >
                Get a Quote <ArrowUpRight size={10} />
              </button>
            )}
            <div className="flex-1 flex flex-col min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything…"
                disabled={loading}
                className="w-full bg-surface rounded-xl px-3 py-2 font-sans text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 transition-all disabled:opacity-60"
              />
              {input.length > 400 && (
                <span className={`self-end font-mono text-[9px] mt-0.5 ${input.length >= MAX_CHARS ? "text-red-400" : "text-muted"}`}>
                  {input.length}/{MAX_CHARS}
                </span>
              )}
            </div>
            <button
              onClick={() => send()}
              disabled={loading || !input.trim() || input.length > MAX_CHARS}
              aria-label="Send"
              className="w-9 h-9 rounded-xl bg-text text-bg flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40 shrink-0 cursor-pointer self-start"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-text text-bg flex items-center justify-center shadow-card-hover hover:opacity-80 transition-all cursor-pointer"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {hasUnread && !open && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-bg" />
        )}
      </button>
    </>
  );
}
