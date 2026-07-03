# Product Requirements Specification — Portfolio Website

**Owner:** Shashwat Sinha
**Status:** Draft
**Last Updated:** 2026-07-04

---

## 1. Pages & Sections

The site is a **single-page** application with one page and multiple sections. No secondary pages exist.

| # | Section | Purpose | Priority |
|---|---------|---------|----------|
| 1 | **Hero** | Name, title, primary tagline. Establishes identity within 2 seconds. | P0 |
| 2 | **About** | 2–3 sentence professional summary reinforcing core message. | P0 |
| 3 | **Projects** | Featured work with depth. Primary signal for technical hiring managers. | P0 |
| 4 | **Skills** | Technical competencies grouped by category. Scan-friendly. | P1 |
| 5 | **Contact** | Lightweight contact form + email link. No elaborate contact page. | P0 |
| 6 | **Footer** | Social links, copyright, minimal. | P1 |

**Explicitly excluded:**
- Blog / writing — not a priority; would dilute focus.
- Resume download — personal decision, no PDF.
- Photo / headshot — intentionally absent; let the work speak.
- Testimonials — too noisy for the positioning.

---

## 2. Content Requirements

### 2.1 Hero Section
```
Name:         Shashwat Sinha
Subtitle:     Software Engineer
Tagline:      Building scalable software systems and AI-powered products
CTAs:         [View Projects] [Get in Touch]   (smooth scroll anchors)
```

### 2.2 About Section
```
One paragraph (2–3 sentences) articulating:
- "I build software that lasts — focused on reliability, performance, and meaningful impact over flashy trends."
- Engineering philosophy: production thinking, system-level design, ownership.
- Optional: one sentence on what drives you (building, solving, shipping).
```

### 2.3 Projects Section
Each project card needs:
```
Title:          e.g. "Surge"
Subtitle:       One-line description
Role:           e.g. "Founding Engineer"
Tech Stack:     e.g. Next.js, Python, PostgreSQL, Redis
Outcome:        Measurable impact (50% faster, $X revenue, X users)
Links:          Live demo (if applicable) + GitHub repo
Thumbnail:      16:9 ratio, dark/light theme-aware
```

**Initial project list:**
- Surge (P0 — most mature)
- NuvoraOS (P0)
- Placeholder slot for future project (P2 — hidden until populated)

### 2.4 Skills Section
Grouped categories:

| Category | Skills |
|----------|--------|
| Frontend | Next.js, TypeScript, Tailwind CSS, React |
| Backend | Node.js, Python, Go, PostgreSQL, Redis |
| AI/ML | LangChain, Vector DBs, LLM Ops, RAG |
| Infrastructure | Vercel, AWS, Docker, CI/CD |
| Product | System Design, API Design, Product Engineering |

### 2.5 Contact Section
```
Method 1:  Email link (mailto:)   — always visible
Method 2:  Inline form            — lightweight, 3 fields (name, email, message)
```

### 2.6 Footer
```
Links:    GitHub, LinkedIn, Twitter/X
Copy:     © 2026 Shashwat Sinha. Built with Next.js & Tailwind CSS.
```

---

## 3. Functional Requirements

### FR-01: Navigation
- Sticky top nav shrinks on scroll (height reduces, backdrop-blur activates).
- Nav links: [Projects] [Skills] [Contact] — smooth-scroll to section.
- Active section highlighted via Intersection Observer.
- Mobile: hamburger menu with slide-in drawer.

### FR-02: Contact Form
- Fields: Name (required), Email (required, validated), Message (required, min 10 chars).
- Submit → POST to API route → email via Resend or similar lightweight provider.
- States: idle → loading → success (thank-you toast) → error (inline error message).
- Rate limit: 1 submission per 10 min per IP.
- Honeypot field for bot detection.
- No CAPTCHA — keep it frictionless.

### FR-03: Analytics
- Privacy-focused analytics (Plausible or Umami recommended — no GA).
- Track: page views, section visibility (optional), outbound link clicks.
- Exclude: personal traffic (filter by IP).

### FR-04: SEO
- One canonical URL with custom domain.
- `next-seo` or `metadata` API for:
  - Title, description, Open Graph image, Twitter card.
  - Breadcrumb structured data (JSON-LD).
  - Organization schema (name, url, logo, sameAs links).
- Robots.txt allowing all crawlers.
- Sitemap.xml generated automatically.

### FR-05: Theme
- Dark mode default (preferred for portfolio), light mode optional.
- System-preference-aware with manual toggle.
- No flash-of-wrong-theme (inline script in `<head>`).

### FR-06: Performance Budget
- Lighthouse scores: 95+ on all categories.
- JS bundle < 100 KB gzipped.
- No external fonts beyond system font stack or one variable font.
- All images WebP/AVIF, responsive `<picture>` with srcset.

---

## 4. Non-Functional Requirements

### 4.1 Performance Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 1.5s |
| FID (First Input Delay) | < 50ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| TTFB (Time to First Byte) | < 200ms (Vercel edge) |
| Total Bundle Size | < 100 KB gzipped JS |
| First Contentful Paint | < 1.0s |

### 4.2 Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard-accessible.
- Skip-to-content link.
- Proper heading hierarchy (h1 → h2 → h3, no jumps).
- Alt text on all images.
- Focus indicators visible (not removed).
- Color contrast ratio ≥ 4.5:1 for text.
- Form inputs with associated `<label>` elements.
- ARIA labels where semantic HTML insufficient.

### 4.3 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| 375px | Mobile (iPhone SE) |
| 768px | Tablet |
| 1024px | Small desktop |
| 1440px | Large desktop |
| >1440px | Max-width container (1280px) |

Mobile-first: all layouts built min-width up.

### 4.4 Browser Support
- Evergreen browsers: Chrome, Firefox, Safari, Edge (last 2 major versions).
- No IE11 support.

### 4.5 Security
- Contact form: Input sanitization, rate limiting, CSP headers.
- All external links: `rel="noopener noreferrer"`.
- No secrets in client bundle.

---

## 5. Content Data Model

### 5.1 Project Schema (TypeScript)

```typescript
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;        // 2-3 sentences
  role: string;
  techStack: string[];        // ["Next.js", "Python", "PostgreSQL"]
  outcome: string;            // "Reduced API latency by 40%"
  links: {
    live?: string;            // URL to deployed app
    github?: string;          // URL to source
    caseStudy?: string;       // Optional detailed write-up
  };
  thumbnail: {
    src: string;              // Path to image
    alt: string;
    width: number;
    height: number;           // 16:9 ratio
  };
  featured: boolean;          // Show in featured grid?
  order: number;              // Sort order
  visible: boolean;           // Show or hide (for placeholder slots)
}
```

### 5.2 Skills Schema (TypeScript)

```typescript
interface SkillCategory {
  name: string;               // "Frontend"
  skills: string[];           // ["Next.js", "TypeScript", ...]
}

type SkillsData = SkillCategory[];
```

### 5.3 Contact Form Schema

```typescript
interface ContactFormData {
  name: string;               // 2-100 chars
  email: string;              // Valid email format
  message: string;            // 10-2000 chars
  _honeypot?: string;         // Hidden field, must be empty
}
```

---

## 6. Interaction Requirements

### 6.1 Scroll Behavior
- Smooth scrolling via `scroll-behavior: smooth` (CSS) or `scrollIntoView({ behavior: 'smooth' })`.
- Intersection Observer to highlight active nav item.
- No parallax, no scroll-jacking.

### 6.2 Hover States
- Project cards: subtle scale (1.02) + shadow elevation increase.
- Links: color change only (no underlines unless on focus).
- Buttons: background shift or border color shift.
- All transitions: 150–200ms ease-out.

### 6.3 Transitions & Micro-interactions
- Page load: fade-in on hero (max 300ms delay).
- Section entrance: optional fade-up on scroll into view (once, not on repeat).
- Theme toggle: instant, no transition delay.
- Mobile menu: slide-in from right, 250ms ease-out.
- Form submission: button shows spinner on loading, checkmark on success.

### 6.4 Navigation Patterns
- Sticky nav at top, full-width, 64px height (shrinks to 48px on scroll).
- Nav background: transparent at top → blurred glass (`bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md`) after threshold.
- Active section: dot indicator or color highlight.
- Mobile: hamburger icon → full-height drawer + overlay.

---

## 7. Edge Cases

| # | Edge Case | Expected Behavior |
|---|-----------|-------------------|
| EC-01 | **No projects visible** | "No projects yet" empty state. Do not show empty grid. |
| EC-02 | **Project missing thumbnail** | Gradient placeholder with project initial(s) as fallback. |
| EC-03 | **Form submission fails** | Inline error: "Something went wrong. Try emailing directly at [email]" with mailto fallback. |
| EC-04 | **Form honeypot triggered** | Silently accept (no error shown to bot), do not send email. |
| EC-05 | **Rate limited** | "You've sent a message recently. Please wait a few minutes." |
| EC-06 | **JavaScript disabled** | Core content renders (SSR). Form falls back to mailto link. Navigation uses anchor links. Theme defaults to system preference. |
| EC-07 | **Slow network (3G)** | Skeleton loaders for hero and project images. Form disabled until ready. |
| EC-08 | **Reduced motion preference** | Respect `prefers-reduced-motion`. Disable all entrance animations, keep transitions to 0ms. |
| EC-09 | **Very long project list** | Show top N (6) featured projects. "View all" expands list. Initial render max 3. |
| EC-10 | **Image load failure** | Fallback to gradient placeholder. Console-warn, do not break layout. |
| EC-11 | **Missing tech stack data** | Omit tech stack row. Do not show empty chips. |
| EC-12 | **Oversized message** | Client-side character counter + truncation at 2000 chars. |
| EC-13 | **Tab close with unsent form** | `beforeunload` warning if form is dirty. |
| EC-14 | **Custom domain misconfiguration** | Vercel 404 page with redirect link to `shashwatsinha.vercel.app`. |

---

## 8. Technical Constraints

| Area | Decision |
|------|----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS, no CSS-in-JS runtime |
| Animation | Tailwind `motion-*` utilities or minimal CSS animations. No Framer Motion. |
| Fonts | One variable font (Inter or Geist). System font stack as fallback. |
| Images | Next.js `<Image>` with `next/legacy/image` or `next/image`. |
| Form backend | Next.js API Route + Resend (or similar email API). |
| Analytics | Plausible (self-hosted or cloud) or Umami. |
| Deployment | Vercel + custom domain via Vercel DNS. |
| Data source | Static content in `data/` directory (`.ts` files). No CMS, no database. |
| Component model | Server Components by default. Client Components only when interactivity needed (form, theme toggle, mobile nav, scroll observer). |

---

## 9. Data Flow Diagram

```
User Browser
  │
  ├──► GET / ───────────────► Next.js Server (SSR)
  │                              │
  │                              ├──► Render Hero, About, Skills
  │                              ├──► Read projects from data/projects.ts
  │                              └──► Return static HTML + dehydrated JSON
  │
  ├──► Client Hydration ────► Intersection Observer (nav highlight)
  │                              │
  │                              ├──► Theme toggle ← localStorage
  │                              └──► Mobile nav ← useState
  │
  └──► POST /api/contact ────► API Route
                                   │
                                   ├──► Validate input
                                   ├──► Rate limit check (upstash/redis or in-memory)
                                   ├──► Honeypot check
                                   ├──► Send via Resend
                                   └──► Return { success: true/false }
```

---

## 10. Out of Scope (v1)

- Blog / writing section
- Resume / CV download
- Headshot / photo
- Case study pages (can link externally)
- Dark/light theme toggle persistence beyond localStorage
- Multi-language / i18n
- CMS integration
- Discord / community features
- Newsletter signup
- Search functionality
- Page transitions (no route changes on single page)

---

## 11. Success Criteria

| Metric | How to Measure |
|--------|---------------|
| LCP < 1.5s | Lighthouse CI / Web Vitals |
| CLS < 0.05 | Lighthouse CI / Web Vitals |
| Lighthouse score 95+ | Lighthouse CI on every deploy |
| Contact form deliverability > 99% | Periodic manual test |
| No errors in console | Manual audit + Sentry (optional) |
| WCAG AA passes | axe-core / Lighthouse a11y audit |
| Responsive on 375px–1440px | Manual breakpoint testing |
