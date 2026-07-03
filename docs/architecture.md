# Digital Experience Architecture

**Project:** Portfolio — Shashwat Sinha
**Owner:** Shashwat Sinha
**Status:** Final Draft
**Date:** 2026-07-04

---

## 1. Design Token System

### 1.1 Color Palette (Default Dark Theme)

```
--color-bg:           #0a0a0b       (page background)
--color-surface:      #141416       (card/section surface)
--color-surface-hover:#1a1a1e       (card hover)
--color-border:       #1e1e22       (subtle borders)
--color-border-hover: #2a2a30       (border on hover)

--color-text-primary:   #f4f4f5     (headings / body)
--color-text-secondary: #a1a1aa     (meta, subtitles, captions)
--color-text-tertiary:  #52525b     (placeholders, disabled)
--color-text-inverse:   #0a0a0b     (on accent)

--color-accent:        #6366f1      (indigo-500 — links, highlights, focus rings)
--color-accent-hover:  #818cf8      (indigo-400)
--color-accent-subtle: rgba(99,102,241,0.08)  (tag/chip background)

--color-success:       #22c55e      (form success)
--color-error:         #ef4444      (form error)
--color-warning:       #f59e0b      (rate limit warning)

--backdrop-glass:      rgba(10,10,11,0.80)
```

### 1.2 Light Theme Overrides (P1)

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

### 1.3 Typography Scale

Font family stack: `Inter` (variable, wght 400–700), system sans-serif fallback.
Monospace: `JetBrains Mono` (variable, wght 400–500), system monospace fallback.

```css
/* Base size: 16px */
--font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:  'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

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

--font-normal:   400
--font-medium:   500
--font-semibold: 600
--font-bold:     700

--tracking-tight:  -0.025em
--tracking-normal: 0em
--tracking-wide:   0.025em
```

### 1.4 Spacing Scale

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

### 1.5 Border Radii

```
--radius-sm:    4px
--radius-md:    6px
--radius-lg:    8px
--radius-xl:    12px
--radius-2xl:   16px
--radius-full:  9999px
```

### 1.6 Shadows

Dark theme (subtle, no large shadows):
```
--shadow-sm:    0 1px 2px rgba(0,0,0,0.3)
--shadow-md:    0 2px 8px rgba(0,0,0,0.35)
--shadow-lg:    0 4px 16px rgba(0,0,0,0.4)
--shadow-xl:    0 8px 32px rgba(0,0,0,0.5)
--shadow-glow:  0 0 0 2px rgba(99,102,241,0.3)
```

Light theme (P1):
```
--shadow-sm:    0 1px 2px rgba(0,0,0,0.04)
--shadow-md:    0 2px 8px rgba(0,0,0,0.06)
--shadow-lg:    0 4px 16px rgba(0,0,0,0.08)
--shadow-xl:    0 8px 32px rgba(0,0,0,0.12)
```

### 1.7 Transitions

```
--transition-fast:    150ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-base:    200ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-slow:    300ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-enter:   400ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-exit:    200ms cubic-bezier(0.4, 0, 0.2, 1)
```

Easing explanation: `cubic-bezier(0.16, 1, 0.3, 1)` is a custom ease-out — snappy start, smooth deceleration. Used for all entrance and micro-interactions. Exit uses standard ease-out for predictable disappearance.

### 1.8 Breakpoints

```
--bp-sm:   640px   (mobile landscape / large phone)
--bp-md:   768px   (tablet portrait)
--bp-lg:   1024px  (tablet landscape / small desktop)
--bp-xl:   1280px  (standard desktop)
--bp-2xl:  1440px  (large desktop)
```

Container max-width: 1280px, centered with `mx-auto`, horizontal padding `--space-6` (mobile) → `--space-12` (desktop).

---

## 2. Component Tree

```
app/
└── layout.tsx                          [Server + Client]
    ├── <SkipToContent>                 [Server]
    ├── <Navigation>                    [Client]
    │   ├── <Logo>/<Monogram>           [Server]
    │   ├── <NavLinks>                  [Client]
    │   │   └── <NavLink> × N           [Server]
    │   ├── <ThemeToggle> (P1)          [Client]
    │   └── <MobileNav>                 [Client]
    │       ├── <MobileNavOverlay>      [Server]
    │       └── <MobileNavDrawer>       [Server]
    │           └── <NavLink> × N       [Server]
    └── <Footer>                        [Server]
        ├── <FooterSocial>              [Server]
        │   └── <SocialLink> × N        [Server]
        ├── <FooterCopyright>           [Server]
        └── <ScrollToTop>              [Client]

app/
└── page.tsx                            [Server]
    ├── <Hero>                          [Server]
    │   ├── <HeroName>                  [Server]
    │   ├── <HeroTagline>               [Server]
    │   ├── <HeroCTA>                   [Server]
    │   └── <ScrollIndicator>           [Client] (fade on scroll)
    ├── <About>                         [Server]
    ├── <ProjectsSection>               [Server]
    │   ├── <SectionHeading>            [Server]
    │   ├── <ProjectGrid>               [Server]
    │   │   └── <ProjectCard> × N       [Server]
    │   │       ├── <ProjectThumbnail>  [Server]
    │   │       ├── <ProjectInfo>       [Server]
    │   │       ├── <TechTags>          [Server]
    │   │       │   └── <TagPill> × N   [Server]
    │   │       ├── <ProjectLinks>      [Server]
    │   │       └── <ProjectOutcome>    [Server]
    │   ├── <ProjectsEmpty>             [Server]
    │   └── <ProjectModal>              [Client]
    │       ├── <ModalOverlay>          [Server]
    │       ├── <ModalContent>          [Server]
    │       │   ├── <ModalClose>        [Client]
    │       │   ├── <ProjectDetail>     [Server]
    │       │   ├── <Gallery>           [Client]
    │       │   └── <ProjectLinks>      [Server]
    │       └── <ModalFocusTrap>        [Client]
    ├── <SkillsSection>                 [Server]
    │   ├── <SectionHeading>            [Server]
    │   ├── <SkillsGrid>                [Server]
    │   │   └── <SkillCategory> × N     [Server]
    │   │       ├── <SkillCategoryName> [Server]
    │   │       └── <SkillChip> × N     [Server]
    │   └── <SkillsEmpty>               [Server]
    ├── <ContactSection>                [Server]
    │   ├── <SectionHeading>            [Server]
    │   ├── <ContactForm>               [Client]
    │   │   ├── <FloatLabelInput>       [Client] × 2 (name, email)
    │   │   ├── <FloatLabelTextarea>    [Client] (message)
    │   │   ├── <HoneypotField>         [Client]
    │   │   ├── <CharCounter>           [Client]
    │   │   ├── <SubmitButton>          [Client]
    │   │   └── <FormStatus>            [Client]
    │   │       ├── <LoadingState>      [Server]
    │   │       ├── <SuccessState>      [Server]
    │   │       └── <ErrorState>        [Server]
    │   └── <ContactEmail>              [Server]

app/
└── not-found.tsx                       [Server]

app/
└── projects/[slug]/
    └── page.tsx (P1)                   [Server]
        ├── <ProjectBreadcrumb>         [Server]
        └── <ProjectDetailPage>         [Server]

components/shared/
├── <ScrollReveal> (P1)                 [Client]  (wrapper, IntersectionObserver)
├── <FloatingContactPill> (P1)          [Client]  (mobile, fixed position)
└── <Analytics>                         [Client]  (script loader)
```

### 2.1 Server vs Client Boundary

| Component | Type | Why |
|-----------|------|-----|
| `Hero`, `About`, `SkillsSection`, `Footer` | Server | Purely static, no state, no events |
| `ProjectCard`, `TagPill`, `SkillChip` | Server | No interactivity (hover done via CSS) |
| `Navigation` | Client | Scroll listener, IntersectionObserver, mobile toggle |
| `ProjectModal` | Client | Open/close state, scroll lock, focus trap |
| `ContactForm` | Client | Form state, validation, async submission |
| `ScrollIndicator` | Client | Needs scroll position to fade |
| `ScrollReveal` (P1) | Client | IntersectionObserver for entrance animations |
| `ThemeToggle` (P1) | Client | localStorage access, system preference media query |
| `FloatingContactPill` (P1) | Client | Scroll position to show/hide |
| `Analytics` | Client | Script injection only in browser |

---

## 3. Layout Architecture

### 3.1 Root Layout

```html
<html lang="en" class="dark">
  <head>
    <!-- Theme critical script (P1): apply theme before paint -->
    <script>/* inline theme detection */</script>
  </head>
  <body class="bg-[--color-bg] text-[--color-text-primary] font-sans antialiased">
    <SkipToContent />
    <Navigation />
    <main id="main-content">
      {children}
    </main>
    <Footer />
  </body>
</html>
```

### 3.2 Page Layout Composition

```
┌─────────────────────────────────────────┐
│  <Navigation />                         │  ← fixed top, z-50
├─────────────────────────────────────────┤
│                                         │
│  <Hero />                    min-h-screen│
│                                         │
│  <About />                               │
│                                         │
│  <ProjectsSection />                     │
│                                         │
│  <SkillsSection />                       │
│                                         │
│  <ContactSection />                      │
│                                         │
├─────────────────────────────────────────┤
│  <Footer />                              │
└─────────────────────────────────────────┘
```

### 3.3 Grid System

Tailwind-based utility grid. No custom grid abstraction.

**Projects Grid:**
```
Mobile:  grid-cols-1     (375px+)
Tablet:  grid-cols-2     (768px+)
Desktop: grid-cols-3     (1024px+)    — per product spec
Gap:     gap-6 (mobile) → gap-8 (desktop)
```

**Skills Grid:**
```
Mobile:  grid-cols-2     (375px+)
Desktop: grid-cols-3     (768px+)
Gap:     gap-4
```

### 3.4 Responsive Breakpoints Strategy

Mobile-first. Breakpoints match Tailwind defaults:

| Tailwind Class | Min-Width | Applies To |
|----------------|-----------|------------|
| `sm:` | 640px | Large phones, landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small desktops |
| `xl:` | 1280px | Standard desktops |

**Container:** `max-w-7xl mx-auto px-6 lg:px-12`

**Section Spacing:** `py-16 md:py-20 lg:py-24` (vertical padding per section)

**Safe Areas:** `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` applied to fixed elements:

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

## 4. Interaction & Motion System

### 4.1 Transition Specs

| Interaction | CSS | Duration | Easing |
|------------|-----|----------|--------|
| Card hover lift | `transform`, `box-shadow` | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Link hover | `color` | 150ms | `ease-out` |
| Button hover | `background-color`, `border-color` | 150ms | `ease-out` |
| Button active/press | `transform: scale(0.97)` | 100ms | `ease-out` |
| Focus ring | `box-shadow` (inset glow) | 150ms | `ease-out` |
| Nav background transition | `background-color`, `backdrop-filter` | 200ms | `ease-out` |
| Mobile drawer enter | `translate-x` | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Mobile drawer exit | `translate-x` | 200ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Modal enter | `opacity` + `scale(0.95→1)` | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Modal exit | `opacity` + `scale(1→0.95)` | 150ms | `ease-out` |
| Scroll-reveal (P1) | `opacity` + `translateY(20→0)` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Theme toggle | N/A (instant) | 0ms | N/A |
| Form submit button → spinner | `opacity` crossfade | 200ms | `ease-out` |
| Form success checkmark | `opacity` + `scale(0→1)` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

### 4.2 Hover States

```
Project Card:
  default:  shadow-md, border border-[--color-border]
  hover:    transform: translateY(-2px), shadow-lg, border-[--color-border-hover]
  CSS:      transition: all var(--transition-base)

Link:
  default:  color: var(--color-text-secondary)
  hover:    color: var(--color-accent)
  focus:    outline: none, box-shadow: var(--shadow-glow)
  CSS:      transition: color var(--transition-fast)

Button (Primary):
  default:  bg-[--color-accent] text-white
  hover:    bg-[--color-accent-hover]
  active:   transform: scale(0.97)
  disabled: opacity: 0.5, cursor: not-allowed
  CSS:      transition: background-color var(--transition-fast), transform 100ms

TagPill:
  default:  bg-[--color-accent-subtle] text-[--color-accent]
  hover:    bg-[--color-accent] text-white
  CSS:      transition: all var(--transition-fast)
```

### 4.3 Focus States

All interactive elements must have a visible focus ring:

```css
/* Tailwind: focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-accent), 0 0 0 4px var(--color-bg);
}
```

Never use `outline: none` without a focus-visible replacement.

### 4.4 Page / Scroll Behavior

- Native smooth scroll: `scroll-behavior: smooth` on `<html>` (CSS, no JS)
- No parallax, no scroll-jacking, no Locomotive Scroll
- No page transitions / route transitions (single page)
- Scroll-triggered nav background change: IntersectionObserver-based, threshold ~80px from top

---

## 5. Typography System

### 5.1 Heading Hierarchy

```
h1 (Hero name):      text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
h2 (Section title):  text-3xl md:text-4xl font-semibold tracking-tight
h3 (Card title):     text-xl font-semibold tracking-tight
h4 (Category head):  text-sm font-semibold uppercase tracking-wide text-[--color-text-secondary]
```

### 5.2 Body Text

```
Body:       text-base leading-relaxed text-[--color-text-primary]
Body large: text-lg leading-relaxed
Caption:    text-sm text-[--color-text-secondary]
Meta:       text-xs text-[--color-text-tertiary] uppercase tracking-wide
```

### 5.3 Monospace

```
Code inline:  font-mono text-sm bg-[--color-surface] px-1.5 py-0.5 rounded-[--radius-sm]
Code block:   font-mono text-sm leading-relaxed bg-[--color-surface] p-4 rounded-[--radius-lg]
              (P1 — used in project detail for technical context)
```

### 5.4 Font Loading Strategy

Inter variable font: self-hosted via next/font, `display: swap`, `preload: true`.
JetBrains Mono variable font: self-hosted via next/font, `display: swap`, `preload: false` (lazy, only used in project detail).

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false, // only used in project detail
})
```

---

## 6. Navigation System

### 6.1 Desktop Navigation

```
┌──────────────────────────────────────────────────────┐
│  [SS]    Projects    Skills    Contact    [theme]     │  ← 64px height
│  (logo)  (links→)                         (P1 toggle) │
└──────────────────────────────────────────────────────┘
```

- Height: `h-16` (64px) at top → `h-12` (48px) after scroll (via CSS class toggle)
- Background: `transparent` at top → `backdrop-blur-xl bg-[--backdrop-glass] border-b border-[--color-border]` after scroll threshold
- Logo: text-based monogram "SS" in `font-bold text-lg`
- Nav links: `text-sm font-medium text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors`
- Active indicator: color change only (text → primary), no underline, no dot
- Layout: `flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-12`
- z-index: `z-50`

### 6.2 Mobile Navigation

```
┌──────────────────────────────────────────────────────┐
│  [SS]                                          [☰]   │  ← hamburger visible < md
└──────────────────────────────────────────────────────┘
```

- Hamburger button: 44×44px minimum touch target, `aria-label="Open navigation"`, `aria-expanded`
- Drawer: right-aligned, `w-[80vw] max-w-sm`, full-height, `bg-[--color-surface] border-l border-[--color-border]`
- Backdrop: `bg-black/60`, `z-40`, click to close
- Drawer content: nav links stacked vertically, `text-lg font-medium`, `py-4` each
- Close button: X icon top-right, 44×44px
- Escape key closes drawer
- `aria-hidden="true"` on drawer when closed
- Body scroll lock via `overflow: hidden` on `<body>` when open
- `inert` attribute on main content when drawer open (P1)

### 6.3 Scroll-Triggered Behaviors

| Behavior | Implementation |
|----------|---------------|
| Nav background | IntersectionObserver on a 1px sentinel element at top. `isAtTop → false` triggers `bg-[--backdrop-glass] backdrop-blur-xl border-b` |
| Active section | IntersectionObserver on each section. `rootMargin: '-50% 0px -50% 0px'` to activate when section is roughly centered |
| Scroll indicator (hero) | IntersectionObserver on an element at 80vh. Once visible → fade out scroll indicator |
| Floating contact pill (P1) | IntersectionObserver on contact section. Once intersecting → hide pill. Otherwise show after hero scroll-past |

### 6.4 NavLink Component

```typescript
// Props: href (string), label (string), isActive (boolean)
// Renders: <a href="#section"> with smooth-scroll behavior
// Behavior: onClick → e.preventDefault() → document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
// Active: class applied when IntersectionObserver marks this section as current
// Keyboard: Enter/Space triggers click
// Aria: aria-current="section" when active
```

---

## 7. Component Specifications

### 7.1 `<Hero />` — Server Component

**Anatomy:**
```
<section id="hero" class="min-h-screen flex flex-col justify-center relative">
  <div class="max-w-7xl mx-auto px-6 lg:px-12 w-full">
    <p class="text-sm text-[--color-accent] font-medium mb-4">Shashwat Sinha</p>       // or: inline above h1
    <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Shashwat Sinha</h1>
    <p class="text-xl md:text-2xl text-[--color-text-secondary] mt-4 max-w-2xl">
      Software Engineer
    </p>
    <p class="text-lg text-[--color-text-tertiary] mt-2 max-w-xl">
      Building scalable software systems and AI-powered products
    </p>
    <div class="flex gap-4 mt-8">
      <a href="#projects" class="...">View Projects</a>
      <a href="#contact" class="...">Get in Touch</a>
    </div>
  </div>
  <ScrollIndicator />
</section>
```

**States:**
- Default: renders full viewport hero
- Loading: N/A (server component, no async)
- Error: N/A

**Responsive:**
- Font sizes scale via responsive utility classes
- CTA buttons stack vertically on very narrow screens (<400px)
- Hero maintains 100vh minimum

**Accessibility:**
- `<h1>` is the page's single h1
- Skip-to-content bypasses hero
- CTA links are native `<a href="#section">` (no JS required)

### 7.2 `<ScrollIndicator />` — Client Component

**Anatomy:**
```
<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500">
  <div class="w-6 h-10 rounded-full border-2 border-[--color-text-tertiary] relative">
    <div class="w-1 h-3 bg-[--color-text-tertiary] rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce" />
  </div>
</div>
```

**States:**
- Default: visible
- After 80% scroll: opacity 0, pointer-events none
- prefers-reduced-motion: mouse-wheel icon (static, no bounce animation)

**Implementation:**
- IntersectionObserver on a sentinel element at 80vh
- When sentinel intersects → hide

### 7.3 `<ProjectCard />` — Server Component

**Anatomy:**
```
<article class="group relative bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] overflow-hidden
              transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg hover:border-[--color-border-hover] cursor-pointer">
  <ProjectThumbnail src={thumb.src} alt={thumb.alt} width={thumb.width} height={thumb.height} />
  <div class="p-5 space-y-3">
    <h3 class="text-xl font-semibold">{title}</h3>
    <p class="text-sm text-[--color-text-secondary] line-clamp-3">{description}</p>
    <p class="text-xs text-[--color-text-tertiary]">{role}</p>
    <TechTags tags={techStack} maxVisible={3} />
    <p class="text-sm text-[--color-accent] font-medium">{outcome}</p>
  </div>
</article>
```

**States:**
| State | Behavior |
|-------|----------|
| Default | Surface bg, border, md shadow |
| Hover | translateY(-2px), shadow-lg, border-lighten |
| Active (click) | scale(0.98), 100ms |
| Focus-visible | Focus ring on card (keyboard) |
| Empty image | Gradient placeholder with project initials |
| Long title | `line-clamp-2` |
| Long description | `line-clamp-3` |

**Responsive:**
- Grid child (column count varies by breakpoint)
- Thumbnail: 16:9 ratio, `aspect-video`, responsive via `<Image>` fill

**Accessibility:**
- `<article>` with `<h3>` heading
- `tabIndex={0}`, `role="button"`, `onKeyDown` (Enter/Space → open modal)
- `aria-label="View details for {title}"`
- `<Image>` with descriptive alt text

### 7.4 `<TechTags />` — Server Component

**Anatomy:**
```
<div class="flex flex-wrap gap-2">
  {tags.slice(0, maxVisible).map(tag => <TagPill key={tag} name={tag} />)}
  {tags.length > maxVisible && (
    <span class="text-xs text-[--color-text-tertiary] px-2 py-1">+{tags.length - maxVisible} more</span>
  )}
</div>
```

**States:**
- 0 tags: component returns null
- Overflow: +N badge
- Long tag name: wraps naturally, no truncation

**Accessibility:**
- `<span>` elements, no interactive role needed
- Individual tags not focusable

### 7.5 `<TagPill />` — Server Component

**Anatomy:**
```
<span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-[--radius-full]
             bg-[--color-accent-subtle] text-[--color-accent]
             transition-colors duration-150">
  {name}
</span>
```

**States:**
- Default: subtle accent background
- On parent hover: accent bg + white text (inherited via `group-hover`)
- Long text: wraps, pill height adjusts

### 7.6 `<ProjectModal />` — Client Component

**Anatomy:**
```
<!-- Portaled to document.body via createPortal -->
<div role="dialog" aria-modal="true" aria-label={project.title} class="fixed inset-0 z-50">
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />       <!-- backdrop -->
  <div class="fixed inset-0 flex items-center justify-center p-4">
    <div class="bg-[--color-surface] rounded-[--radius-2xl] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl">
      <button onClick={close} aria-label="Close modal" class="...">✕</button>
      <ProjectDetail project={project} />
    </div>
  </div>
</div>
```

**States:**
| State | Behavior |
|-------|----------|
| Closed | Not rendered |
| Opening | Opacity 0→1, scale 0.95→1 (250ms) |
| Open | Body scroll locked, focus trapped |
| Closing | Opacity 1→0, scale 1→0.95 (150ms) |
| Empty content | "Project details unavailable" fallback |

**Keyboard:**
- Escape → close
- Tab → cycles within modal (focus trap)
- Shift+Tab → reverse cycle
- On close: focus returns to triggering ProjectCard

**URL:**
- On open: `window.history.pushState(null, '', `/projects/${slug}`)`
- On close: `window.history.pushState(null, '', '/')`
- PopState event (back button) → close modal

**Accessibility:**
- `role="dialog"`, `aria-modal="true"`, `aria-label`
- Focus trap: on mount, focus first focusable element
- On close, return focus to trigger element (stored in ref)
- Body scroll lock: `overflow: hidden` on `document.body`
- `inert` on main content (P1)

### 7.7 `<ContactForm />` — Client Component

**Anatomy:**
```
<form onSubmit={handleSubmit} novalidate class="space-y-6">
  <div style="display:none" aria-hidden="true">
    <input name="_honeypot" tabIndex={-1} autoComplete="off" />       // invisible
  </div>
  <FloatLabelInput
    name="name"
    label="Name"
    type="text"
    autoComplete="name"
    required
    minLength={2}
    maxLength={100}
  />
  <FloatLabelInput
    name="email"
    label="Email"
    type="email"
    autoComplete="email"
    required
  />
  <FloatLabelTextarea
    name="message"
    label="Message"
    required
    minLength={10}
    maxLength={2000}
    rows={4}
  >
    <CharCounter current={message.length} max={2000} />
  </FloatLabelTextarea>
  <SubmitButton
    disabled={!isValid || isSubmitting}
    loading={isSubmitting}
    success={isSuccess}
    error={error}
  >
    {isSuccess ? '✓ Sent' : isSubmitting ? <Spinner /> : 'Send Message'}
  </SubmitButton>
</form>
```

**States:**
| State | Behavior |
|-------|----------|
| Default | Empty fields, submit disabled |
| Filling | Float labels animate above values |
| Field valid | Green checkmark (optional, subtle) |
| Field error (on blur) | Red border + error message below field |
| Submitting | Button shows spinner, all fields disabled |
| Success | Form replaced with success message + "Send another" link |
| Network error | Inline error with email fallback |
| Rate limited | "Please wait 60 seconds" message |
| Honeypot filled | Silently accept, don't submit |
| JS disabled | `<noscript>` shows static mailto link |

**Float Label Pattern:**
```css
/* Label floats above input when value exists or input is focused */
label: {
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  transition: all 150ms ease-out;
  color: var(--color-text-tertiary);
}
input:focus + label,
input:not(:placeholder-shown) + label {
  top: 0;
  transform: translateY(0);
  font-size: 0.75rem;
  color: var(--color-accent);
}
```

**Validation Rules:**
```
name:     required, 2 ≤ length ≤ 100
email:    required, valid email regex
message:  required, 10 ≤ length ≤ 2000
```

**Accessibility:**
- All inputs have `<label>` with `htmlFor`
- Error messages: `<p id="error-{name}" role="alert" aria-live="polite">`
- Inputs: `aria-describedby={errorId}` when error present
- `aria-invalid={!!error}` on invalid fields
- Submit button: `aria-busy={isSubmitting}` during submission

### 7.8 `<FloatLabelInput />` — Client Component

**Anatomy:**
```
<div class="relative">
  <input
    id={name}
    name={name}
    type={type}
    placeholder=" "    // required for float-label CSS
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
    autoComplete={autoComplete}
    aria-invalid={!!error}
    aria-describedby={error ? `${name}-error` : undefined}
    class="peer w-full h-14 px-4 pt-6 pb-2 bg-[--color-surface] border border-[--color-border]
           rounded-[--radius-lg] text-base text-[--color-text-primary]
           focus:outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]
           transition-colors duration-150
           disabled:opacity-50 disabled:cursor-not-allowed"
  />
  <label
    htmlFor={name}
    class="absolute left-4 top-4 text-sm text-[--color-text-tertiary]
           peer-focus:text-xs peer-focus:top-2
           peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:top-2
           transition-all duration-150"
  >
    {label}
  </label>
  {error && (
    <p id={`${name}-error`} role="alert" aria-live="polite" class="text-xs text-[--color-error] mt-1">
      {error}
    </p>
  )}
</div>
```

### 7.9 `<Navigation />` — Client Component

**Internal State:**
```typescript
const [isAtTop, setIsAtTop] = useState(true)
const [activeSection, setActiveSection] = useState('hero')
const [isMobileOpen, setIsMobileOpen] = useState(false)
```

**IntersectionObserver Setup:**
```typescript
useEffect(() => {
  const sentinel = document.getElementById('nav-sentinel')
  const sentinelObserver = new IntersectionObserver(
    ([entry]) => setIsAtTop(entry.isIntersecting),
    { threshold: 0 }
  )
  if (sentinel) sentinelObserver.observe(sentinel)

  const sections = document.querySelectorAll('section[id]')
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )
  sections.forEach(s => sectionObserver.observe(s))

  return () => {
    sentinelObserver.disconnect()
    sectionObserver.disconnect()
  }
}, [])
```

**States:**
| State | Nav Background | Active Link |
|-------|---------------|-------------|
| At top | Transparent | Current section highlighted |
| Scrolled | `bg-[--backdrop-glass] backdrop-blur-xl border-b` | Current section highlighted |
| Mobile drawer open | Backdrop + drawer | Same active logic |

### 7.10 `<Footer />` — Server Component

**Anatomy:**
```
<footer class="border-t border-[--color-border] mt-auto">
  <div class="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <SocialLink href={github} label="GitHub" />
      <SocialLink href={linkedin} label="LinkedIn" />
      <SocialLink href={twitter} label="Twitter/X" />
    </div>
    <p class="text-sm text-[--color-text-tertiary]">
      &copy; {new Date().getFullYear()} Shashwat Sinha. Built with care.
    </p>
    <ScrollToTop />
  </div>
</footer>
```

**States:**
| State | Behavior |
|-------|----------|
| 0 social links | Social section hidden, copyright only |
| Default | Border-t separates from content, sticks to bottom |
| Short page | Footer sticks to bottom via `mt-auto` (flex column layout) |

### 7.11 `<ScrollToTop />` — Client Component

**Anatomy:**
```
<button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  aria-label="Scroll to top"
  class="text-sm text-[--color-text-tertiary] hover:text-[--color-accent] transition-colors"
>
  ↑ Back to top
</button>
```

**Visibility:** Always visible in footer. No threshold needed — footer is the terminal section.

### 7.12 `<SkillsSection />` — Server Component

**Anatomy:**
```
<section id="skills" class="py-16 md:py-20 lg:py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-12">
    <h2 class="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Skills</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      {categories.filter(c => c.skills.length > 0).map(category => (
        <SkillCategory key={category.name} category={category} />
      ))}
    </div>
  </div>
</section>
```

**Empty States:**
- 0 categories: entire section returns null
- Category with 0 skills: filtered out in map

### 7.13 `<SkillCategory />` — Server Component

```
<div>
  <h4 class="text-sm font-semibold uppercase tracking-wide text-[--color-text-secondary] mb-3">
    {category.name}
  </h4>
  <div class="flex flex-wrap gap-2">
    {category.skills.sort().map(skill => (
      <span key={skill} class="text-sm text-[--color-text-primary] bg-[--color-surface] border border-[--color-border]
                               px-3 py-1 rounded-[--radius-full] transition-colors duration-150
                               hover:border-[--color-accent] hover:text-[--color-accent]">
        {skill}
      </span>
    ))}
  </div>
</div>
```

### 7.14 `<FloatingContactPill />` (P1) — Client Component

**Anatomy:**
```
<button
  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
  class="fixed bottom-6 right-6 z-40 bg-[--color-accent] text-white px-5 py-3 rounded-full
         shadow-lg text-sm font-medium transition-all duration-200
         hover:bg-[--color-accent-hover] active:scale-95"
  aria-label="Get in touch"
>
  Get in touch
</button>
```

**Visibility:**
- Hidden until hero section is scrolled past (IntersectionObserver)
- Hidden when contact section is in view
- Hidden on desktop (`lg:hidden`)
- Respects safe-area-inset-bottom

### 7.15 `<ScrollReveal />` (P1) — Client Component

**Anatomy:**
```
// Wrapper component
'use client'
export function ScrollReveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

**States:**
- Hidden: opacity 0, translateY(20px)
- Visible: opacity 1, translateY(0)
- prefers-reduced-motion: always visible, no transform/opacity transition

**Stagger Usage:**
```
<ScrollReveal delay={index * 100}>  // 100ms stagger between siblings
```

### 7.16 `<Analytics />` — Client Component

```
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Analytics({ provider = 'plausible', domain, src }) {
  const pathname = usePathname()

  useEffect(() => {
    // Load analytics script (async, non-blocking)
    if (provider === 'plausible') {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.dataset.domain = domain
      script.onerror = () => {}  // silent fail
      document.head.appendChild(script)
    }
  }, [])

  // Track page views on route change
  useEffect(() => {
    // provider-specific pageview tracking
  }, [pathname])

  return null
}
```

---

## 8. Animation / Transition Catalog

| # | Animation | Trigger | Element | CSS Property | Duration | Easing | Purpose |
|---|-----------|---------|---------|-------------|----------|--------|---------|
| A01 | Card hover lift | Mouse hover | ProjectCard | `transform`, `box-shadow` | 200ms | ease-out | Affordance — indicates interactivity |
| A02 | Card press | Mouse down | ProjectCard | `transform: scale(0.98)` | 100ms | ease-out | Tactile feedback |
| A03 | Link color shift | Hover/focus | `<a>`, `<button>` | `color` | 150ms | ease-out | Indicates clickability |
| A04 | Button bg shift | Hover | Primary button | `background-color` | 150ms | ease-out | Indicates clickability |
| A05 | Button press | Active | Button | `transform: scale(0.97)` | 100ms | ease-out | Tactile feedback |
| A06 | Focus ring | `:focus-visible` | All interactive | `box-shadow` | 150ms | ease-out | Keyboard navigation indicator |
| A07 | Nav background | Scroll past threshold | `<nav>` | `background-color`, `backdrop-filter` | 200ms | ease-out | Visual hierarchy on scroll |
| A08 | Nav height shrink | Scroll past threshold | `<nav>` | `height` | 200ms | ease-out | Space efficiency |
| A09 | Mobile drawer enter | Hamburger click | Drawer | `transform: translateX(100%→0)` | 250ms | ease-out | Smooth panel reveal |
| A10 | Mobile drawer exit | Close action | Drawer | `transform: translateX(0→100%)` | 200ms | ease-out | Smooth panel hide |
| A11 | Mobile backdrop fade | Drawer open | Backdrop | `opacity` | 200ms | ease-out | Context dimming |
| A12 | Modal enter | Card click | Modal overlay + content | `opacity`, `transform: scale(0.95→1)` | 250ms | ease-out | Smooth reveal |
| A13 | Modal exit | Close action | Modal | `opacity`, `transform: scale(1→0.95)` | 150ms | ease-out | Smooth dismiss |
| A14 | Scroll indicator bounce | Page load (continuous) | Scroll mouse icon | `transform: translateY` | 1.5s | ease-in-out | Draws attention to scroll affordance |
| A15 | Scroll indicator fade | Past 80% scroll | Indicator wrapper | `opacity` | 500ms | ease-out | Removes visual noise |
| A16 | Scroll reveal (P1) | Element enters viewport | Sections, cards | `opacity`, `translateY(20→0)` | 500ms | ease-out | Polished entrance |
| A17 | Form submit → spinner | Submit click | Button content | `opacity` crossfade | 200ms | ease-out | Feedback |
| A18 | Success checkmark | Submission success | Checkmark icon | `opacity`, `transform: scale(0→1)` | 300ms | ease-out | Delight, confirmation |
| A19 | Form replace with success | After successful submit | Form container | `opacity`, `height` | 300ms | ease-out | Transition to done state |
| A20 | TagPill hover (group) | Parent card hover | TagPill within card | `background-color`, `color` | 150ms | ease-out | Polish on card interaction |
| A21 | Skill hover | Hover on skill chip | Skill chip | `border-color`, `color` | 150ms | ease-out | Subtle interactivity |
| A22 | Float label | Input focus/value | `<label>` | `top`, `font-size`, `color` | 150ms | ease-out | UX pattern for form clarity |
| A23 | Floating pill appear (P1) | Scroll past hero | Contact pill | `opacity`, `transform` | 200ms | ease-out | Progressive disclosure |

**Motion Respect for Accessibility:**
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

---

## 9. Implementation Notes

### 9.1 Tailwind Configuration

Extend the default Tailwind theme with the token system:

```typescript
// tailwind.config.ts
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

### 9.2 Data Layer

All content in static TypeScript files under `data/`:

```
data/site.ts       — name, title, tagline, email, social links, metadata
data/about.ts      — bio paragraph(s)
data/projects.ts   — Project[] (typed)
data/skills.ts     — SkillCategory[] (typed)
```

No database, no CMS, no API for content. Data imported directly by server components.

### 9.3 CSS Architecture

- Tailwind utilities for 95% of styling
- `globals.css` for: CSS custom properties (tokens), `prefers-reduced-motion`, focus-visible styles, safe-area-inset utilities, print styles
- No CSS modules, no styled-components, no CSS-in-JS runtime
- No Framer Motion, no GSAP, no animation libraries

### 9.4 Performance Checklist

- [ ] All images: Next.js `<Image>` with explicit width/height
- [ ] LCP image (hero thumbnail if any): `priority`, `loading="eager"`
- [ ] Non-LCP images: `loading="lazy"`
- [ ] Fonts: `next/font` with `display: swap`
- [ ] Client components minimized: only Navigation, ContactForm, ProjectModal, ScrollReveal, ThemeToggle, FloatingPill, Analytics
- [ ] No render-blocking scripts
- [ ] Bundle analysis via `@next/bundle-analyzer` on build

### 9.5 File Structure

```
app/
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── globals.css
└── api/contact/route.ts

components/
├── sections/
│   ├── hero.tsx
│   ├── about.tsx
│   ├── projects-section.tsx
│   ├── skills-section.tsx
│   └── contact-section.tsx
├── ui/
│   ├── project-card.tsx
│   ├── tag-pill.tsx
│   ├── tech-tags.tsx
│   ├── skill-category.tsx
│   ├── contact-form.tsx
│   ├── float-label-input.tsx
│   ├── float-label-textarea.tsx
│   ├── submit-button.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── scroll-indicator.tsx
│   └── project-modal.tsx
└── shared/
    ├── scroll-reveal.tsx     (P1)
    ├── theme-toggle.tsx       (P1)
    ├── floating-contact-pill.tsx (P1)
    └── analytics.tsx

data/
├── site.ts
├── about.ts
├── projects.ts
└── skills.ts

public/
└── projects/    (project thumbnails and gallery images)
```
