"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

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

    menu.addEventListener("keydown", handleTab);
    return () => menu.removeEventListener("keydown", handleTab);
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border-primary)]"
          : "bg-transparent"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8" aria-label="Main navigation">
        {/* Logo / Home */}
        <a
          href="#"
          aria-label="Home"
          className="text-sm font-medium text-[var(--color-fg-primary)]"
        >
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-border-primary)] text-[11px] font-medium">
              S
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-all duration-300",
                activeSection === link.href.slice(1)
                  ? "text-[var(--color-fg-primary)]"
                  : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center sm:hidden"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav-dialog"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-fg-primary)]">
            <path d="M3 5h12M3 9h12M3 13h12" />
          </svg>
        </button>
      </nav>

      {/* Mobile dialog */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-nav-dialog"
          className="fixed inset-0 z-50 sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="fixed inset-0 bg-black/50" onClick={closeMobile} />
          <div
            className="fixed inset-y-0 right-0 w-72 bg-[var(--color-bg-primary)] border-l border-[var(--color-border-primary)] p-8"
            style={{
              animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                onClick={closeMobile}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "text-lg transition-colors",
                    activeSection === link.href.slice(1)
                      ? "text-[var(--color-fg-primary)]"
                      : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile menu footer */}
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-xs text-[var(--color-fg-tertiary)]">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
