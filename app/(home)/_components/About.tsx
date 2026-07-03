export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-5">
          {/* Left column */}
          <div className="sm:col-span-2">
            <div className="sticky top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--color-border-primary)]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-fg-tertiary)]">
                  About
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-[var(--color-fg-primary)] sm:text-4xl">
                I build software
                <br />
                <span className="text-[var(--color-fg-tertiary)]">that lasts.</span>
              </h2>
            </div>
          </div>

          {/* Right column - the narrative */}
          <div className="space-y-6 sm:col-span-3">
            <p className="text-base leading-relaxed text-[var(--color-fg-secondary)] sm:text-lg">
              I&apos;m a software engineer focused on building scalable systems and AI products
              that solve real problems. I&apos;ve shipped production software across the full stack
              — from architecting distributed systems to crafting interfaces
              with modern frameworks.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-fg-secondary)] sm:text-lg">
              I care about clean architecture, reliable infrastructure, and interfaces that
              respect the user&apos;s attention. Every project I build starts with a question:
              how do I make this simpler, faster, and more maintainable?
            </p>
            <p className="text-base leading-relaxed text-[var(--color-fg-secondary)] sm:text-lg">
              I believe the best software is invisible — it works reliably, feels obvious,
              and gets out of your way.
            </p>

            {/* Stats / quick facts */}
            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-[var(--color-border-primary)] pt-10">
              {[
                { value: "5+", label: "Languages" },
                { value: "Full Stack", label: "End to End" },
                { value: "AI/ML", label: "Production" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="text-xs text-[var(--color-fg-tertiary)]">{stat.value}</span>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-[var(--color-fg-tertiary)] opacity-60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
