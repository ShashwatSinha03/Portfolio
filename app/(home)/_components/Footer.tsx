import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-primary)] py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left: brand */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-sm font-medium text-[var(--color-fg-primary)]">
              {siteConfig.name}
            </span>
            <span className="mt-1 text-xs text-[var(--color-fg-tertiary)]">
              &copy; {year} — Software Engineer
            </span>
          </div>

          {/* Center: tagline */}
          <p className="hidden text-center text-xs text-[var(--color-fg-tertiary)] sm:block">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>

          {/* Right: social links */}
          <nav className="flex items-center gap-6" aria-label="Social links">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-fg-tertiary)] transition-colors hover:text-[var(--color-fg-primary)]"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <span className="text-[var(--color-border-primary)]">/</span>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-fg-tertiary)] transition-colors hover:text-[var(--color-fg-primary)]"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <span className="text-[var(--color-border-primary)]">/</span>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-xs text-[var(--color-fg-tertiary)] transition-colors hover:text-[var(--color-fg-primary)]"
            >
              Email
            </a>
          </nav>
        </div>

        {/* Mobile-only tech note */}
        <p className="mt-8 text-center text-xs text-[var(--color-fg-tertiary)] sm:hidden">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
