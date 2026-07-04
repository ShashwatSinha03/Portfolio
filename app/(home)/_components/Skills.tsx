"use client";

import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";

function SkillBar({ name, description, index }: { name: string; description: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger fill animation by setting width
          if (barRef.current) {
            barRef.current.style.width = "100%";
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="group"
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-fg-primary)] font-primary">
          {name}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-fg-tertiary)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-2 h-px w-full bg-[var(--color-border-primary)]">
        <div
          ref={barRef}
          className="h-full bg-[var(--color-fg-primary)] transition-all duration-1000"
          style={{
            width: "0%",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-tertiary)]">
        {description}
      </p>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-16 sm:grid-cols-3">
          {/* Left: section title */}
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[var(--color-fg-primary)] sm:text-3xl font-primary">
              Skills
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-tertiary)]">
              Areas where I bring depth, experience, and a point of view.
            </p>
          </div>

          {/* Right: skill bars */}
          <div className="space-y-10 sm:col-span-2">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                description={skill.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
