import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function SelectedWork() {
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

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-[var(--color-fg-primary)] sm:text-3xl font-primary">
            Selected Work
          </h2>
          <span className="hidden text-xs text-[var(--color-fg-tertiary)] sm:block">
            {projects.length} projects
          </span>
        </div>

        {/* Uniform grid: all cards same size */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
