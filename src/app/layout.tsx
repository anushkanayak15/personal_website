import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { SkipLink } from "@/components/nav/skip-link";
import { GlobalShortcuts } from "@/components/nav/global-shortcuts";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { LiveDashboard } from "@/components/dashboard/live-dashboard";
import { MotionProvider } from "@/components/motion/motion-provider";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { PROFILE, SITE_URL } from "@/content/profile";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description =
  "Software engineer building AI-powered products, with applied ML research in LLM fine-tuning, RAG, and model evaluation, and production experience at American Express and EY.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anushka Nayak",
    template: "%s — Anushka Nayak",
  },
  description,
  keywords: [
    "Anushka Nayak",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "GrowthOS",
    "Full-Stack Developer",
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Anushka Nayak",
    description,
    siteName: "Anushka Nayak",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anushka Nayak",
    description,
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
      className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PersonJsonLd />
        <MotionProvider>
          <SkipLink />
          <SiteNav />
          <CommandPalette />
          <GlobalShortcuts />
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start gap-8 2xl:px-6">
            <main id="main-content" className="min-w-0 flex-1">
              {children}
            </main>
            <div className="pt-12">
              <LiveDashboard />
            </div>
          </div>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
