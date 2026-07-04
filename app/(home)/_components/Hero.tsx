"use client";

import { useEffect, useRef } from "react";


const roles = [
  "Software Engineer",
  "AI Engineer",
  "Full Stack Developer",
  "System Designer",
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!roleRef.current) return;
      indexRef.current = (indexRef.current + 1) % roles.length;
      roleRef.current.style.opacity = "0";
      roleRef.current.style.transform = "translateY(8px)";
      setTimeout(() => {
        if (!roleRef.current) return;
        roleRef.current.textContent = roles[indexRef.current];
        roleRef.current.style.opacity = "1";
        roleRef.current.style.transform = "translateY(0)";
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 sm:px-8">
      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--color-accent-muted)] opacity-20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label — staggered entrance */}
        <div
          className="flex items-center gap-3"
          style={{
            animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
          }}
        >
          <span className="h-px w-8 bg-[var(--color-border-primary)]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-fg-tertiary)] font-primary">
            Shashwat Sinha
          </span>
        </div>

        {/* Dramatic main headline — staggered entrance */}
        <h1
          className="mt-8 text-[clamp(2.8rem,9vw,8rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-[var(--color-fg-primary)] font-primary"
          style={{
            animation:
              "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
          }}
        >
          Building
          <br />
          <span className="text-[var(--color-fg-tertiary)]">system that</span>
          <br />
          <span className="relative inline-block">
            last.
            <span className="absolute -bottom-2 left-0 h-px w-full bg-[var(--color-fg-primary)]/20" />
          </span>
        </h1>

        {/* Rotating role indicator — staggered */}
        <div
          className="mt-8 flex items-center gap-3"
          style={{
            animation:
              "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
          }}
        >
          <span className="text-sm text-[var(--color-fg-secondary)]">
            <span className="text-[var(--color-fg-tertiary)]">// </span>
            <span
              ref={roleRef}
              className="inline-block text-[var(--color-fg-primary)] transition-all duration-200 font-primary"
            >
              Software Engineer
            </span>
          </span>
          <span className="h-3 w-px bg-[var(--color-border-primary)]" />
          <span className="text-xs text-[var(--color-fg-tertiary)]">
            AI · Systems · Product
          </span>
        </div>

        {/* Tech badges — staggered */}
        <div
          className="mt-16 flex flex-wrap gap-3"
          style={{
            animation:
              "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1s both",
          }}
        >
          {["Next.js", "TypeScript", "React", "Python", "Rust", "PostgreSQL", "AI/ML", "Go", "Kubernetes"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--color-border-primary)] px-3 py-1.5 text-xs text-[var(--color-fg-tertiary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg-secondary)]"
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-fg-tertiary)]">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-[var(--color-fg-tertiary)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
