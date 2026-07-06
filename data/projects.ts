import type { Project } from "@/data/types";

export const projects: Project[] = [
  {
    slug: "surge",
    title: "Surge",
    description:
      "An AI-powered development platform that accelerates the entire software delivery lifecycle.",
    oneLineDesc: "AI-assisted development platform for modern engineering teams.",
    role: "Founding Engineer",
    techStack: ["Next.js", "TypeScript", "Python", "OpenAI", "PostgreSQL"],
    problem:
      "Development teams spend over 40% of their time on boilerplate code, debugging, and repetitive tasks. Existing AI tools are fragmented — separate agents for code generation, PR reviews, and documentation — forcing developers to context-switch constantly.",
    solution:
      "Surge unifies AI-assisted development into a single, context-aware platform. It understands your entire codebase, automates test generation, performs intelligent code review, and writes documentation — all within the existing workflow. A custom RAG pipeline ensures suggestions stay relevant to your stack and conventions.",
    outcome:
      "Shipped the MVP in 8 weeks. Early adopters reported a 35% reduction in development cycle time. Used by 3 engineering teams in private beta, processing over 2,000 automated code reviews per month.",
    thumbnail: {
      src: "https://picsum.photos/seed/surge-thumb/1200/630",
      alt: "Surge AI development platform interface",
      width: 1200,
      height: 630,
    },
    screenshots: [
      {
        src: "https://picsum.photos/seed/surge-1/1200/750",
        alt: "Surge dashboard showing AI code review results",
        width: 1200,
        height: 750,
      },
      {
        src: "https://picsum.photos/seed/surge-2/1200/750",
        alt: "Surge AI-powered PR summary generation",
        width: 1200,
        height: 750,
      },
      {
        src: "https://picsum.photos/seed/surge-3/1200/750",
        alt: "Surge real-time collaboration interface",
        width: 1200,
        height: 750,
      },
    ],
    liveUrl: "https://surge.dev",
    githubUrl: "https://github.com/shashwatsinha/surge",
    featured: true,
    tags: ["AI", "Full Stack", "Product"],
    updatedAt: "2026-06-15T00:00:00Z",
    accentColor: "#6366f1",
  },
  {
    slug: "nuvora-os",
    title: "NuvoraOS",
    description:
      "An intelligent operating system for AI-native workflows and autonomous agents.",
    oneLineDesc: "Agent-native OS for autonomous AI workload orchestration.",
    role: "Systems Engineer",
    techStack: ["React", "Rust", "Machine Learning", "Distributed Systems"],
    problem:
      "AI agents lack a purpose-built runtime. They run on general-purpose OS abstractions that don't account for agent lifecycle management, inter-agent communication, GPU scheduling, or checkpoint-based fault tolerance. This leads to poor resource utilization and unreliable long-running agents.",
    solution:
      "NuvoraOS is a lightweight, agent-native operating system designed from the ground up for AI workloads. It features a Rust-based microkernel with a custom scheduler optimized for agent processes, built-in distributed message passing, and transparent checkpointing that lets agents survive hardware failures.",
    outcome:
      "Achieved 4x improvement in agent density over Linux containers. Successfully ran a swarm of 50 autonomous agents for 72 hours with zero downtime. The checkpoint system reduced recovery time from minutes to under 200 milliseconds.",
    thumbnail: {
      src: "https://picsum.photos/seed/nuvora-thumb/1200/630",
      alt: "NuvoraOS system architecture diagram",
      width: 1200,
      height: 630,
    },
    screenshots: [
      {
        src: "https://picsum.photos/seed/nuvora-1/1200/750",
        alt: "NuvoraOS agent runtime dashboard",
        width: 1200,
        height: 750,
      },
      {
        src: "https://picsum.photos/seed/nuvora-2/1200/750",
        alt: "NuvoraOS agent lifecycle management",
        width: 1200,
        height: 750,
      },
    ],
    githubUrl: "https://github.com/shashwatsinha/nuvora-os",
    featured: true,
    tags: ["AI", "Systems", "Infrastructure"],
    updatedAt: "2026-06-20T00:00:00Z",
    accentColor: "#06b6d4",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
