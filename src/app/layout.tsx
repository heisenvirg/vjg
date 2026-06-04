import type { Metadata } from "next";
import { Syne, Space_Grotesk, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Virgil Joseph Garrido — Web Developer & AI Integrator",
  description:
    "Freelance web developer and AI integrator based in Dasmariñas, Cavite, Philippines. I build fast, production-ready websites and AI tools that help businesses get more customers and save time.",
  keywords: [
    "web design",
    "web development",
    "AI integration",
    "AI chatbot",
    "workflow automation",
    "Philippines",
    "freelance",
  ],
  openGraph: {
    title: "Virgil Joseph Garrido — Web Developer & AI Integrator",
    description:
      "Freelance web developer and AI integrator. Fast websites, AI tools, and automations that help businesses grow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
