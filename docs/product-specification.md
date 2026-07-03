# Product Specification — Portfolio Website

**Owner:** Shashwat Sinha
**Status:** Draft
**Last Updated:** 2026-07-04

---

## 1. Product Overview & Vision

A single-page portfolio for Shashwat Sinha — a software engineer building scalable systems and AI-powered products. The site exists to convert a 30-second scan into a meaningful professional connection. No fluff. No noise. No generic startup patterns.

The core narrative: establish identity → prove it with work → share philosophy → invite contact.

---

## 2. Brand & Positioning

### Positioning Statement

> For engineering leaders who can spot craft in a single scroll — the quiet signal among the noise.

### Brand Voice

| Dimension | Standard |
|-----------|----------|
| Tone | Confident, restrained, technically precise |
| Prohibited | Hype language, "passionate," "enthusiastic," superlatives without evidence |
| Allowed | Direct statements of impact, measurable outcomes, clear technical descriptions |

### Design Tenets

- **Craft through restraint** — every element earns its place
- **Project-forward** — the work proves the claim
- **Premium without flash** — quality in spacing, typography, hierarchy — not gradients or blobs
- **No avatar, no headshot** — the work is the identity

### Brand Exclusions

- No floating gradient blobs
- No generic SaaS landing page patterns
- No excessive animation libraries
- No blog / writing section
- No resume / CV download
- No photo or headshot
- No testimonials or social proof widgets

---

## 3. Target Audience & Use Cases

### Primary: Technical Hiring Managers & Engineering Leaders

| Attribute | Detail |
|-----------|--------|
| Behavior | Scans for signal: title → projects → outcome → tech stack |
| Time budget | ~30 seconds before deciding whether to engage |
| Key signal | Quality of projects, clarity of impact, technical depth |
| Device | Desktop (primary), mobile (secondary) |
| Entry points | Direct link, recruiter referral, Google search, social (LinkedIn, Twitter/X) |

### Secondary: Recruiters & Sourcers

| Attribute | Detail |
|-----------|--------|
| Behavior | Phone-first scan: title → skills → contact |
| Key signal | Skills taxonomy, clear role titles, accessible contact |
| Entry points | LinkedIn profile link, search, recruiter referral |

### User Goals by Entry Point

| Entry Point | Primary Goal | Secondary Goal |
|-------------|-------------|----------------|
| Direct link | Assess depth of work | Quick contact |
| Google search | Verify skills + reputation | Portfolio comparison |
| Recruiter referral | Validate fit | Get contact info |
| Social (LinkedIn/X) | See full picture beyond profile | Share with team |

---

## 4. Content Architecture

### 4.1 Page Structure

Single-page scroll with the following sections in order:

| Order | Section | Purpose | Priority |
|-------|---------|---------|----------|
| 1 | **Hero** | Identity + tagline. Establishes tone in < 2s. | P0 |
| 2 | **Projects** | Proof. Featured work with depth. Primary signal. | P0 |
| 3 | **About** | Philosophy. 2–3 sentence professional summary. | P0 |
| 4 | **Skills** | Taxonomy. Technical competencies by category. | P0 |
| 5 | **Contact** | Conversion. Form + email link. | P0 |
| 6 | **Footer** | Closure. Social links, copyright. | P0 |

Optional detail views:
- Project detail pages at `/projects/[slug]` — accessible from project cards (P1)

### 4.2 Section Specifications

#### Hero (P0)

```
Name:         Shashwat Sinha
Title:        Software Engineer
Tagline:      Building scalable software systems and AI-powered products
CTAs:         [View Projects] → scroll to projects
              [Get in Touch] → scroll to contact
```

- Full-viewport height with mobile offset for browser chrome
- No avatar, no photo, no illustration, no gradient blobs
- Optional subtle visual element (monogram, minimal graphic, or ambient texture)
- Optional scroll-down indicator (fades past 80% scroll threshold)
- Renders entirely without client-side JavaScript

#### Projects / Selected Work (P0)

A responsive grid of project cards. Each card shows:

| Field | Detail |
|-------|--------|
| Title | Project name (e.g., "Surge") |
| Subtitle | One-line description |
| Role | e.g., "Founding Engineer" |
| Tech Stack | Key technologies (max 3 visible, "+N" overflow badge) |
| Outcome | Measurable impact (e.g., "Reduced latency by 40%") |
| Links | Live demo + GitHub (open in new tab) |
| Thumbnail | 16:9 ratio, theme-aware |

Initial project list:
- Surge (P0 — most mature)
- NuvoraOS (P0)
- Placeholder slot for future project (P2 — hidden until populated)

Grid behavior:
- 1 column mobile, 2 columns tablet, 3 columns desktop
- Card hover: subtle elevation + border highlight
- Click opens project detail view

Empty state: Section renders "Projects coming soon" with CTA to contact.

#### Project Detail View (P0 / P1 hybrid)

**P0: Modal overlay** — Opens on card click. Shows full description, full tech stack, role, outcome, links, and gallery. Closes via X button, Escape key, or backdrop click. URL updates for shareability.

**P1: Dedicated page** — `/projects/[slug]` with full case study content. SEO-friendly URLs, unique metadata per project. Breadcrumb: Home → Projects → [Project Name].

#### About (P0)

One paragraph (2–3 sentences) articulating:
- "I build software that lasts — focused on reliability, performance, and meaningful impact over flashy trends."
- Engineering philosophy: production thinking, system-level design, ownership.
- Optional second sentence on what drives you (building, solving, shipping).
- Optional CTA linking to contact section.

Layout: Single column on mobile, two columns optional on desktop.

#### Skills (P0)

Technical competencies grouped by category:

| Category | Skills |
|----------|--------|
| Frontend | Next.js, TypeScript, Tailwind CSS, React |
| Backend | Node.js, Python, Go, PostgreSQL, Redis |
| AI/ML | LangChain, Vector DBs, LLM Ops, RAG |
| Infrastructure | Vercel, AWS, Docker, CI/CD |
| Product | System Design, API Design, Product Engineering |

- Categories clearly delineated (headings, dividers, or background shifts)
- Skills render alphabetically within each category
- Empty category → hidden entirely
- Empty skills section → section hidden or shows minimal placeholder

#### Contact (P0)

Two methods, both always visible:

| Method | Detail |
|--------|--------|
| Email link | `mailto:` link displayed alongside form |
| Inline form | 3 fields: Name (required), Email (required, validated), Message (required, 10-2000 chars) |

Form behavior:
- Real-time validation on blur
- Submit button disabled until all fields valid
- Submit → loading state (spinner, fields disabled) → success (thank-you message + response promise) → error (inline message with fallback)
- Invisible honeypot for bot detection (no CAPTCHA)
- Rate limit: 1 submission per 60 seconds per IP
- Character counter on message field
- No-JS fallback: static email address visible

Success state: Replace form with thank-you message including "I'll respond within 48 hours" promise and "Send another" link.

#### Footer (P0)

- Social links: GitHub, LinkedIn, Twitter/X (open new tab, `rel="noopener noreferrer"`)
- Copyright: "© [year] Shashwat Sinha. Built with care."
- Sticks to bottom of viewport on short-content screens
- Year dynamically generated

#### Navigation (P0)

- Fixed/sticky top nav, full-width
- Elements: monogram/logo, section links (Projects, Skills, Contact), optional theme toggle (P1)
- Transparent at top → blurred glass background after scroll threshold
- Active section highlighted via Intersection Observer
- Mobile: hamburger icon → slide-in drawer from right, 80vw max width, backdrop overlay, scroll lock
- Touch targets ≥ 44px
- No-JS fallback: native anchor links work

### 4.3 Data Model

#### Project

```
{
  id: string;               // Unique identifier
  title: string;            // "Surge"
  subtitle: string;         // One-line description
  description: string;      // 2–3 sentences, full detail
  role: string;             // "Founding Engineer"
  techStack: string[];      // ["Next.js", "Python", "PostgreSQL"]
  outcome: string;          // "Reduced API latency by 40%"
  links: {
    live?: string;          // URL to deployed app
    github?: string;        // URL to source
    caseStudy?: string;     // Optional external write-up
  };
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;         // 16:9 ratio
  };
  gallery?: {               // P1 — additional detail view images
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  featured: boolean;        // Show in featured grid
  order: number;            // Sort order
  visible: boolean;         // Show or hide (for placeholder slots)
  draft?: boolean;          // If true, exclude from sitemap, noindex
}
```

#### SkillCategory

```
{
  name: string;             // "Frontend"
  skills: string[];         // ["Next.js", "TypeScript", ...]
}
```

#### ContactFormData

```
{
  name: string;             // 2–100 chars
  email: string;            // Valid email format
  message: string;          // 10–2000 chars
  _honeypot?: string;       // Hidden field, must be empty
}
```

#### SiteConfig

```
{
  name: string;             // "Shashwat Sinha"
  title: string;            // "Software Engineer"
  tagline: string;          // Primary positioning line
  email: string;            // Contact email address
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
```

---

## 5. Feature Specifications

### P0 — Must Have (Launch Blockers)

| # | Feature | Acceptance Criteria |
|---|---------|-------------------|
| F01 | **Hero Section** | Occupies 100vh with mobile chrome offset. Name + tagline render immediately (no JS waterfall). Scroll-down indicator visible until 80% scroll threshold. Responsive typography without overflow at any viewport width. |
| F02 | **Projects Grid** | 1/2/3 columns at mobile/tablet/desktop. Card truncated at 3 lines description + 3 tech tags visible (+N overflow). Empty state: "Projects coming soon" with contact CTA. Keyboard navigable. Images have explicit dimensions preventing CLS. |
| F03 | **Project Detail Modal** | Opens on card click. Closes via X, Escape, backdrop click. Body scroll locked when open. URL updates for shareability. Focus trapped inside modal. Empty project list → modal never triggers. |
| F04 | **About Section** | Readable at all breakpoints. Links use smooth-scroll anchors. No client JS required for rendering. |
| F05 | **Skills Section** | Categories clearly delineated. Skills alphabetical within categories. Zero skills in category → hidden. Zero skills total → section hidden. |
| F06 | **Contact Form** | Name (non-empty), email (valid format), message (10-2000 chars). Submit disabled until valid. Loading spinner on submit. Success → thank-you with 48hr promise + "Send another" link. Error → inline message with email fallback. Honeypot silently accepted. Rate limited (1/60s per IP). Character counter. No-JS fallback: static email. Mobile: 16px font-size (no zoom), auto-capitalize off for email. |
| F07 | **Navigation** | Sticky top, transparent → blurred on scroll. Active section highlight via Intersection Observer. Mobile: slide-in drawer, 80vw max, backdrop, scroll lock, 44px touch targets. No-JS fallback: native anchor links. |
| F08 | **Footer** | Sticks to bottom. Social links open new tab with rel="noopener noreferrer". Dynamic copyright year. |
| F09 | **Analytics** | Privacy-first, no cookies (Plausible/Umami/Vercel Analytics). Tracks page views, referrer, device type. Script loads async, non-blocking. Fails silently. Respects Do Not Track. Ad blockers handled gracefully. |
| F10 | **SEO Foundation** | Unique title + description per page. Open Graph tags (og:title, description, image, url). Twitter Card tags. JSON-LD Person schema on homepage. Canonical URLs. auto-generated sitemap.xml. robots.txt allowing all crawlers with sitemap reference. Custom 404 page. Missing images → text-only share preview. Missing alt text → automated fallback. |
| F11 | **Performance Foundation** | All images have explicit width/height. LCP image loads eagerly with priority. Non-LCP images lazy-loaded. No render-blocking client JS. Lighthouse scores: 95+ Performance, 100 Accessibility, 100 Best Practices, 90+ SEO. |

### P1 — Should Have (Launch + First Iteration)

| # | Feature | Acceptance Criteria |
|---|---------|-------------------|
| F12 | **Project Detail Pages** | Human-readable URLs (/projects/surge). generateMetadata per project. Missing slug → 404. Gallery images lazy with blur placeholder. Breadcrumb: Home → Projects → [Name]. |
| F13 | **Scroll-Reveal Animations** | translateY(20px) + opacity fade over 400-600ms. 100ms stagger between siblings. Respects prefers-reduced-motion. No layout shift. Disabled on low-power mobile if causing jank. |
| F14 | **Theme Toggle (Dark/Light)** | Defaults to system preference. Toggle persists in localStorage. No flash of wrong theme (inline script). All components respond to theme tokens. No-JS fallback: system preference applies. |
| F15 | **Enhanced Loading States** | Skeleton loaders match aspect ratio and layout exactly. Subtle pulse animation. Seamless replacement on content load. |
| F16 | **Floating Contact Pill** | Fixed-position "Get in touch" pill at bottom-right on mobile. Appears on scroll past hero. Taps/touch → scrolls to contact section. |

### P2 — Nice to Have (Post-Launch)

| # | Feature | When Viable | Benefit |
|---|---------|-------------|---------|
| F17 | **Project filtering by tech/category** | 6+ projects | Faster discovery for content-heavy state |
| F18 | **Command palette (Cmd+K)** | 4+ sections + 4+ projects | Power-user navigation |
| F19 | **Micro-interactions** (button press effects, subtle cursor follower) | After P0/P1 stable | Delight — respects prefers-reduced-motion |
| F20 | **Keybaord shortcuts** (j/k for nav, n for next section) | After P0/P1 stable | Power-user efficiency |
| F21 | **Analytics dashboard** (owner-facing) | Traffic > 1k/mo | Traffic insights |

---

## 6. Experience & Interaction Design

### 6.1 First 7 Seconds

| Second | Event | User Sees |
|--------|-------|-----------|
| 0–0.6 | Page load (< 600ms) | Fast paint of hero content |
| 0.6–2 | Initial scan | Name → Title → Tagline → scroll indicator |
| 2–4 | Scroll to projects | Project cards with titles + thumbnails |
| 4–7 | Project assessment | Tech stack, outcome, role — scan complete |

### 6.2 Scanning Paths

**Desktop (F-pattern, premium-minimalist):**
```
Name → Tagline → Project Cards → Outcomes → About headline → Skills categories → Contact form
```

**Mobile (single column, thumb-zone optimized):**
```
Name → Tagline → Project List → About → Skills → Contact → Floating "Get in touch" pill
```

### 6.3 Interaction Specifications

| Element | Behavior | Timing |
|---------|----------|--------|
| Project card hover | Scale(1.02) + shadow elevation | 150–200ms ease-out |
| Link hover | Color change only (no underline unless focus) | 150ms |
| Button hover | Background or border shift | 150ms |
| Section entrance | Fade-up on scroll into view (once, no repeat) | 400–600ms |
| Theme toggle | Instant switch, no transition delay | 0ms |
| Mobile menu | Slide-in from right | 250ms ease-out |
| Form submit button | Spinner on loading → checkmark on success | Per request |
| Scroll behavior | Native smooth scroll (CSS or scrollIntoView) | Browser default |
| Nav background | Transparent → blurred glass after scroll threshold | 200ms transition |

### 6.4 Navigation Behaviors

- Sticky top nav: 64px height (shrinks to 48px on scroll)
- Nav background: transparent at page top → `bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md` after threshold
- Active section: dot indicator or color highlight
- Mobile drawer: full-height, right-aligned, with scrim overlay
- Keybaord: Escape closes modal/mobile menu. Tab navigates interactive elements in logical order.

### 6.5 Conversion Flow

```
User sees project → Wants to reach out → Scrolls to contact (or taps floating pill)
→ Sees form + email side by side → Fills name/email/message
→ Submits → Loading state → Success confirmation: "Thanks! I'll respond within 48 hours"
→ Alternative: Clicks email link → Opens native mail client
```

### 6.6 Exit Points

| Exit Point | Behavior |
|------------|----------|
| Footer social links | Opens new tab |
| Project external links (live, github) | Opens new tab |
| Browser back button | Expected browser behavior |
| Success confirmation | Delay before showing "Send another" link |
| Link clicks from search results | Opens new tab (external referrers) |

---

## 7. Edge Cases & Error Handling

### 7.1 Loading States

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Hero / About / Skills | Static content | Renders immediately. No loading state needed. |
| Projects (images) | Image loading | Placeholder with exact aspect ratio prevents CLS. Blur placeholder or solid color fallback. |
| Project detail (modal) | Content loading | Skeleton matching card layout. Fallback "Details unavailable" on failure. |
| Contact form | Submit in progress | Button spinner. All fields disabled. |
| Analytics script | Script loading / failing | Loaded async. Fails silently. No user-facing impact. |
| Project detail page (P1) | ISR generating | Stale content served during revalidation. |

### 7.2 Empty States

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Projects | 0 projects | "Projects coming soon" with contact CTA |
| Projects | Filter returns 0 (P2) | "No projects match your filter" with reset button |
| Skills | 0 total | Section hidden entirely |
| Skills | 0 in category | Category heading hidden |
| Project detail | Missing project data | 404 or "Project not found" with redirect to projects |
| Gallery | 0 images | Gallery section hidden |
| Footer | 0 social links | Social section hidden; copyright only |

### 7.3 Error States

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Contact form | Network failure | Inline error: "Could not send message. Please try again or email [email]" |
| Contact form | Server validation error | Field-specific error shown below relevant field |
| Contact form | Rate limited | "Too many requests. Please wait 60 seconds." |
| Contact form | Server 500 | "Something went wrong. Please email me directly." with mailto link |
| Images | Load failure | Graceful fallback with project initials or generic icon |
| Analytics | Script blocked | Fails silently. No console errors. |
| Navigation | IntersectionObserver unavailable | Highlight by click only. Anchor links still work. |
| Theme (P1) | localStorage full/unavailable | Default to system preference. Toggle works in-session. |
| Theme (P1) | Flash of wrong theme | Inline critical script prevents flash. |

### 7.4 Boundary Conditions

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Project title | 60+ characters | Ellipsis after 2 lines (line-clamp-2). Full title in detail view. |
| Project description | 300+ characters on card | Truncated at 3 lines (line-clamp-3). Full in detail view. |
| Tech stack | 8+ tags | Show first 3, "+5 more" badge. All in detail view. |
| Project count | 10+ | Grid wraps properly. No pagination (P2). |
| Skill name | Very long | Wraps gracefully without breaking layout. |
| Skills per category | 20+ | Grid wraps; consider scroll within category. |
| Message | 2000+ characters | Character counter prevents exceeding. Server validates max. |
| Name | 100+ characters | Frontend limits at 100 chars. Server validates. |
| Special characters | XSS attempt | Server sanitizes all inputs. No HTML rendering. |
| URL slugs | Duplicate titles | Generate unique slug at build time. |

### 7.5 Mobile Edge Cases

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Hero | 375px viewport | Fluid type with clamp(). No overflow. |
| Hero | Notch / Dynamic Island | Respects safe-area-inset. |
| Navigation | Hamburger menu | Slide-in drawer. Backdrop. Scroll lock. |
| Navigation | Touch targets | Minimum 44×44px. |
| Navigation | iOS Safari bottom bar | Respects safe-area-inset-bottom. |
| Contact form | iOS input focus | 16px font size prevents auto-zoom. |
| Contact form | Email field | type="email" keyboard. auto-capitalize off. |
| Project cards | Hover | No hover equivalent. Tap state (:active) provides feedback. |
| Scroll animations (P1) | Low-end mobile | Disabled on low-power devices (frame rate sampling). |

### 7.6 Browser / Environment Edge Cases

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Any | JavaScript disabled | All core content renders (SSR/SSG). Form shows static email. Nav anchor links work. |
| Any | Old browser (no CSS Grid) | Single-column fallback via feature queries. |
| Analytics | Cookies blocked | Works without cookies (privacy-first provider). |
| Analytics | Ad blocker | No data collected. No console errors. |
| Images | loading="lazy" unsupported | Falls back to eager loading (acceptable). |
| Any | Print stylesheet | All content visible. Interactive elements hidden. |

### 7.7 SEO Edge Cases

| Feature | Scenario | Behavior |
|---------|----------|----------|
| Homepage | No meta description | Use site-wide default description. |
| Project page | No description | Use excerpt or fallback to site default. |
| Project page | No image | Text-only share preview. Fallback to site OG image. |
| Image | No alt text | Auto-fallback to project name. Build-time warning. |
| Sitemap | Project is draft | Excluded from sitemap. noindex meta tag. |
| Canonical | Duplicate URLs | Canonical points to clean version. |
| 404 | Missing page | Custom 404 with link to home. |
| Robots | Staging environment | noindex, nofollow + robots.txt disallow. |

---

## 8. Non-Functional Requirements

### 8.1 Performance Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 1.5s |
| FID (First Input Delay) | < 50ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| TTFB (Time to First Byte) | < 200ms |
| FCP (First Contentful Paint) | < 1.0s |
| Total JS bundle | < 100 KB gzipped |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | ≥ 90 |

### 8.2 Accessibility (WCAG 2.1 AA)

| Requirement | Specification |
|-------------|--------------|
| Keyboard navigation | All interactive elements focusable. Logical tab order. |
| Screen reader support | Semantic HTML. ARIA labels where needed. Proper heading hierarchy (h1 → h2 → h3, no jumps). |
| Focus indicators | Visible focus ring on all interactive elements. Never removed via CSS. |
| Skip-to-content | Skip navigation link visible on first tab. |
| Color contrast | Text ≥ 4.5:1. Large text ≥ 3:1. |
| Form labels | All inputs have associated `<label>` elements. |
| Error announcements | Form errors use aria-live="polite". |
| Modal focus trap | Focus locked inside modal when open. Returned to trigger element on close. |
| prefers-reduced-motion | All animations disabled. Transitions set to 0ms. |
| Images | Alt text on all images. |
| Touch targets | ≥ 44px on interactive elements. |

### 8.3 Responsive Design

| Breakpoint | Target |
|------------|--------|
| 375px | Mobile (iPhone SE) |
| 768px | Tablet |
| 1024px | Small desktop |
| 1440px | Large desktop |
| > 1440px | Max-width container (1280px max) |

Mobile-first methodology: all layouts built from min-width up.

### 8.4 Browser Support

- Evergreen browsers: Chrome, Firefox, Safari, Edge (last 2 major versions)
- No IE11 support

### 8.5 Security

| Concern | Requirement |
|---------|-------------|
| Contact form spam | Rate limiting (IP-based, 1 req/60s) + hidden honeypot field |
| XSS | Server-side input sanitization (strip HTML tags) |
| Email injection | Validate email format server-side. Never pass raw input to mail transport. |
| API abuse | CORS restricted to own domain. Rate limiting. Request size limits. |
| External links | All open in new tab with `rel="noopener noreferrer"` |
| Secrets | No secrets in client bundle. Environment variables for API keys. |
| CSP | Content Security Policy headers implemented. |

---

## 9. Future Considerations

The following are explicitly deferred beyond the initial launch:

| Item | Rationale | Trigger for Reconsideration |
|------|-----------|---------------------------|
| Blog / writing section | Dilutes positioning; adds content management overhead | Explicit request or content threshold reached |
| Resume / CV download | Contact form is the conversion goal | Recruiter demand signals |
| Photo / headshot | Let the work speak | Brand evolution decision |
| Case study pages | Can link externally for now | When external links feel insufficient |
| Multi-language / i18n | No current need | Traffic from non-English-speaking regions |
| CMS integration | Static data is sufficient | When content update frequency exceeds comfort with code changes |
| Newsletter signup | Premature | Traffic > 1k/mo + content pipeline |
| Search functionality | Unnecessary for single-page site | Content grows beyond current scope |
| Contact form attachments | Adds complexity (storage, scanning, size limits) | Explicit need from recruiter conversations |
| Project analytics dashboard | Owner-only insight | Traffic > 1k/mo |
| Page transitions | No route changes on single page | If architecture shifts to multi-page |
