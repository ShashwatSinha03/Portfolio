"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectPanel from "./ProjectPanel";

export default function SelectedWork() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <h2 className="text-2xl font-medium tracking-tight text-[var(--color-fg-primary)] sm:text-3xl font-primary">
            Selected Work
          </h2>
          <p className="mt-12 text-[var(--color-fg-tertiary)]">Coming soon</p>
        </div>
      </section>
    );
  }

  const toggleProject = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-[var(--color-fg-primary)] sm:text-3xl font-primary">
            Selected Work
          </h2>
          <span className="hidden text-xs text-[var(--color-fg-tertiary)] sm:block">
            {projects.length} projects
          </span>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-0">
          {projects.map((project, i) => {
            const isOpen = openSlug === project.slug;

            return (
              <div key={project.slug}>
                {/* Row header */}
                <button
                  type="button"
                  onClick={() => toggleProject(project.slug)}
                  className="group flex w-full items-start gap-4 py-5 text-left transition-colors hover:bg-[var(--color-bg-surface-hover)]/30 -mx-4 px-4 rounded-lg"
                >
                  {/* Number */}
                  <span className="hidden w-6 pt-0.5 text-[11px] font-mono text-[var(--color-fg-tertiary)] sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title + description stacked */}
                  <div className="flex-1 min-w-0">
                    <span className="text-base font-medium text-[var(--color-fg-primary)] font-primary sm:text-lg">
                      {project.title}
                    </span>
                    <p className="mt-0.5 text-sm text-[var(--color-fg-tertiary)] truncate">
                      {project.oneLineDesc}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`flex-shrink-0 mt-1.5 text-[var(--color-fg-tertiary)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Expanded panel */}
                <div
                  className="overflow-hidden transition-all duration-400 ease-out"
                  style={{
                    maxHeight: isOpen ? "800px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-6">
                    <div
                      className="border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] px-6 py-5"
                      style={{
                        borderLeftColor: project.accentColor,
                        borderLeftWidth: "2px",
                      }}
                    >
                      <ProjectPanel project={project} />
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-[var(--color-border-primary)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
