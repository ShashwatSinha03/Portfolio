import type { Metadata } from "next";
import { Exo, Tenor_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/data/site";
import TargetCursor from "./components/TargetCursor";
import ScrollProgress from "./components/ScrollProgress";
import ColorBends from "./components/ColorBends";
import NowPlaying from "./components/NowPlaying";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-exo",
  display: "swap",
});

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tenor",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s — ${siteConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo.variable} ${tenor.variable} h-full antialiased`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full font-secondary">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-fg-inverse)] focus:shadow-lg"
        >
          Skip to content
        </a>

        <div className="fixed top-6 left-1/2 z-[1002] -translate-x-1/2">
          <NowPlaying />
        </div>

        {/* Ambient elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ColorBends
            colors={["#b5b5b5", "#654b92"]}
            rotation={42}
            speed={0.39}
            scale={1}
            frequency={1.1}
            warpStrength={1}
            mouseInfluence={0.75}
            parallax={0.3}
            noise={0.22}
            iterations={2}
            intensity={2}
            bandWidth={5}
            transparent
          />
        </div>
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
          cursorColor="#ffffff"
          cursorColorOnTarget="#B497CF"
          targetSelector="a, button, [role='button'], .cursor-target"
        />
        <ScrollProgress />
        <div className="noise" aria-hidden="true" />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            data-domain="shashwatsinha.com"
            src="https://plausible.io/js/script.js"
          />
        )}
        <main id="main-content" className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
