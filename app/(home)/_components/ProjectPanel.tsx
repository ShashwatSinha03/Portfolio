"use client";

import { useState, useCallback } from "react";
import type { Project } from "@/data/types";

type Tab = "overview" | "solution" | "gallery";

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "solution", label: "Solution" },
  { key: "gallery", label: "Gallery" },
];

export default function ProjectPanel({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

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
      <div className="relative mt-4 min-h-[100px]">
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

      {type === "gallery" && project.screenshots && project.screenshots.length > 0 && (
        <GallerySlider images={project.screenshots} />
      )}
    </div>
  );
}

function GallerySlider({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Left: Image slider */}
      <div className="sm:w-1/2">
        <div className="relative overflow-hidden border border-[var(--color-border-primary)] bg-[var(--color-bg-elevated)] group">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="min-w-0 w-full shrink-0 flex items-center justify-center bg-[var(--color-bg-elevated)]" style={{ aspectRatio: "16/9" }}>
                {// eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML =
                      '<span class="text-xs text-[var(--color-fg-tertiary)]">No preview</span>';
                  }}
                />}
              </div>
            ))}
          </div>

          {/* Glassmorphic arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20"
                aria-label="Previous image"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20"
                aria-label="Next image"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2 sm:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-[var(--color-fg-primary)] w-3"
                    : "bg-[var(--color-border-primary)] hover:bg-[var(--color-fg-tertiary)]"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Description */}
      <div className="sm:w-1/2 flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
            {images[current].alt}
          </p>
          {images.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? "bg-[var(--color-fg-primary)] w-3"
                      : "bg-[var(--color-border-primary)] hover:bg-[var(--color-fg-tertiary)]"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
