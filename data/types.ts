export interface Project {
  slug: string;
  title: string;
  description: string;
  role: string;
  techStack: string[];
  problem: string;
  solution: string;
  outcome: string;
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  screenshots?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tags: string[];
  updatedAt: string;
  accentColor?: string;
}

export interface Skill {
  name: string;
  description: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
}
