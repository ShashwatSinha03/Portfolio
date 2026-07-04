"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug } from "@/data/projects";

export default function ProjectDetailModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const slug = searchParams.get("project");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const project = useMemo(() => (slug ? getProjectBySlug(slug) : null), [slug]);
  const notFound = Boolean(slug && !project);

  const accent = project?.accentColor ?? "var(--color-accent)";

  const close = useCallback(() => {
    router.replace(window.location.pathname);
    setTimeout(() => {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }, 0);
  }, [router]);

  // Store trigger element when modal opens
  useEffect(() => {
    if (slug) {
      triggerRef.current = document.activeElement;
    }
  }, [slug]);

  // Close on Escape, lock body scroll
  useEffect(() => {
    if (!slug) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    const handlePopState = () => {
      close();
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [slug, close]);

  // Focus trap inside modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !slug) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    closeButtonRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, [slug, project, notFound]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  if (!slug) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={project?.title ?? "Project details"}
    >
      <div
        role="document"
        ref={modalRef}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] p-6 sm:p-8"
        style={{
          animation: "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={close}
          className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[var(--color-fg-tertiary)] transition-colors hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-fg-primary)]"
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {notFound ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-[var(--color-fg-tertiary)]">
              Project not found.
            </p>
          </div>
        ) : project ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl font-primary"
                style={{ color: accent }}
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-fg-tertiary)]">
                {project.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--color-border-primary)] px-3 py-1 text-xs text-[var(--color-fg-tertiary)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-base leading-relaxed text-[var(--color-fg-secondary)]">
              {project.description}
            </p>

            {[
              { label: "Problem", content: project.problem },
              { label: "Solution", content: project.solution },
              { label: "Outcome", content: project.outcome },
            ].map(({ label, content }) => (
              <div key={label}>
                <h3 className="mb-2 text-sm font-medium text-[var(--color-fg-primary)] font-primary">
                  {label}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
                  {content}
                </p>
              </div>
            ))}

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 transition-colors hover:opacity-70"
                    style={{ color: accent }}
                  >
                    Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-fg-primary)] underline underline-offset-4 transition-colors hover:text-[var(--color-fg-secondary)]"
                  >
                    Source Code
                  </a>
                )}
              </div>
            )}

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[var(--color-fg-primary)] font-primary">
                  Screenshots
                </h3>
                <div className="grid gap-4">
                  {project.screenshots.map((screenshot, i) => (
                    <figure key={i}>
                      <div className="overflow-hidden rounded-lg border border-[var(--color-border-primary)]">
                        {imageErrors.has(screenshot.src) ? (
                          <div className="flex aspect-video items-center justify-center bg-[var(--color-bg-secondary)]">
                            <span className="text-xs text-[var(--color-fg-tertiary)]">
                              Image unavailable
                            </span>
                          </div>
                        ) : (
                          <Image
                            src={screenshot.src}
                            alt={screenshot.alt}
                            width={screenshot.width}
                            height={screenshot.height}
                            className="w-full"
                            onError={() =>
                              setImageErrors((prev) => new Set(prev).add(screenshot.src))
                            }
                          />
                        )}
                      </div>
                      <figcaption className="mt-1 text-xs text-[var(--color-fg-tertiary)]">
                        {screenshot.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
