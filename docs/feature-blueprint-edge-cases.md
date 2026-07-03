# Portfolio — Feature Blueprint & Edge Case Analysis

**Owner**: Shashwat Sinha
**Stack**: Next.js (App Router) | TypeScript | Tailwind CSS
**Core Message**: "I build software that lasts"

---

## Part 1: Feature Blueprint

### P0 — Must Have (Launch Blockers)

---

#### 1. Hero / Intro Section

| Field | Detail |
|---|---|
| **What** | Full-viewport hero with name, tagline ("I build software that lasts"), and a subtle visual element (logo monogram, minimal graphic, or ambient texture — no floating gradient blobs). |
| **Where** | `app/page.tsx` — first section, above the fold. |
| **User benefit** | Establishes identity and tone in the first 2 seconds. Signals premium, quiet confidence. |
| **Component type** | Server component. Entirely static content. |
| **Interactions** | Optional scroll-down indicator (chevron or line that fades on scroll). Smooth scroll to next section. |
| **Dependencies** | Navigation scroll-spy (P0). |

**Acceptance criteria:**
- [ ] Occupies 100vh (with mobile offset for browser chrome).
- [ ] Name and tagline render immediately (no client-side waterfalls).
- [ ] Scroll-down indicator is visible until user scrolls past 80% of viewport height.
- [ ] No client-side JS required to render the hero.
- [ ] Responsive typography scales without overflow at any viewport width.

---

#### 2. About Section

| Field | Detail |
|---|---|
| **What** | A single-column or two-column layout with a short bio, professional philosophy, and a link to contact. |
| **Where** | Second section, immediately below the hero. |
| **User benefit** | Builds trust. Gives visitors a reason to keep scrolling. |
| **Component type** | Server component. Static content from a data file (`data/about.ts`). |
| **Interactions** | None required. |
| **Dependencies** | None. |

**Acceptance criteria:**
- [ ] Content is readable at all breakpoints (single column on mobile, two columns optional on desktop).
- [ ] Links (e.g., "Get in touch") use Next.js `<Link>` or smooth-scroll anchor.
- [ ] No client-side JS required.

---

#### 3. Projects Section

| Field | Detail |
|---|---|
| **What** | A responsive grid of project cards. Each card shows: title, a short description, tech stack tags, and links (live / source). Click navigates to a project detail view (P0 modal or inline expand, P1 dedicated page). |
| **Where** | Third section. |
| **User benefit** | Social proof. Demonstrates breadth and depth of work. |
| **Component type** | Server component. Data sourced from `data/projects.ts`. Card component is server-compatible. Detail view requires client interactivity if modal-based. |
| **Interactions** | Card hover: subtle lift + border highlight. Click opens detail view. Keyboard: Enter/Space on focused card opens detail. |
| **Dependencies** | Project detail view (P0). |

**Acceptance criteria:**
- [ ] Grid adapts: 1 col mobile, 2 col tablet, 3 col desktop.
- [ ] Each card truncated at 3 lines for description, 3 tags max visible (+ " +N" overflow).
- [ ] Empty state renders "Projects coming soon" with an email CTA.
- [ ] Very long titles (40+ chars) use ellipsis after 2 lines.
- [ ] Images use Next `<Image>` with lazy loading, explicit width/height, and WebP/AVIF.
- [ ] Keyboard navigable.

---

#### 3b. Project Detail View

| Field | Detail |
|---|---|
| **What** | Overlay/modal (P0) or dedicated route (P1) showing full project: extended description, tech stack, role timeline, links, gallery. |
| **Where** | Overlay on same page OR `app/projects/[slug]/page.tsx`. |
| **User benefit** | Deep-dive into a specific project without leaving the page. |
| **Component type** | Client component if modal (needs state for open/close, scroll lock). Server component if dedicated page. |
| **Interactions** | Close on: X button, Escape key, click outside. Scroll lock when open. Back/forward browser navigation works (URL updates). |
| **Dependencies** | Projects section (P0). |

**Acceptance criteria (modal approach):**
- [ ] Opens on card click. Closes via X, Escape, or backdrop click.
- [ ] Body scroll is locked when open.
- [ ] URL updates via `useRouter.push` with `scroll={false}` for shallow routing.
- [ ] Focus is trapped inside the modal.
- [ ] 0 projects → detail view is inaccessible (no cards to click).

---

#### 4. Skills Section

| Field | Detail |
|---|---|
| **What** | Categorized list/grid of technical skills (e.g., Languages, Frameworks, Tools, AI/ML). Each skill shows name and optional icon. |
| **Where** | Fourth section. |
| **User benefit** | Quick visual scan of technical breadth. Recruiters hit this section hard. |
| **Component type** | Server component. Static data from `data/skills.ts`. |
| **Interactions** | None required. Subtle hover for visual polish (P1). |
| **Dependencies** | None. |

**Acceptance criteria:**
- [ ] Categories are clearly delineated via headings, dividers, or background tint shifts.
- [ ] Skills render alphabetically within each category.
- [ ] Very long skill names (e.g., "Natural Language Processing") wrap gracefully without breaking layout.
- [ ] 0 skills in a category → category is hidden entirely.
- [ ] 0 skills total → section is hidden (or shows a minimal "Check back soon" state if config decides).

---

#### 5. Contact Section

| Field | Detail |
|---|---|
| **What** | Lightweight contact form: Name (required), Email (required, validated), Message (required, max 1000 chars). Submit button with loading state. Below the form: fallback email link. |
| **Where** | Fifth section. |
| **User benefit** | Low-friction way to reach out. No page navigation required. |
| **Component type** | Client component (form state, validation, async submission). API route at `app/api/contact/route.ts`. |
| **Interactions** | Real-time validation on blur. Submit button shows spinner + disabling during request. Success → thank-you message. Error → inline error with retry prompt. |
| **Dependencies** | API route for form submission (P0). |

**Acceptance criteria:**
- [ ] Validation: name (non-empty), email (valid format), message (non-empty, ≤ 1000 chars).
- [ ] Email field uses `type="email"` and `autoComplete="email"`.
- [ ] Submit button disabled until all fields are valid.
- [ ] On submit: button shows spinner, fields are disabled.
- [ ] On success: form replaced with a thank-you message + "Send another" link.
- [ ] On failure: inline error message, form remains filled, button re-enabled.
- [ ] Server-side validation mirrors client-side (defense in depth).
- [ ] Rate limiting: max 1 submission per 60 seconds per IP.
- [ ] No JS fallback: static email address is displayed when JS is disabled (detected via `<noscript>` or server-rendered fallback).
- [ ] Mobile: inputs are properly sized, no zoom on focus, auto-capitalize off for email.
- [ ] Character counter for message field.

---

#### 6. Footer

| Field | Detail |
|---|---|
| **What** | Copyright line, social links (GitHub, LinkedIn, Twitter/X), "Built by Shashwat Sinha" credit. Minimal, no large blocks. |
| **Where** | Bottom of every page. |
| **User benefit** | Closure, credibility (social proof via profiles). |
| **Component type** | Server component. Shared layout (`app/layout.tsx`). |
| **Interactions** | Social links open in new tab with `rel="noopener noreferrer"`. |
| **Dependencies** | None. |

**Acceptance criteria:**
- [ ] Sticks to the bottom even on pages with little content (use `flex min-h-screen flex-col` on body, `mt-auto` on footer).
- [ ] Links are not indexed (if desired, add `rel="nofollow"`).
- [ ] Year in copyright is dynamic (`new Date().getFullYear()`).

---

#### 7. Navigation Bar

| Field | Detail |
|---|---|
| **What** | Fixed/sticky top nav with: logo/monogram, section links (About, Projects, Skills, Contact), and mobile hamburger menu. |
| **Where** | `app/layout.tsx` — shared across all pages. |
| **User benefit** | Easy section navigation and wayfinding. |
| **Component type** | Client component (scroll tracking, mobile menu toggle). |
| **Interactions** | Click nav link → smooth scroll to section. Active section highlighted via Intersection Observer. Mobile: hamburger toggles slide-in panel. Close on link click, Escape, or outside click. |
| **Dependencies** | All sections must have matching `id` attributes. |

**Acceptance criteria:**
- [ ] Nav is translucent/blurred when at top, becomes opaque with a subtle bottom border on scroll.
- [ ] Active nav item updates based on scroll position (Intersection Observer).
- [ ] Mobile menu: slide-in from right, 80vw max width, backdrop overlay, focus trapped, body scroll locked.
- [ ] No JS fallback: anchor links (`#about`) work natively for navigation.
- [ ] Mobile close: X button, Escape, link click, backdrop click.
- [ ] Touch targets ≥ 44px.
- [ ] Nav does not overlap hero content (transparent at top, opaque after scroll).

---

#### 8. Analytics

| Field | Detail |
|---|---|
| **What** | Lightweight page-view tracking. No cookie banners — use a privacy-first provider (e.g., Plausible, Umami, or Vercel Analytics). |
| **Where** | `app/layout.tsx` — loaded once, tracks all route changes. |
| **User benefit** | Owner gets visibility into traffic patterns. |
| **Component type** | Client component or script tag. |
| **Interactions** | None visible to the user. |
| **Dependencies** | None. |

**Acceptance criteria:**
- [ ] Tracks page views, referrer, browser, device type.
- [ ] Respects Do Not Track header if applicable.
- [ ] Script loaded async, does not block rendering.
- [ ] Analytics script fails silently — no user-facing impact.
- [ ] Ad/tracker blockers are handled gracefully (analytics simply stops collecting; no console errors spamming).

---

#### 9. SEO Foundation

| Field | Detail |
|---|---|
| **What** | Per-page metadata, Open Graph tags, JSON-LD structured data (Person schema), sitemap.xml, robots.txt. |
| **Where** | `app/layout.tsx` (default metadata), `app/page.tsx` (home), `app/projects/[slug]/page.tsx` (project pages). |
| **User benefit** | Discoverable via search engines. Rich previews on social shares. |
| **Component type** | Server-side metadata export. |
| **Interactions** | None. |
| **Dependencies** | None. |

**Acceptance criteria:**
- [ ] Every page has unique `title` and `description` metadata.
- [ ] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) present on all pages.
- [ ] Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) present.
- [ ] JSON-LD structured data for `Person` schema on homepage.
- [ ] Canonical URLs on all pages.
- [ ] `sitemap.xml` auto-generated (Next.js `sitemap.ts`).
- [ ] `robots.txt` allows all crawlers, points to sitemap.
- [ ] Missing descriptions → fallback to site-wide default.
- [ ] Missing alt text on images → automated fallback to project name or "Screenshot of [Project Name]".

---

#### 10. Performance Foundation

| Field | Detail |
|---|---|
| **What** | Image optimization, lazy loading, dynamic imports, minimal JS bundles. |
| **Where** | Global — every component. |
| **User benefit** | Fast page loads, low bounce rates. |
| **Component type** | Architecture-level concern. |
| **Interactions** | None visible. |
| **Dependencies** | Every feature that uses images or heavy libraries. |

**Acceptance criteria:**
- [ ] All images use Next `<Image>` with explicit `width`, `height`, and `loading="lazy"` (except hero/LCP image).
- [ ] Hero image (if any) uses `priority` and `loading="eager"`.
- [ ] No render-blocking client JS on page load (server components where possible).
- [ ] Client components are wrapped in `dynamic(() => import(...), { ssr: false })` where appropriate.
- [ ] Lighthouse scores: 95+ on Performance, 100 on Accessibility, 100 on Best Practices, 90+ on SEO.
- [ ] Core Web Vitals pass: LCP < 2.5s, FID < 100ms, CLS < 0.1.

---

### P1 — Should Have (Launch + 1 Sprint)

---

#### 11. Project Detail Pages (Dedicated Route)

| Field | Detail |
|---|---|
| **What** | Full-page project case studies at `/projects/[slug]`. Richer content than the modal overlay. |
| **Where** | `app/projects/[slug]/page.tsx`. |
| **User benefit** | Shareable URLs, better SEO for individual projects, deeper storytelling. |
| **Component type** | Server component with `generateStaticParams` for ISR/SSG. |
| **Interactions** | Back navigation, breadcrumbs. |
| **Dependencies** | Data layer from Projects (P0). |

**Acceptance criteria:**
- [ ] URLs are human-readable and SEO-friendly (`/projects/surge`, not `/projects/1`).
- [ ] `generateMetadata` produces unique meta tags per project.
- [ ] Missing slug renders 404.
- [ ] Gallery images lazy-loaded with blur-up placeholders.
- [ ] Breadcrumb: Home → Projects → [Project Name].

---

#### 12. Scroll-Triggered Reveal Animations

| Field | Detail |
|---|---|
| **What** | Elements fade and slide up on scroll into view. Subtle — no dramatic parses. |
| **Where** | Sections, project cards, skill items. |
| **User benefit** | Polished, premium feel without being distracting. |
| **Component type** | Client component wrapper using Intersection Observer. |
| **Interactions** | Each element animates once (no repeat). Respects `prefers-reduced-motion`. |
| **Dependencies** | All section components. |

**Acceptance criteria:**
- [ ] Animation is a single `translateY(20px) → translateY(0)` + `opacity(0) → opacity(1)` over 400–600ms.
- [ ] Stagger delay between sibling items (100ms gap).
- [ ] `prefers-reduced-motion: reduce` disables all animations.
- [ ] No layout shift from animation.
- [ ] Animations do not play on mobile if it causes jank (check device RAM/performance via `requestAnimationFrame` sampling).

---

#### 13. Theme Toggle (Dark / Light)

**Note**: Evaluate if dark/light theming is needed. If the portfolio is dark-only by design, skip this.

| Field | Detail |
|---|---|
| **What** | A toggle in the nav to switch between light and dark themes. Persisted in localStorage. Defaults to system preference. |
| **Where** | Nav bar. |
| **User benefit** | Comfort — respects user preference. |
| **Component type** | Client component. CSS variables for theme tokens. |
| **Interactions** | Toggle icon (sun/moon). Smooth transition (300ms). |
| **Dependencies** | CSS variable architecture. |

**Acceptance criteria:**
- [ ] On first visit, respects `prefers-color-scheme`.
- [ ] Toggle persists choice in `localStorage`.
- [ ] Flash of wrong theme prevented (inline critical CSS in `<head>`).
- [ ] All components respond to theme tokens.
- [ ] No JS fallback: system preference applies (no toggle available).

---

#### 14. Enhanced Loading States

| Field | Detail |
|---|---|
| **What** | Skeleton loaders for dynamic content (project images, galleries). |
| **Where** | Projects section, project detail views. |
| **User benefit** | Perceived performance. Prevents layout shift. |
| **Component type** | Server component with Suspense boundaries. |
| **Interactions** | None. |
| **Dependencies** | Projects section (P0). |

**Acceptance criteria:**
- [ ] Skeleton matches card aspect ratio and layout exactly (prevents CLS).
- [ ] Skeleton uses a subtle pulse animation.
- [ ] Replaced seamlessly when content loads.

---

### P2 — Nice to Have (Post-Launch / Content Threshold)

| # | Feature | When Viable | Benefit | Notes |
|---|---|---|---|---|
| 15 | **Project filtering** — filter by tech/category | 6+ projects | Faster discovery for content-heavy state | Client-side filtering, URL search params for shareable filters |
| 16 | **Command palette (Cmd+K)** | 4+ sections, 4+ projects | Power-user navigation | Uses `useEffect` for keyboard listener, modal pattern |
| 17 | **Micro-interactions** — button press effects, cursor follower | After all P0/P1 is stable | Delight | Respect `prefers-reduced-motion`. Keep it subtle — no floating blobs |
| 18 | **Contact form attachments** | When needed | File sharing | Adds complexity — needs blob storage, size limits, virus scanning |
| 19 | **Blog / Writing section** | Explicitly requested | Thought leadership | Currently excluded from scope. Adds significant content management surface |
| 20 | **Analytics dashboard** | When traffic > 1k/mo | Owner insights | Self-serve dashboard using Plausible/Umami API |

---

## Part 2: Edge Case Analysis

### 2.1 Loading States

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Hero | N/A — fully static | Renders immediately | No fallback needed |
| About | N/A — fully static | Renders immediately | No fallback needed |
| Projects | Data file is loading (unlikely — it's local) | Server renders with data | If data fetch fails (static data), build breaks at compile time — caught in CI |
| Projects | Images loading | Image placeholder has proper aspect ratio to prevent CLS | Low-quality blur placeholder (base64) or solid color matching dominant image color |
| Project Detail | Modal content loading | Show skeleton matching card layout | If data is missing, show generic "Project details unavailable" |
| Skills | N/A — fully static | Renders immediately | No fallback needed |
| Contact Form | Submit in progress | Button shows spinner, all fields disabled | N/A — user sees loading feedback |
| Navigation | N/A — fully static | Renders immediately | No fallback needed |
| Analytics script | Script loading | Loaded async; does not block anything | If script fails, silently degrade |
| Project Detail Page (P1) | Page generating via ISR | Show static fallback or loading skeleton | Stale content served while revalidation happens |

---

### 2.2 Empty States

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Projects | 0 projects in `data/projects.ts` | Section renders "Projects coming soon" with a CTA to contact | CTA could link to GitHub or contact section |
| Projects | 0 projects matching filter (P2) | "No projects match your filter" message with reset button | — |
| Skills | 0 skills total | Section is hidden entirely | Config flag to show/hide section |
| Skills | 0 skills in one category | That category heading is hidden | Only rendered categories show |
| Contact Form | N/A | Form always present | — |
| Project Detail | Missing project data | Render 404 or "Project not found" | Redirect to projects section |
| Gallery | 0 images for a project | Gallery section is hidden | Show only text content |
| Footer | 0 social links | Social link section is hidden | Still shows copyright |

---

### 2.3 Error States

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Contact Form | Network failure on submit | Inline error: "Could not send message. Please try again or email [email]" | Pre-filled email link as ultimate fallback |
| Contact Form | Server validation error | Return specific field error from API | Show under relevant field |
| Contact Form | Rate limited (spam) | "Too many requests. Please wait 60 seconds." | Timer until resubmit allowed |
| Contact Form | Server 500 | Inline error: "Something went wrong. Please email me directly." | Static email link always visible near form |
| Images (any) | Image fails to load | `onError` handler replaces with fallback placeholder | Placeholder shows project initials or generic icon |
| Analytics | Script blocked / fails | No error shown to user | console.error suppressed, analytics just stops |
| Navigation | Scroll spy fails | Nav highlights stop updating on scroll | All nav links still work for manual clicking |
| Navigation | IntersectionObserver not supported | Nav highlights via click only | Anchor links still work |
| Theme Toggle (P1) | localStorage full/unavailable | Theme defaults to system preference | Toggle still works in-session but won't persist |
| Theme Toggle (P1) | Flash of wrong theme | Inline `<script>` in `<head>` sets theme before paint | — |
| API Route | Rate limiter failure | Allow the request (fail open) rather than block everyone | Log the error server-side |

---

### 2.4 Boundary Conditions

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Project Title | Very long (60+ characters) | Ellipsis after 2 lines (`line-clamp-2`) | Full title visible in detail view |
| Project Description | Very long (300+ chars on card) | Truncated at 3 lines (`line-clamp-3`) | Full description in detail view |
| Project Tech Tags | 8+ tags | Show first 3, then "+5 more" in a subtle badge | All tags visible in detail view |
| Project Count | 10+ projects | Grid handles any count with proper wrapping | No pagination needed at this stage (P2 feature) |
| Skill Name | Very long (e.g., "Natural Language Processing") | Text wraps within the skill chip/badge | Chip height auto-expands |
| Skills Per Category | 20+ skills | Grid wraps; skills scroll within category if needed | Consider filtering or collapsing categories |
| Contact Message | 1000+ characters | Character counter prevents exceeding limit | Trim on server; show error on client |
| Contact Name | 100+ characters | Frontend limit at 100 chars | Server validates max length |
| Special Characters | XSS attempt in contact form | Server sanitizes all inputs | Store only sanitized text; no HTML rendering |
| Special Characters | Project names with special chars (e.g., "Nuvora® OS") | Render as-is with proper encoding | Ensure database/API handles UTF-8 |
| URL Slugs | Duplicate project names | Generate unique slug via suffix | Build-time validation |
| Empty Section | All sections have no data | Minimal "Under construction" hero page | — |

---

### 2.5 Mobile Edge Cases

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Hero | Mobile viewport (375px width) | Text scales down gracefully; no overflow | Fluid type system using `clamp()` |
| Hero | Notch / Dynamic Island | Content respects safe-area-inset | Use `env(safe-area-inset-top)` |
| Navigation | Hamburger menu | Slide-in panel from right, backdrop, scroll lock | Anchor links work without JS |
| Navigation | Touch targets | Min 44×44px for all nav links and hamburger | — |
| Navigation | iOS Safari bottom bar | Nav bar accounts for `env(safe-area-inset-bottom)` | — |
| Contact Form | Input focus on iOS | No auto-zoom: use `font-size: 16px` on inputs | — |
| Contact Form | Email field on mobile | `type="email"` triggers appropriate keyboard | Auto-capitalize off |
| Contact Form | Message field | `textarea` with proper resizing | Minimum 4 rows visible |
| Project Cards | Hover effects | Hover effects have no mobile equivalent | Tap state (`:active`) provides feedback |
| Scroll Animations (P1) | Low-end mobile devices | Animations cause jank → disable on low-power devices | Use `matchMedia('(prefers-reduced-data: reduce)')` or frame rate sampling |
| Gallery | Swipe on mobile | Touch swipe between images (P2) | Left/right arrow buttons always visible as fallback |

---

### 2.6 Browser / Environment Edge Cases

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Any | JavaScript disabled | All core content renders (server components). Form shows static email. Nav anchor links work. | No client-only features work (theme toggle, animations, form submission, analytics) |
| Any | Very old browser (no CSS Grid) | Content is still readable (single-column fallback) | Feature queries (`@supports (display: grid)`) or modern CSS handles this |
| Contact Form | JS disabled | Static email address and mailto link displayed | `<noscript>` tag or server-conditional rendering |
| Analytics | Cookies blocked | Analytics works without cookies (privacy-first providers) | No fallback needed; data may be slightly less accurate |
| Analytics | Ad blocker | Provider's script is blocked; no data collected | No console errors, no user-facing impact |
| Navigation | No IntersectionObserver | Active state defaults to none | Polyfill available but optional |
| Theme Toggle (P1) | `prefers-color-scheme` not supported | Default to dark theme (or light) | Manually set default in CSS |
| Theme Toggle (P1) | `localStorage` not available | Theme persists only for session | Toggle works, just doesn't save |
| Images | `loading="lazy"` not supported (Safari < 15.4) | Images load normally (eager) | Polyfill via `loading` attribute — no action needed as eager is acceptable |
| Any | Print stylesheet | All content visible, no interactive elements printed | Add `@media print` styles |

---

### 2.7 SEO Edge Cases

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Homepage | No meta description set | Use site-wide default: "Shashwat Sinha — Software Engineer building scalable systems and AI products" | — |
| Project Page | Project has no description | Use excerpt from project body or fallback to site default | If no body either, exclude from sitemap |
| Project Page | Project has no image | Share without image (text-only preview) | Use site OG image as fallback |
| Image | No alt text provided | Use `alt={project.name}` automatically | Also log warning during build |
| Sitemap | Project has `draft: true` flag | Excluded from sitemap, `noindex` meta tag | — |
| Sitemap | 50,000+ projects (unrealistic) | Sitemap index with multiple sitemaps | — |
| Canonical | Duplicate content (e.g., `/projects/surge` and `/projects/surge?v=2`) | Canonical URL points to clean version | — |
| 404 | Page not found | Custom 404 page with link to home | — |
| Robots | Staging environment | `noindex, nofollow` meta tag + robots.txt disallow | — |

---

### 2.8 Performance Edge Cases

| Feature | Scenario | Expected Behavior | Fallback / Degradation |
|---|---|---|---|
| Images | 10+ high-res project screenshots | All lazy-loaded; only visible ones load | Blur placeholder while loading |
| Images | Hero image too large | Use responsive `srcSet` with multiple breakpoints | Eager load the most appropriate size |
| Page | Slow 3G network | Content renders progressively (no JS dependency for content) | Suspense boundaries show skeletons |
| Page | Large JS bundle | Dynamic imports split code by route | No heavy libraries like Framer Motion; minimal deps |
| Contact Form | Multiple rapid submissions | Rate limiting at API level; button disabled during pending | — |
| Project Detail | Large gallery (15+ images) | Lazy-loaded with Intersection Observer | Show first 4, rest load on scroll |
| Fonts | Custom font fails to load | System font stack as fallback | `font-display: swap` ensures text is visible immediately |
| Layout | Content shifts | No CLS: all images have explicit dimensions, skeletons match layout | — |
| Caching | Static assets | Long cache headers on images, fonts, JS/CSS bundles | Next.js handles this by default |
| Memory | Long session on mobile | No memory leaks: Intersection Observers disconnected, event listeners cleaned up | React strict mode + useEffect cleanup |

---

## Design Constraints (from Product Strategy)

| Constraint | Rationale |
|---|---|
| **No floating gradient blobs** | Avoids generic startup design patterns |
| **No excessive Framer Motion** | Prioritizes performance and simplicity |
| **No generic SaaS landing page** | Portfolio must feel personal and premium |
| **No blog** | Explicitly excluded from scope |
| **No resume download** | Contact form is the conversion goal |
| **Minimal animations** | Motion must support UX, not distract |
| **Server components preferred** | Smaller JS bundles, faster FCP/LCP |
| **Client components only when necessary** | Forms, interactive UI, scroll tracking |

---

## Data Architecture Notes

### File Structure (Suggested)

```
data/
├── site.ts          # Site-wide config (name, tagline, social links, metadata)
├── about.ts         # Bio text, philosophy
├── projects.ts      # Project list (title, slug, description, tech, images, links)
├── skills.ts        # Categorized skills
└── contact.ts       # Contact config (email, form settings)

app/
├── layout.tsx       # Root layout: nav, footer, analytics, metadata
├── page.tsx         # Landing page (all sections)
├── not-found.tsx    # Custom 404
├── projects/
│   └── [slug]/
│       └── page.tsx # Project detail (P1)
└── api/
    └── contact/
        └── route.ts # Form submission handler

components/
├── sections/
│   ├── hero.tsx
│   ├── about.tsx
│   ├── projects.tsx
│   ├── skills.tsx
│   └── contact.tsx
├── ui/
│   ├── project-card.tsx
│   ├── skill-chip.tsx
│   ├── contact-form.tsx
│   ├── navigation.tsx
│   └── footer.tsx
└── shared/
    ├── scroll-reveal.tsx     # P1
    └── theme-toggle.tsx       # P1
```

### State Management Philosophy

- **No global state library**. React state + props are sufficient.
- **Form state**: React Hook Form or native `useState` + validation — lightweight, no heavy abstraction.
- **Theme (P1)**: CSS variables toggled via a class on `<html>`. localStorage for persistence.
- **Scroll position**: Intersection Observer per section. No scroll libraries (no Locomotive Scroll, no Lenis).

---

## Security Notes

| Concern | Mitigation |
|---|---|
| Contact form spam | Rate limiting (IP-based, 1 req/60s) + hidden honeypot field |
| XSS in form input | Server-side sanitization (strip HTML tags) |
| Email injection | Validate email format server-side; never pass raw input to `mail()` |
| API abuse | CORS restricted to own domain; rate limiting; request size limits |
| Dependency vulnerabilities | Regular `npm audit`; minimal dependency count |
| Analytics data leak | Privacy-first provider; no PII collected |

---

## Accessibility Baseline

| Requirement | Implementation |
|---|---|
| Keyboard navigation | All interactive elements focusable; logical tab order |
| Screen reader support | Semantic HTML, ARIA labels where needed, proper heading hierarchy |
| Focus indicators | Visible focus ring on all interactive elements |
| `prefers-reduced-motion` | All animations disabled |
| `prefers-color-scheme` | Theme toggle respects system preference (P1) |
| Color contrast | WCAG AA minimum (4.5:1 text, 3:1 large text) |
| Form labels | All inputs have associated `<label>` elements |
| Error announcements | Form errors use `aria-live="polite"` |
| Modal focus trap | Focus locked inside modal when open; returned on close |

---

*Last updated: July 2026*
