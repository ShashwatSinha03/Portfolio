"use client";

import { useState, useRef, useEffect } from "react";
import type { Project } from "@/data/types";

type Tab = "overview" | "solution" | "gallery";

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "solution", label: "Solution" },
  { key: "gallery", label: "Gallery" },
];

export default function ProjectPanel({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [activeTab]);

  const hasGallery = project.screenshots && project.screenshots.length > 0;

  return (
    <div className="overflow-hidden">
      {/* Action links */}
      <div className="flex items-center gap-4 pt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-fg-primary)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            View Live
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 7h7m0 0L7 4.5M10 7l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-fg-tertiary)] transition-colors hover:text-[var(--color-fg-primary)]"
          >
            GitHub
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 7h7m0 0L7 4.5M10 7l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
        <span className="ml-auto text-[11px] text-[var(--color-fg-tertiary)]">{project.role}</span>
      </div>

      {/* Tech pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--color-border-primary)] px-2.5 py-1 text-[11px] text-[var(--color-fg-tertiary)]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="mt-6 flex gap-6 border-b border-[var(--color-border-primary)]">
        {tabs.map((tab) => {
          const isDisabled = tab.key === "gallery" && !hasGallery;
          return (
            <button
              key={tab.key}
              type="button"
              disabled={isDisabled}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 text-xs tracking-[0.1em] uppercase transition-all duration-200 ${
                isDisabled
                  ? "cursor-not-allowed opacity-30"
                  : activeTab === tab.key
                    ? "text-[var(--color-fg-primary)] border-b border-[var(--color-fg-primary)]"
                    : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-secondary)] border-b border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        {/* Active tab indicator */}
        <div className="flex-1 border-b border-transparent" />
      </div>

      {/* Tab content with crossfade */}
      <div className="relative mt-4 min-h-[100px]" ref={contentRef}>
        <TabContent active={activeTab === "overview"} project={project} type="overview" />
        <TabContent active={activeTab === "solution"} project={project} type="solution" />
        {hasGallery && <TabContent active={activeTab === "gallery"} project={project} type="gallery" />}
      </div>
    </div>
  );
}

function TabContent({
  active,
  project,
  type,
}: {
  active: boolean;
  project: Project;
  type: "overview" | "solution" | "gallery";
}) {
  return (
    <div
      className={`transition-all duration-300 ease-out ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
      }`}
    >
      {type === "overview" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
            {project.problem}
          </p>
          <div className="rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] px-4 py-3">
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-fg-tertiary)]">Outcome</span>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg-primary)]">
              {project.outcome}
            </p>
          </div>
        </div>
      )}

      {type === "solution" && (
        <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
          {project.solution}
        </p>
      )}

      {type === "gallery" && project.screenshots && (
        <div className="space-y-4">
          {project.screenshots.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]"
            >
              <div className="flex aspect-video items-center justify-center bg-[var(--color-bg-elevated)]">
                {img.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.classList.add("flex");
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<span class="text-xs text-[var(--color-fg-tertiary)]">Image unavailable</span>';
                    }}
                  />
                ) : (
                  <span className="text-xs text-[var(--color-fg-tertiary)]">No preview</span>
                )}
              </div>
              <p className="px-4 py-2 text-[11px] text-[var(--color-fg-tertiary)]">{img.alt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
