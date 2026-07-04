"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/types";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [imgError, setImgError] = useState(false);
  const accent = project.accentColor ?? "var(--color-accent)";

  return (
    <Link
      href={`/?project=${project.slug}`}
      className="group relative block h-full w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-border-hover)] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] cursor-target"
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        // @ts-expect-error CSS custom property for dynamic accent
        "--card-accent": accent,
      }}
    >
      {/* Accent line */}
      <span
        className="absolute top-0 left-6 h-px w-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: accent }}
      />

      <article className="flex h-full flex-col">
        {/* Image container */}
        <div className="overflow-hidden rounded-lg border border-[var(--color-border-primary)] aspect-[4/3]">
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-elevated)]">
              <span className="text-xs text-[var(--color-fg-tertiary)]">
                {project.title}
              </span>
            </div>
          ) : (
            <Image
              src={project.thumbnail.src}
              alt={project.thumbnail.alt}
              width={project.thumbnail.width}
              height={project.thumbnail.height}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-1 flex-col">
          {/* Title row with arrow */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-[var(--color-fg-primary)] transition-colors duration-300 font-primary">
              {project.title}
            </h3>
            <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </span>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border-primary)] px-2 py-0.5 text-[10px] text-[var(--color-fg-tertiary)] transition-colors group-hover:border-[var(--color-border-hover)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-secondary)] line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack — revealed on hover, pushes to bottom */}
          <div className="mt-auto pt-3">
            <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] text-[var(--color-fg-tertiary)]"
                >
                  {tech}
                  {project.techStack.indexOf(tech) <
                    Math.min(project.techStack.length, 4) - 1 && (
                    <span className="ml-1.5 text-[var(--color-border-primary)]">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
