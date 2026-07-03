# Technical Architecture Package — Portfolio

**Owner:** Shashwat Sinha
**Status:** Approved
**Date:** 2026-07-04
**Engineer Ready:** Yes

---

## 1. Architecture Overview

A maximally static Next.js App Router single-page portfolio. All content is sourced from static TypeScript files in `data/` — no CMS, no database, no API for content. The page is fully statically generated at build time. A single dynamic API route (`/api/contact`) handles form submissions. Six client components exist (all leaf nodes), everything else is a Server Component. Styling is Tailwind CSS with CSS custom properties for design tokens, dark mode via class toggle. Animations are CSS-only with zero runtime libraries. Deployment is to Vercel with a custom domain, Plausible for analytics, and Resend for email delivery.

---

## 2. Tech Stack Decision Record

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14+ (App Router) | Static generation, server components, file-based routing, metadata API |
| Language | TypeScript (strict) | Type safety across data layer, components, and API route |
| Styling | Tailwind CSS | Utility-first, zero runtime, design tokens via CSS custom properties |
| Animation | CSS transitions + keyframes | Zero JS bundle cost, `prefers-reduced-motion` support, sufficient for all interactions |
| Fonts | Inter + JetBrains Mono via `next/font/google` | Variable fonts, self-hosted, `display: swap`, no external requests |
| Images | `next/image` | Automatic optimization, WebP/AVIF, lazy loading, intrinsic sizing |
| Form backend | Next.js API Route → Resend | Serverless, no additional infrastructure, single endpoint |
| Validation | Zod | Type-safe schemas shared between client and server (co-located with API route) |
| Rate limiting | In-memory `Map<IP, timestamp>` | No external Redis dependency, sufficient for single-portfolio traffic volume |
| Analytics | Plausible | Cookieless, privacy-first, GDPR-compliant, async script |
| Deployment | Vercel (GitHub integration) | Native Next.js support, preview deployments, edge network |
| Email | Resend | Modern email API, high deliverability, React email support |
| SEO | Next.js Metadata API | Static generation of meta tags, OG images, sitemap, robots, JSON-LD |

**Explicitly excluded:** Framer Motion, Redux/Zustand, any CMS, any database, CSS-in-JS runtime, GSAP, Locomotive Scroll, react-hook-form (native `useState` is sufficient for 3 fields), any CAPTCHA (honeypot is sufficient).

---

## 3. Project Structure

```
the-portfolio/
├── app/
│   ├── layout.tsx                  # Root layout: <html>, fonts, metadata, Navigation, Footer
│   ├── page.tsx                    # Home page: all sections composed
│   ├── not-found.tsx               # Custom 404
│   ├── globals.css                 # Design tokens, base styles, utilities
│   ├── sitemap.ts                  # Auto-generated sitemap
│   ├── robots.ts                   # Robots configuration
│   ├── api/
│   │   └── contact/
│   │       └── route.ts            # POST handler: validate → rate limit → send email
│   └── projects/
│       └── [slug]/
│           └── page.tsx            # (P1) Project detail page, static params
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx                # Server: full-viewport identity section
│   │   ├── about.tsx               # Server: bio / philosophy
│   │   ├── projects-section.tsx    # Server: section wrapper + grid
│   │   ├── skills-section.tsx      # Server: section wrapper + grid
│   │   └── contact-section.tsx     # Server: section wrapper (wraps client form)
│   ├── ui/
│   │   ├── navigation.tsx          # Client: scroll-linked header, mobile drawer
│   │   ├── footer.tsx              # Server: social links, copyright
│   │   ├── project-card.tsx        # Server: card with hover (CSS)
│   │   ├── project-modal.tsx       # Client: modal overlay, focus trap, scroll lock
│   │   ├── tag-pill.tsx            # Server: inline tech tag chip
│   │   ├── tech-tags.tsx           # Server: list of TagPill + overflow badge
│   │   ├── skill-category.tsx      # Server: category heading + skill chips
│   │   ├── contact-form.tsx        # Client: form state, validation, submission
│   │   ├── float-label-input.tsx   # Client: animated label input
│   │   ├── float-label-textarea.tsx# Client: animated label textarea
│   │   ├── submit-button.tsx       # Client: loading/success/error states
│   │   ├── scroll-indicator.tsx    # Client: fade on scroll past 80%
│   │   └── scroll-to-top.tsx       # Client: footer button, smooth scroll
│   └── shared/
│       ├── scroll-reveal.tsx       # (P1) Client: IntersectionObserver fade-up
│       ├── theme-toggle.tsx        # (P1) Client: dark/light toggle + localStorage
│       ├── floating-contact-pill.tsx # (P1) Client: fixed CTA on mobile
│       └── analytics.tsx           # Client: Plausible script loader
│
├── data/
│   ├── site.ts                     # SiteConfig: name, tagline, email, social, metadata
│   ├── about.ts                    # Bio paragraph(s)
│   ├── projects.ts                 # Project[] — typed, typed, typed
│   └── skills.ts                   # SkillCategory[] — typed
│
├── lib/
│   ├── validations.ts              # Zod schemas (shared with API route)
│   └── types.ts                    # TypeScript interfaces (Project, SkillCategory, etc.)
│
├── public/
│   └── projects/                   # Project images (thumbnails, gallery)
│
├── tailwind.config.ts              # Extended theme with design tokens
├── next.config.ts                  # Next.js configuration
├── vercel.json                     # Deployment config, headers, redirects
├── tsconfig.json                   # TypeScript strict mode
└── package.json
```

---

## 4. Data Architecture

### 4.1 Data Sources

All data is static TypeScript files in `data/`. No database, no CMS, no API calls. Server components import these directly at build time.

| File | Exports | Imported By |
|------|---------|-------------|
| `data/site.ts` | `siteConfig: SiteConfig` | Root layout, footer, JSON-LD |
| `data/about.ts` | `aboutContent: AboutData` | About section |
| `data/projects.ts` | `projects: Project[]` | Projects section, project detail |
| `data/skills.ts` | `skills: SkillCategory[]` | Skills section |

### 4.2 Type Definitions

```typescript
// lib/types.ts

interface SiteConfig {
  name: string;                        // "Shashwat Sinha"
  title: string;                       // "Software Engineer"
  tagline: string;                     // "Building scalable software systems..."
  email: string;                       // Contact email
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  metadata: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage?: string;
    siteUrl: string;
  };
}

interface Project {
  id: string;                          // Unique slug "surge"
  title: string;                       // "Surge"
  subtitle: string;                    // One-line description
  description: string;                 // 2-3 sentences
  role: string;                        // "Founding Engineer"
  techStack: string[];                 // ["Next.js", "Python", "PostgreSQL"]
  outcome: string;                     // "Reduced API latency by 40%"
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  thumbnail: {
    src: string;                       // "/projects/surge-thumb.webp"
    alt: string;
    width: number;
    height: number;                    // 16:9 ratio
  };
  gallery?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  featured: boolean;
  order: number;
  visible: boolean;
  draft?: boolean;                     // Exclude from sitemap, noindex
}

interface SkillCategory {
  name: string;                        // "Frontend"
  skills: string[];                    // ["Next.js", "TypeScript", ...]
}

interface ContactFormData {
  name: string;                        // 2-100 chars
  email: string;                       // Valid email
  message: string;                     // 10-2000 chars
}

interface AboutData {
  paragraphs: string[];
  cta?: {
    text: string;
    href: string;                      // "#contact"
  };
}
```

### 4.3 Data Flow Diagram

```
┌──────────────┐     import at build time     ┌──────────────────┐
│  data/*.ts   │ ◄──────────────────────────► │  Server Components│
│  (static)    │                               │  (app/page.tsx)   │
└──────────────┘                               └──────────────────┘
                                                       │
                                                       │ props drill
                                                       ▼
                                              ┌──────────────────┐
                                              │  Child Components │
                                              │  (Server + Client)│
                                              └──────────────────┘

User Browser ──POST /api/contact──► API Route
                                       │
                                       ├── Zod validation
                                       ├── Honeypot check
                                       ├── Rate limit check
                                       ├── Resend API
                                       └── JSON response
```

---

## 5. Component Architecture

### 5.1 Server/Client Split

| Component | Type | File | Why Client |
|-----------|------|------|------------|
| Navigation | Client | `components/ui/navigation.tsx` | Scroll listener, IntersectionObserver, mobile toggle state |
| Footer | Server | `components/ui/footer.tsx` | Purely static |
| Hero | Server | `components/sections/hero.tsx` | Static content, no interactivity |
| About | Server | `components/sections/about.tsx` | Static content |
| ProjectsSection | Server | `components/sections/projects-section.tsx` | Renders server children |
| ProjectCard | Server | `components/ui/project-card.tsx` | Hover via CSS, no state |
| TechTags | Server | `components/ui/tech-tags.tsx` | Pure render |
| TagPill | Server | `components/ui/tag-pill.tsx` | Pure render |
| ProjectModal | Client | `components/ui/project-modal.tsx` | Open/close state, scroll lock, focus trap, URL update |
| SkillsSection | Server | `components/sections/skills-section.tsx` | Static content |
| SkillCategory | Server | `components/ui/skill-category.tsx` | Pure render |
| ContactSection | Server | `components/sections/contact-section.tsx` | Wraps client form |
| ContactForm | Client | `components/ui/contact-form.tsx` | Form state, validation, async submission |
| FloatLabelInput | Client | `components/ui/float-label-input.tsx` | Float label animation state |
| FloatLabelTextarea | Client | `components/ui/float-label-textarea.tsx` | Float label animation state |
| SubmitButton | Client | `components/ui/submit-button.tsx` | Loading/success states |
| ScrollIndicator | Client | `components/ui/scroll-indicator.tsx` | IntersectionObserver for fade |
| ScrollToTop | Client | `components/ui/scroll-to-top.tsx` | Scroll click handler |
| Analytics | Client | `components/shared/analytics.tsx` | Browser-only script injection |
| ScrollReveal (P1) | Client | `components/shared/scroll-reveal.tsx` | IntersectionObserver |
| ThemeToggle (P1) | Client | `components/shared/theme-toggle.tsx` | localStorage + system preference |
| FloatingContactPill (P1) | Client | `components/shared/floating-contact-pill.tsx` | Scroll position |

### 5.2 Component Tree

```
app/layout.tsx [Server + Client]
  ├── <SkipToContent /> [Server]
  ├── <Navigation /> [Client]
  │   ├── <Logo /> [Server]           — "SS" monogram
  │   ├── <NavLinks /> [Client]       — map sections, highlight active
  │   │   └── <NavLink /> × N [Server]— <a href="#section">
  │   ├── <ThemeToggle /> (P1) [Client]
  │   └── <MobileNav /> [Client]
  └── <Footer /> [Server]
      ├── <SocialLink /> × N [Server]
      ├── <FooterCopyright /> [Server]
      └── <ScrollToTop /> [Client]

app/page.tsx [Server]
  ├── <Hero /> [Server]
  │   └── <ScrollIndicator /> [Client]
  ├── <About /> [Server]
  ├── <ProjectsSection /> [Server]
  │   ├── <SectionHeading /> [Server]
  │   ├── <ProjectGrid /> [Server]
  │   │   └── <ProjectCard /> × N [Server]
  │   │       ├── <ProjectThumbnail /> [Server] (next/image)
  │   │       ├── <ProjectInfo /> [Server]
  │   │       ├── <TechTags /> [Server]
  │   │       │   └── <TagPill /> × N [Server]
  │   │       └── <ProjectLinks /> [Server]
  │   └── <ProjectModal /> [Client]
  ├── <SkillsSection /> [Server]
  │   ├── <SectionHeading /> [Server]
  │   └── <SkillsGrid /> [Server]
  │       └── <SkillCategory /> × N [Server]
  └── <ContactSection /> [Server]
      ├── <ContactForm /> [Client]
      │   ├── <FloatLabelInput /> × 2 [Client]
      │   ├── <FloatLabelTextarea /> [Client]
      │   ├── <HoneypotField /> [Client]
      │   ├── <CharCounter /> [Client]
      │   └── <SubmitButton /> [Client]
      └── <ContactEmail /> [Server]  — mailto: fallback

app/projects/[slug]/page.tsx (P1) [Server]
  ├── <ProjectBreadcrumb /> [Server]
  └── <ProjectDetailPage /> [Server]

Shared:
  <ScrollReveal /> (P1) [Client]
  <FloatingContactPill /> (P1) [Client]
  <Analytics /> [Client]
```

### 5.3 Data Flow Between Tiers

| Flow | Source | Destination | Mechanism |
|------|--------|-------------|-----------|
| Content → page | `data/*.ts` | Server Components | ES module import at build time |
| Props → child | Server Component | Server Component | Native React props |
| Props → client | Server Component | Client Component | Props serialized and passed to client bundle |
| Form submit | ContactForm | `/api/contact` | `fetch()` POST with JSON body |
| API response | `/api/contact` | ContactForm | JSON `{ success, error }` |
| Active section | IntersectionObserver | Navigation | `useState` in client component |
| Modal URL | ProjectModal | `window.history` | `pushState` on open/close |
| Theme (P1) | `localStorage` | ThemeToggle | Read on mount, write on toggle |
| Analytics | Browser | Plausible CDN | Async script injection |

---

## 6. Routing & Page Architecture

### 6.1 Route Table

| Route | File | Type | Generation | Priority |
|-------|------|------|------------|----------|
| `/` | `app/page.tsx` | Server | `static` (default) | P0 |
| `/api/contact` | `app/api/contact/route.ts` | Server | `dynamic` (POST only) | P0 |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Server | `generateStaticParams` | P1 |
| 404 | `app/not-found.tsx` | Server | `static` | P0 |

### 6.2 Layout Structure

```html
<html lang="en" class="dark">
  <head>
    <script>/* inline theme detection (P1): apply before paint */</script>
  </head>
  <body class="bg-[--color-bg] text-[--color-text-primary] font-sans antialiased">
    <SkipToContent />
    <Navigation />
    <main id="main-content">
      {children}
    </main>
    <Footer />
    <Analytics />
  </body>
</html>
```

### 6.3 Page Section Order

```
┌──────────────────────────────────┐
│  <Navigation />    fixed top, z-50 │
├──────────────────────────────────┤
│  <Hero />              min-h-screen│
│  <About />                         │
│  <ProjectsSection />               │
│  <SkillsSection />                 │
│  <ContactSection />                │
├──────────────────────────────────┤
│  <Footer />                mt-auto │
└──────────────────────────────────┘
```

The `main` element uses `flex flex-col` with sections stacked vertically. Footer uses `mt-auto` to stick to bottom on short-content screens.

### 6.4 Metadata API

```typescript
// app/layout.tsx — root metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.defaultTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.metadata.defaultDescription,
  openGraph: {
    title: siteConfig.metadata.defaultTitle,
    description: siteConfig.metadata.defaultDescription,
    url: siteConfig.metadata.siteUrl,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.defaultTitle,
    description: siteConfig.metadata.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.metadata.siteUrl,
  },
}

// app/projects/[slug]/page.tsx — per-project metadata (P1)
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = projects.find(p => p.id === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.subtitle,
    openGraph: { title: project.title, description: project.subtitle },
  }
}
```

---

## 7. Design Token System

### 7.1 Color Palette

All tokens defined as CSS custom properties in `app/globals.css`. Dark theme is the default. Light theme overrides the same properties when `.light` is on `<html>`.

**Dark Theme (default):**
```
--color-bg:           #0a0a0b       page background
--color-surface:      #141416       card/section surface
--color-surface-hover:#1a1a1e       card hover
--color-border:       #1e1e22       subtle borders
--color-border-hover: #2a2a30       border on hover

--color-text-primary:   #f4f4f5     headings / body
--color-text-secondary: #a1a1aa     meta, subtitles, captions
--color-text-tertiary:  #52525b     placeholders, disabled
--color-text-inverse:   #0a0a0b     on accent

--color-accent:        #6366f1      indigo-500
--color-accent-hover:  #818cf8      indigo-400
--color-accent-subtle: rgba(99,102,241,0.08)

--color-success:       #22c55e
--color-error:         #ef4444
--color-warning:       #f59e0b

--backdrop-glass:      rgba(10,10,11,0.80)
```

**Light Theme overrides (P1):**
```
--color-bg:           #fafafa
--color-surface:      #ffffff
--color-surface-hover:#f5f5f5
--color-border:       #e5e5e5
--color-border-hover: #d4d4d4

--color-text-primary:   #171717
--color-text-secondary: #52525b
--color-text-tertiary:  #a3a3a3
--color-text-inverse:   #ffffff

--color-accent:        #6366f1
--color-accent-hover:  #4f46e5
--color-accent-subtle: rgba(99,102,241,0.06)

--backdrop-glass:      rgba(250,250,250,0.80)
```

### 7.2 Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Body + headings |
| `--font-mono` | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` | Code (project detail, P1) |

**Scale:**
```
--text-xs:    0.75rem  (12px)  line-height: 1rem
--text-sm:    0.875rem (14px)  line-height: 1.25rem
--text-base:  1rem     (16px)  line-height: 1.5rem
--text-lg:    1.125rem (18px)  line-height: 1.75rem
--text-xl:    1.25rem  (20px)  line-height: 1.75rem
--text-2xl:   1.5rem   (24px)  line-height: 2rem
--text-3xl:   1.875rem (30px)  line-height: 2.25rem
--text-4xl:   2.25rem  (36px)  line-height: 2.5rem
--text-5xl:   3rem     (48px)  line-height: 1.1
--text-6xl:   3.75rem  (60px)  line-height: 1.1
```

**Weights:** `--font-normal: 400`, `--font-medium: 500`, `--font-semibold: 600`, `--font-bold: 700`

**Tracking:** `--tracking-tight: -0.025em`, `--tracking-normal: 0em`, `--tracking-wide: 0.025em`

**Heading hierarchy:**
```
h1 (Hero name):      text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
h2 (Section title):  text-3xl md:text-4xl font-semibold tracking-tight
h3 (Card title):     text-xl font-semibold tracking-tight
h4 (Category head):  text-sm font-semibold uppercase tracking-wide text-[--color-text-secondary]
Body:                text-base leading-relaxed
Caption:             text-sm text-[--color-text-secondary]
Meta:                text-xs text-[--color-text-tertiary] uppercase tracking-wide
```

### 7.3 Spacing

```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-5:  1.25rem  (20px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
--space-24: 6rem     (96px)
```

### 7.4 Border Radii

```
--radius-sm:   4px
--radius-md:   6px
--radius-lg:   8px
--radius-xl:   12px
--radius-2xl:  16px
--radius-full: 9999px
```

### 7.5 Shadows

**Dark theme:**
```
--shadow-sm:   0 1px 2px rgba(0,0,0,0.3)
--shadow-md:   0 2px 8px rgba(0,0,0,0.35)
--shadow-lg:   0 4px 16px rgba(0,0,0,0.4)
--shadow-xl:   0 8px 32px rgba(0,0,0,0.5)
--shadow-glow: 0 0 0 2px rgba(99,102,241,0.3)
```

**Light theme (P1):**
```
--shadow-sm:   0 1px 2px rgba(0,0,0,0.04)
--shadow-md:   0 2px 8px rgba(0,0,0,0.06)
--shadow-lg:   0 4px 16px rgba(0,0,0,0.08)
--shadow-xl:   0 8px 32px rgba(0,0,0,0.12)
```

### 7.6 Transitions / Easing

```
--transition-fast:    150ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-base:    200ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-slow:    300ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-enter:   400ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-exit:    200ms cubic-bezier(0.4, 0, 0.2, 1)
```

Easing `cubic-bezier(0.16, 1, 0.3, 1)` is Linear-inspired: snappy start with smooth deceleration. Used for all entrance and micro-interactions. Exit uses standard ease-out for predictable disappearance.

---

## 8. Layout System

### 8.1 Container

```css
max-w-7xl mx-auto px-6 lg:px-12
/* max-width: 1280px, centered, 24px horizontal padding → 48px on desktop */
```

### 8.2 Section Vertical Spacing

```css
py-16 md:py-20 lg:py-24
/* 64px → 80px → 96px */
```

### 8.3 Grid Systems

**Projects grid:**
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8
```

**Skills grid:**
```css
grid grid-cols-2 md:grid-cols-3 gap-4
```

### 8.4 Breakpoints

| Tailwind | Min-Width | Target |
|----------|-----------|--------|
| `sm:` | 640px | Large phones, landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small desktops |
| `xl:` | 1280px | Standard desktops |

Mobile-first methodology. No custom breakpoint abstraction beyond Tailwind defaults.

### 8.5 Safe Areas

```css
.nav {
  padding-top: env(safe-area-inset-top);
}
.footer,
.floating-pill {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## 9. Animation & Interaction System

### 9.1 Animation Catalog

| ID | Animation | Trigger | Element | CSS Property | Duration | Easing |
|----|-----------|---------|---------|-------------|----------|--------|
| A01 | Card hover lift | Mouse hover | ProjectCard | `transform`, `box-shadow` | 200ms | ease-out |
| A02 | Card press | Mouse down | ProjectCard | `transform: scale(0.98)` | 100ms | ease-out |
| A03 | Link color shift | Hover/focus | `<a>`, `<button>` | `color` | 150ms | ease-out |
| A04 | Button bg shift | Hover | Primary button | `background-color` | 150ms | ease-out |
| A05 | Button press | Active | Button | `transform: scale(0.97)` | 100ms | ease-out |
| A06 | Focus ring | `:focus-visible` | All interactive | `box-shadow` | 150ms | ease-out |
| A07 | Nav background | Scroll threshold | `<nav>` | `background-color`, `backdrop-filter` | 200ms | ease-out |
| A08 | Nav height shrink | Scroll threshold | `<nav>` | `height` | 200ms | ease-out |
| A09 | Mobile drawer enter | Hamburger click | Drawer | `translateX(100%→0)` | 250ms | ease-out |
| A10 | Mobile drawer exit | Close action | Drawer | `translateX(0→100%)` | 200ms | ease-out |
| A11 | Mobile backdrop fade | Drawer open | Backdrop | `opacity` | 200ms | ease-out |
| A12 | Modal enter | Card click | Modal overlay + content | `opacity`, `scale(0.95→1)` | 250ms | ease-out |
| A13 | Modal exit | Close action | Modal | `opacity`, `scale(1→0.95)` | 150ms | ease-out |
| A14 | Scroll indicator bounce | Page load (continuous) | Scroll mouse icon | `translateY` | 1.5s | ease-in-out |
| A15 | Scroll indicator fade | Past 80% scroll | Indicator wrapper | `opacity` | 500ms | ease-out |
| A16 | Scroll reveal (P1) | Element enters viewport | Sections, cards | `opacity`, `translateY(20→0)` | 500ms | ease-out |
| A17 | Form submit → spinner | Submit click | Button content | `opacity` crossfade | 200ms | ease-out |
| A18 | Success checkmark | Submission success | Checkmark icon | `opacity`, `scale(0→1)` | 300ms | ease-out |
| A19 | Form replace success | After submit | Form container | `opacity`, `height` | 300ms | ease-out |
| A20 | TagPill hover (group) | Parent card hover | TagPill within card | `background-color`, `color` | 150ms | ease-out |
| A21 | Skill hover | Hover on skill chip | Skill chip | `border-color`, `color` | 150ms | ease-out |
| A22 | Float label | Input focus/value | `<label>` | `top`, `font-size`, `color` | 150ms | ease-out |
| A23 | Floating pill appear (P1) | Scroll past hero | Contact pill | `opacity`, `transform` | 200ms | ease-out |

### 9.2 Implementation Rules

- **No Framer Motion, no GSAP, no animation libraries.** All animations use CSS transitions or `@keyframes`.
- **All interactive elements** must have `transition` on the animated properties.
- **`prefers-reduced-motion: reduce`** disables all animations:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- **Focus states:** All interactive elements use `:focus-visible`:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-accent), 0 0 0 4px var(--color-bg);
}
```

- **Hover states** are CSS-only (no JS). Mobile gets `:active` as feedback.
- **Page behavior:** `scroll-behavior: smooth` on `<html>` (CSS). No scroll-jacking, no Locomotive Scroll.

---

## 10. Navigation System

### 10.1 Desktop Navigation

```
┌──────────────────────────────────────────────────────────────┐
│  [SS]     Projects    Skills    Contact    [theme toggle P1]  │
│  (logo)   (links →)                                (P1)      │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height at top | `h-16` (64px) |
| Height after scroll | `h-12` (48px) |
| Background at top | `transparent` |
| Background scrolled | `backdrop-blur-xl bg-[--backdrop-glass] border-b border-[--color-border]` |
| z-index | `z-50` |
| Layout | `flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-12` |
| Logo | Text "SS", `font-bold text-lg` |
| Nav links | `text-sm font-medium text-[--color-text-secondary] hover:text-[--color-text-primary]` |
| Active indicator | Color change to primary only (no underline, no dot) |

### 10.2 Mobile Navigation

```
┌──────────────────────────────────────────────────────┐
│  [SS]                                          [☰]   │
└──────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Hamburger visible | `< md` (below 768px) |
| Touch target | 44×44px minimum |
| Drawer width | `w-[80vw] max-w-sm` |
| Drawer background | `bg-[--color-surface] border-l border-[--color-border]` |
| Backdrop | `bg-black/60 z-40`, click to close |
| Close triggers | X button, Escape, link click, backdrop click |
| Body scroll | `overflow: hidden` on `<body>` when open |
| aria | `aria-expanded` on hamburger, `aria-hidden="true"` on closed drawer |
| inert (P1) | `inert` attribute on `<main>` when drawer open |

### 10.3 Scroll-Triggered Behaviors

| Behavior | Implementation |
|----------|---------------|
| Nav background | IntersectionObserver on 1px sentinel at top. `isAtTop === false` → glass background |
| Active section | IntersectionObserver per section, `rootMargin: '-50% 0px -50% 0px'` |
| Scroll indicator | IntersectionObserver on element at 80vh → fade out at threshold |
| Floating pill (P1) | IntersectionObserver on contact section → hide when in view |

### 10.4 NavLink Component

```typescript
// Props: href, label, isActive
// Renders: <a href="#section">
// Behavior: onClick → e.preventDefault() → document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
// Active: class when IntersectionObserver marks section as current
// Aria: aria-current="section" when active
// Keybaord: Enter/Space triggers click naturally via native <a>
// No-JS fallback: native anchor (#section) navigation works without client JS
```

---

## 11. Contact Form Architecture

### 11.1 Client Component (`contact-form.tsx`)

```
<form onSubmit={handleSubmit} noValidate>
  <!-- Honeypot (hidden, display:none, aria-hidden) -->
  <div style="display:none" aria-hidden="true">
    <input name="_honeypot" tabIndex={-1} autoComplete="off" />
  </div>

  <FloatLabelInput name="name" label="Name" type="text" autoComplete="name" required minLength={2} maxLength={100} />
  <FloatLabelInput name="email" label="Email" type="email" autoComplete="email" required />
  <FloatLabelTextarea name="message" label="Message" required minLength={10} maxLength={2000} rows={4}>
    <CharCounter current={message.length} max={2000} />
  </FloatLabelTextarea>
  <SubmitButton disabled={!isValid || isSubmitting} loading={isSubmitting} success={isSuccess} error={error} />
</form>
```

### 11.2 Form States

| State | Behavior |
|-------|----------|
| Default | Empty fields, submit disabled |
| Filling | Float labels animate above values |
| Field error (on blur) | Red border + error message below field |
| Submitting | Button shows spinner, all fields disabled |
| Success | Form replaced with thank-you + "Send another" |
| Network error | Inline error with email fallback |
| Rate limited | "Please wait 60 seconds" message |
| Honeypot filled | Silently accept, don't submit |
| JS disabled | `<noscript>` shows static mailto link |

### 11.3 API Route (`app/api/contact/route.ts`)

```typescript
// POST /api/contact
// Request body: { name, email, message, _honeypot? }

export async function POST(request: Request) {
  // 1. Parse JSON body
  // 2. Honeypot check — if _honeypot is non-empty, return 200 silently
  // 3. Zod validation — name (2-100), email (valid), message (10-2000)
  // 4. Rate limit check — in-memory Map<ip, timestamp>, 1 req/60s
  // 5. Sanitize inputs — strip HTML tags
  // 6. Send via Resend API
  // 7. Return { success: true } or { success: false, error: string }
}
```

### 11.4 Validation Schema (Zod)

```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  _honeypot: z.string().optional(),
})
```

### 11.5 Rate Limiting

```typescript
// In-memory Map, no external Redis
const rateLimit = new Map<string, number>()
const WINDOW_MS = 60_000 // 60 seconds
const MAX_REQUESTS = 1

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const lastRequest = rateLimit.get(ip)
  if (lastRequest && now - lastRequest < WINDOW_MS) {
    return false // rate limited
  }
  rateLimit.set(ip, now)
  return true
}
```

**Note:** In-memory rate limiting resets on Vercel serverless function cold starts. This is acceptable for a personal portfolio. If traffic exceeds expectations, migrate to Upstash Redis.

### 11.6 Email Delivery (Resend)

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'portfolio@shashwatsinha.com',
  to: siteConfig.email,
  subject: `Contact from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  replyTo: email,
})
```

---

## 12. SEO Architecture

### 12.1 Metadata

| Page | Title | Description | Priority |
|------|-------|-------------|----------|
| Home | `siteConfig.metadata.defaultTitle` | `siteConfig.metadata.defaultDescription` | P0 |
| Project detail (P1) | `{project.title} — {siteConfig.name}` | `project.subtitle` | P1 |
| 404 | `Page Not Found — {siteConfig.name}` | Default description | P0 |

### 12.2 Sitemap (`app/sitemap.ts`)

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectEntries = projects
    .filter(p => p.visible && !p.draft)
    .map(p => ({
      url: `${siteConfig.metadata.siteUrl}/projects/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    {
      url: siteConfig.metadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectEntries,
  ]
}
```

### 12.3 Robots (`app/robots.ts`)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.metadata.siteUrl}/sitemap.xml`,
  }
}
```

### 12.4 JSON-LD Structured Data

In `app/layout.tsx`, include `Person` schema:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.metadata.siteUrl,
  sameAs: Object.values(siteConfig.social).filter(Boolean),
  jobTitle: siteConfig.title,
}
```

Render as `<script type="application/ld+json">` in the `<head>`.

### 12.5 OG Tags

Present on every page via root layout metadata. Each project page (P1) overrides `og:title`, `og:description`, `og:url`, `og:image`.

### 12.6 SEO Edge Cases

| Scenario | Behavior |
|----------|----------|
| No meta description | Use site-wide default |
| Project has no image | Share text-only, no OG image |
| Draft project | Excluded from sitemap, `noindex` |
| Duplicate URLs | Canonical points to clean version |
| 404 | Custom page with link to home |
| Staging env | `noindex, nofollow` + robots.txt disallow |

---

## 13. Analytics Architecture

### 13.1 Provider

**Plausible Analytics** (cookieless, privacy-first, GDPR-compliant).

### 13.2 Integration

```typescript
// components/shared/analytics.tsx
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Load Plausible script async, non-blocking
    const script = document.createElement('script')
    script.src = `https://plausible.io/js/script.js`
    script.async = true
    script.dataset.domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!
    script.onerror = () => { /* silent fail */ }
    document.head.appendChild(script)
  }, [])

  // Track page views on route change
  useEffect(() => {
    // Push pageview event to Plausible via window.plausible
    window.plausible?.('pageview', { u: window.location.href })
  }, [pathname])

  return null
}
```

### 13.3 Environment Variables

```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=shashwatsinha.com
```

### 13.4 Behavior

| Scenario | Behavior |
|----------|----------|
| Script blocked by ad blocker | Fails silently, no console errors |
| Cookies disabled | Works without cookies |
| Do Not Track | Respected by provider |
| Script load failure | Silent degradation |

### 13.5 Outbound Link Click Tracking (Optional Enhancement)

Add `data-analytics` attribute to outbound links and listen for clicks in the analytics component.

---

## 14. Performance Architecture

### 14.1 Rendering Strategy

| Route | Strategy | Rationale |
|-------|----------|-----------|
| `/` | Static (default `static export`) | All content from static data files at build time |
| `/projects/[slug]` (P1) | Static with `generateStaticParams` | Pre-rendered at build for each project |
| `/api/contact` | Dynamic (POST only) | Serverless function, runs on demand |

### 14.2 Image Optimization

- All images use `next/image` with explicit `width` and `height` (prevents CLS).
- LCP image (hero thumbnail, if any): `priority`, `loading="eager"`.
- Non-LCP images: `loading="lazy"`, `placeholder="blur"` with blur data URL.
- Format: WebP/AVIF via Next.js automatic optimization.
- Gallery images (P1): lazy loaded with IntersectionObserver.

### 14.3 Font Loading

```typescript
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false, // only used in project detail (P1)
})
```

### 14.4 Code Splitting

| Strategy | Implementation |
|----------|---------------|
| Server Components | Default — only HTML shipped to client |
| Client Components | All 6 client components are leaf nodes, minimal JS |
| Dynamic imports (P1) | Wrap heavy client components with `dynamic(() => import(...))` |
| No runtime libraries | Zero animation, state management, or form libraries |

### 14.5 Performance Budget

| Metric | Target | Method |
|--------|--------|--------|
| LCP | < 1.5s | Static generation, preloaded fonts, priority hero image |
| CLS | < 0.05 | Explicit image dimensions, no layout-shifting animations |
| FID | < 50ms | Minimal JS, no blocking scripts |
| TTFB | < 200ms | Vercel edge network |
| Total JS | < 100 KB gzipped | Server components + minimal client bundle |
| Lighthouse Perf | ≥ 95 | All of the above |

---

## 15. Infrastructure Architecture

### 15.1 Deployment (Vercel)

| Config | Value |
|--------|-------|
| Provider | Vercel (Hobby) |
| Git | GitHub (`main` branch) |
| Custom domain | `shashwatsinha.com` |
| Preview deployments | Auto on PR |
| Build command | `next build` |
| Output directory | `.next` |
| Node version | 18.x+ |

### 15.2 `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/_next/image(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/:path*/", "destination": "/:path*", "permanent": true }
  ]
}
```

### 15.3 Domain DNS (Vercel DNS)

| Record | Type | Value |
|--------|------|-------|
| `shashwatsinha.com` | A | `76.76.21.21` |
| `www.shashwatsinha.com` | CNAME | `cname.vercel-dns.com` |

### 15.4 Environment Variables

| Variable | Purpose | Where Needed |
|----------|---------|-------------|
| `RESEND_API_KEY` | Resend email API key | API route |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain | Analytics component |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Metadata, sitemap |
| `CONTACT_EMAIL` | Destination email for form submissions | API route |

### 15.5 CI/CD (GitHub → Vercel)

- Push to `main` → automatic production deploy
- PR against `main` → preview deployment with unique URL
- Vercel automatically detects Next.js framework
- No custom CI pipeline needed for static portfolio

---

## 16. Security Architecture

### 16.1 Content Security Policy (CSP)

Set via `vercel.json` header or in Next.js `next.config.ts`:

```typescript
// next.config.ts
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",  // unsafe-inline for inline theme script
  "style-src 'self' 'unsafe-inline'",                          // unsafe-inline for Tailwind/Tokens
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.resend.com https://plausible.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')
```

### 16.2 Security Headers

| Header | Value | Set Via |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | vercel.json |
| `X-Frame-Options` | `DENY` | vercel.json |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | vercel.json |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | vercel.json |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Vercel Edge (automatic with custom domain) |
| `Content-Security-Policy` | CSP string above | next.config.ts |

### 16.3 Input Sanitization

| Attack Vector | Mitigation |
|---------------|------------|
| XSS in contact form | Strip HTML tags server-side (regex: `/<[^>]*>/g`) |
| Email injection | Validate email format via Zod. Pass only sanitized string to Resend. |
| Honeypot bots | Hidden field checked server-side. If filled, return 200 silently. |
| Rate limiting abuse | In-memory Map, 1 request / 60s per IP |
| API abuse (large bodies) | Zod validates max lengths (name 100, message 2000) |

### 16.4 Other Security Measures

| Concern | Mitigation |
|----------|------------|
| External links | `target="_blank" rel="noopener noreferrer"` on all external links |
| Secrets in client | No secrets in client bundle. API keys in env vars (server-only). |
| Dependency vulns | `npm audit` in CI, minimal dependency count |

---

## 17. Key Decisions & Rationale

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data source | Static `data/*.ts` files | No database, no CMS, no API needed. Content changes infrequently. Simpler than any alternative. |
| State management | URL params + local `useState` | No global state needed. 3 form fields + modal open/close + scroll position. Redux/Zustand would be cargo-culting. |
| Animation library | None (CSS only) | 23 animations identified — all implementable with CSS transitions. Framer Motion would add ~30KB gzipped for zero benefit. |
| Rate limiting | In-memory Map (no Redis) | Single portfolio site, not an enterprise form handler. In-memory is simpler and sufficient. If traffic surges, swap to Upstash Redis. |
| Form validation | Zod (API route only, client mirrors manually) | Zod provides type-safe server validation. Client validation is manual `useState` + blur handlers — simpler than a library for 3 fields. |
| Email delivery | Resend | Modern API, high deliverability, React email support, generous free tier. |
| Analytics | Plausible | Cookieless, GDPR-compliant, privacy-first. No consent banner needed. |
| Theme (P1) | CSS class toggle (`class="dark"` / `class="light"`) | CSS custom properties handle all token switching. JS only needed for persistence + system preference. No CSS-in-JS. |
| Font loading | `next/font/google` (self-hosted) | Zero external requests at runtime. Variable fonts reduce file count. `display: swap` ensures text visible immediately. |
| Mobile navigation | Slide-in drawer (right) | Standard mobile pattern. No custom gesture handling. Focus trap for accessibility. |
| Project detail (P0) | Modal overlay | No page transition needed on single-page site. URL updates for shareability. |
| Project detail (P1) | Dedicated route at `/projects/[slug]` | SEO-friendly URLs. Static generation. Breadcrumb for navigation. |
| Section order | Hero → About → Projects → Skills → Contact | Identity first → philosophy → proof → taxonomy → conversion. Aligns with scanning behavior. |
| No headshot | Intentional | "The work is the identity." Prevents bias, keeps focus on projects. |
| No blog | Explicitly excluded | Dilutes positioning. Not a content play. |
| No resume download | Intentional | Contact form is the conversion goal. No PDF treadmill. |
| Custom domain | `shashwatsinha.com` | Professional signal. Vercel DNS for simplicity. |
| CSP with `unsafe-inline` | Accepted trade-off | Required for inline theme-detection script (< 10 lines) and Tailwind. Risk is negligible for a static portfolio with no user-generated content. |

---

## Appendix A: Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
      },
      borderRadius: {
        sm: '4px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
}
```

## Appendix B: CSS Architecture

- **95% Tailwind utilities** — applied directly in JSX
- **`app/globals.css`** — only for:
  - CSS custom property definitions (design tokens)
  - `@media (prefers-reduced-motion: reduce)` overrides
  - `:focus-visible` global style
  - Safe-area-inset utility classes
  - `@media print` styles
- **No CSS modules, no styled-components, no CSS-in-JS runtime**

## Appendix C: Component State Matrix

| Component | Default | Loading | Error | Empty | Edge |
|-----------|---------|---------|-------|-------|------|
| Hero | Full hero | N/A | N/A | N/A | Responsive font scaling |
| About | Bio text | N/A | N/A | N/A | N/A |
| ProjectsSection | Grid of cards | N/A | N/A | "Coming soon" CTA | 10+ projects: grid wraps |
| ProjectCard | Card with info | Blur placeholder | Fallback initials | N/A | Long title: line-clamp-2 |
| ProjectModal | Content overlay | Skeleton | "Details unavailable" | N/A | Focus trap, scroll lock |
| SkillsSection | Category grid | N/A | N/A | Hidden entirely | 0 skills in cat: hidden |
| ContactForm | Empty form | Spinner on button | Inline error message | N/A | Rate limited: timer |
| Navigation | Fixed top | N/A | N/A | N/A | No IntersectionObserver: click-only |
| ThemeToggle (P1) | Icon in nav | N/A | System pref fallback | N/A | localStorage full: session-only |
| ScrollReveal (P1) | Hidden | N/A | N/A | N/A | Reduced motion: always visible |
