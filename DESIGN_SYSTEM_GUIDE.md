---
version: "1.0.0"
---

# Design System Guide

Optional companion to `AGENT_BLUEPRINT.md`. Copy into any project that has visual UI and reference from `AGENTS.md`. This file gives agents a concrete, testable design operating system — tokens, rules, interaction specs, and component baselines — so interface decisions stay consistent across sessions and contributors. Skip this file for CLI tools, libraries, and backend services.

---

## 1. Discovery Workflow

Before building UI, establish direction. Ask these questions:

1. **What type of product is this?** — dashboard, admin tool, consumer app, analytics platform, marketing site, etc.
2. **Who are the primary users?** — power users, casual users, internal teams, general public.
3. **Should the UI feel compact and technical, or spacious and approachable?**
4. **Any brand or mood words to lean into?** — e.g. clinical, playful, editorial, utilitarian.

### State decisions before building

Once direction is confirmed, state the concrete choices you will apply:

- Preset (or custom direction)
- Palette overrides
- Depth strategy
- Spacing base
- Typography families
- Radius scale

Document testable values, not subjective language:

- Good: "Button height is 36px"
- Good: "Use `--accent: blue-600`"
- Avoid: "Buttons should feel balanced"
- Avoid: "Use modern spacing"

### Save the system

Save the resolved design system so it loads automatically in future sessions:

- File location: `.interface-design/system.md`
- This is the single source of truth for tokens, patterns, and decisions
- See section 9 for the full template

---

## 2. Aesthetic Presets

Six starting points. Each defines a complete token set. Choose one, then override individual values to fit the project. These are baselines, not dogma.

### Precision & Density

- **Identity:** A control room for focused operators — every pixel earns its place.
- **Palette:** Primary `slate-900`, Accent `blue-600`, Background `white`, Surface `slate-50`, Text `slate-900`
- **Typography:** Headings: system sans-serif. Body: system sans-serif. Mono: `IBM Plex Mono`. Scale base: 13px.
- **Depth:** borders-only
- **Radius:** sharp — `2px, 4px, 6px`
- **Best for:** dev tools, admin dashboards, data-entry interfaces

### Warmth & Approachability

- **Identity:** A well-lit workspace that invites exploration — generous, calm, human.
- **Palette:** Primary `stone-800`, Accent `amber-500`, Background `orange-50`, Surface `white`, Text `stone-900`
- **Typography:** Headings: `Inter`. Body: `Inter`. Mono: `Fira Code`. Scale base: 16px.
- **Depth:** subtle-shadows — `0 1px 3px rgba(0,0,0,0.08)`
- **Radius:** soft — `8px, 12px, 16px`
- **Best for:** collaborative apps, consumer products, onboarding flows

### Sophistication & Trust

- **Identity:** A private advisory firm — measured confidence, deliberate restraint.
- **Palette:** Primary `slate-800`, Accent `indigo-500`, Background `slate-50`, Surface `white`, Text `slate-900`
- **Typography:** Headings: `Inter`. Body: system sans-serif. Mono: `JetBrains Mono`. Scale base: 14px.
- **Depth:** layered-shadows — `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`
- **Radius:** medium — `6px, 8px, 12px`
- **Best for:** finance, enterprise B2B, healthcare portals

### Boldness & Clarity

- **Identity:** High signal, zero noise — contrast is the primary design tool.
- **Palette:** Primary `gray-950`, Accent `emerald-500`, Background `white`, Surface `gray-50`, Text `gray-950`
- **Typography:** Headings: `Space Grotesk`. Body: system sans-serif. Mono: `Space Mono`. Scale base: 14px.
- **Depth:** borders-only — `1px solid` with high-contrast border color
- **Radius:** sharp — `4px, 6px, 8px`
- **Best for:** modern data dashboards, monitoring tools, status pages

### Utility & Function

- **Identity:** GitHub's quiet cousin — muted, dense, gets out of the way.
- **Palette:** Primary `gray-700`, Accent `blue-500`, Background `gray-50`, Surface `white`, Text `gray-800`
- **Typography:** Headings: system sans-serif. Body: system sans-serif. Mono: system monospace. Scale base: 14px.
- **Depth:** borders-only — `1px solid` with muted border color
- **Radius:** minimal — `4px, 6px, 8px`
- **Best for:** developer tools, internal platforms, GitHub-style utilities

### Data & Analysis

- **Identity:** Numbers are the hero — everything else recedes to support legibility.
- **Palette:** Primary `zinc-800`, Accent `cyan-500`, Background `zinc-950`, Surface `zinc-900`, Text `zinc-100`
- **Typography:** Headings: `Inter`. Body: `Inter`. Mono: `IBM Plex Mono`. Scale base: 13px.
- **Depth:** subtle-shadows on dark — `0 1px 4px rgba(0,0,0,0.3)`
- **Radius:** sharp — `2px, 4px, 6px`
- **Best for:** analytics dashboards, BI tools, real-time monitoring

---

## 3. Universal Design Rules

These rules hold across ALL presets. They are what keep output consistent and professional.

### Spacing system

- Define a base unit (typically `4px` or `8px`).
- Derive all spacing from multiples of the base: e.g. `4, 8, 12, 16, 24, 32, 48, 64`.
- Never use arbitrary values like `13px` or `27px` — stay on the grid.
- Use consistent spacing tokens throughout: padding, margin, gap.

### Color roles

Define colors by semantic role, not raw value. Every project needs at minimum:

| Role | Purpose |
|------|---------|
| `foreground` | Primary text |
| `secondary` | Supporting text, labels |
| `muted` | Disabled text, placeholders |
| `faint` | Borders, dividers, subtle backgrounds |
| `accent` | Primary action color, links, active states |
| `destructive` | Error states, delete actions |
| `success` | Confirmation, positive states |

Map these roles to concrete values from your chosen preset. Reference roles in code, not raw colors.

### Depth consistency

Pick ONE depth strategy and apply it everywhere:

- **borders-only** — all elevation communicated through border weight and color
- **subtle-shadows** — single-layer, low-opacity box-shadow
- **layered-shadows** — multi-layer shadows for richer depth

Never mix strategies within the same project. A card with a border and a modal with a shadow is drift.

### Typography hierarchy

- Maximum 2 font families (1 sans + 1 mono is common).
- Define a type scale and stick to it: e.g. `12, 13, 14, 16, 18, 24, 32`.
- Limit weight usage to 3 values: regular (`400`), medium (`500`), semibold (`600`).
- Headings use one consistent family and weight pattern throughout.

### Radius consistency

- Define a single radius scale (e.g. `4px, 6px, 8px` or `8px, 12px, 16px`).
- Apply the scale predictably: small for inputs/buttons, medium for cards, large for modals/sheets.
- Never mix sharp and rounded within the same system.

### Responsive behavior

- Define breakpoints and stick to them (e.g. `640px, 768px, 1024px, 1280px`).
- Stacking rules: multi-column layouts collapse to single-column at mobile breakpoints.
- Font scaling: heading sizes reduce at smaller breakpoints, body stays consistent.
- Touch targets: minimum 44px on mobile regardless of desktop sizing.

---

## 4. Interaction & Motion

Interaction design is a first-class concern, not an afterthought. Define these behaviors project-wide and apply them consistently. Describe behaviors, not library-specific implementations.

### Micro-interactions

Define default states for all interactive elements:

| State | Behavior | Typical values |
|-------|----------|----------------|
| **Hover** | Subtle lift or emphasis | `scale(1.02)` or `translateY(-1px)`, background shift |
| **Focus** | Visible ring or outline | `2px solid accent`, `2px offset` |
| **Active/pressed** | Compression feedback | `scale(0.98)`, darker background |
| **Disabled** | Reduced opacity, no pointer | `opacity: 0.5`, `cursor: not-allowed` |

Buttons, links, cards, and form inputs should all follow the same interaction language.

### Transitions

- **Default duration:** `150ms` for color/opacity, `200ms` for transforms.
- **Default easing:** `ease-out` for entrances, `ease-in-out` for state changes.
- **What animates:** color, background-color, opacity, transform, box-shadow.
- **What snaps (no transition):** visibility, display, z-index, layout reflows.

### Scroll-driven patterns

Define which scroll behaviors the project uses, if any:

- **Reveal-on-scroll:** Elements fade/slide into view as they enter the viewport.
- **Sticky elements:** Header, sidebar, or toolbar pinning behavior.
- **Parallax:** Background layers move at different rates (use sparingly).
- **Scroll progress:** Progress bars or indicators tied to scroll position.

State which patterns are in use and their parameters. If none, state "no scroll-driven animations."

### Loading states

Pick ONE loading pattern and use it everywhere:

- **Skeleton screens** — gray placeholder shapes matching content layout
- **Spinner** — centered loading indicator
- **Shimmer** — animated gradient sweep over placeholder shapes

Mixing loading patterns within one project is drift.

---

## 5. Component Patterns

Baseline specs for common components. Projects customize from here. Every pattern defines dimensions, spacing, color roles, states, and transition behavior.

### Button Primary

- Height: `36px`
- Padding: `8px 16px`
- Radius: per scale (small)
- Font: `14px`, weight `500`
- Background: `accent`
- Text: white or contrast color
- States: hover (`accent` darkened 10%), active (`scale(0.98)`), disabled (`opacity: 0.5`), focus (`2px ring`)
- Transition: `background 150ms ease-out, transform 100ms ease-out`

### Button Secondary

- Same dimensions as primary
- Background: transparent
- Border: `1px solid faint`
- Text: `foreground`
- States: hover (background `faint`), active (`scale(0.98)`), disabled (`opacity: 0.5`), focus (`2px ring`)

### Input

- Height: `36px`
- Padding: `8px 12px`
- Radius: per scale (small)
- Font: `14px`, weight `400`
- Border: `1px solid faint`
- Background: `surface`
- States: hover (border `secondary`), focus (border `accent`, `2px ring`), error (border `destructive`), disabled (`opacity: 0.5`, background `faint`)
- Placeholder color: `muted`

### Card

- Border: `1px solid faint` (or shadow per depth strategy)
- Padding: `16px` (or `24px` for spacious presets)
- Radius: per scale (medium)
- Background: `surface`

### Navigation (top bar)

- Height: `48px` – `56px`
- Background: `background` with optional `backdrop-blur` when scrolled
- Border-bottom: `1px solid faint`
- Items: `14px`, weight `500`, color `secondary`, active color `foreground`
- Item spacing: `24px` gap

### Modal / Dialog

- Max width: `480px` (small), `640px` (medium), `800px` (large)
- Padding: `24px`
- Radius: per scale (large)
- Background: `surface`
- Overlay: `rgba(0,0,0,0.4)` or `rgba(0,0,0,0.6)` for dark themes
- Entrance: `opacity 0→1` + `translateY(8px)→0` over `200ms ease-out`
- Exit: `opacity 1→0` over `150ms ease-in`

### Status Indicator

- Dot size: `8px`
- Colors: `success` (operational), `amber-500` (warning), `destructive` (error), `muted` (unknown)
- Optional: pulsing animation for active/live states (`opacity 1→0.4` loop, `1.5s ease-in-out`)
- Label: `12px` mono, color `secondary`

### Data Table Row

- Row height: `40px` – `48px`
- Cell padding: `8px 12px`
- Font: `13px` – `14px`, weight `400`
- Border-bottom: `1px solid faint`
- Hover: background `faint`
- Selected: background `accent/10%` (10% opacity accent)
- Header row: font weight `600`, background `surface`

---

## 6. Accessibility Baseline

Non-negotiable minimums for all UI projects.

- **Contrast:** WCAG AA minimum — `4.5:1` for normal text, `3:1` for large text (18px+ or 14px+ bold).
- **Focus indicators:** Every interactive element must have a visible focus state. Never remove outline without replacing it.
- **Touch targets:** Minimum `44px × 44px` on touch devices. Padding counts toward the target.
- **Motion:** Respect `prefers-reduced-motion`. When enabled, disable all non-essential animation and transition — keep only functional transitions (e.g. modal open/close).
- **Semantic structure:** Use heading hierarchy (`h1`→`h6`) in order. Use landmark elements (`nav`, `main`, `aside`, `footer`).
- **Color independence:** Never communicate meaning through color alone. Pair with icons, text, or patterns.

---

## 7. Anti-Drift & Audit

### Common drift patterns

Watch for these — they accumulate fast:

- Spacing values not on the base grid (`13px`, `27px`, `15px` padding)
- Slightly different button heights across screens
- Mixed depth strategies (borders here, shadows there)
- Inconsistent radius values across similar components
- Color values hardcoded instead of using role tokens
- Multiple loading patterns in the same project
- Hover behavior that differs between similar interactive elements
- Typography weights outside the defined set

### Before building a new component

Verify against the system:

1. Does a similar pattern already exist? Extend it instead of creating new.
2. Are spacing values on the grid?
3. Are colors referenced by role, not raw value?
4. Are all interactive states defined (hover, focus, active, disabled)?
5. Does the radius match the scale for this component size?
6. Is the depth treatment consistent with the rest of the project?

### Decision log

When you override or extend the system, log it:

| Decision | Rationale | Date |
|----------|-----------|------|
| Example: Increased card padding to 24px | Content-heavy cards needed breathing room | YYYY-MM-DD |

---

## 8. Template

Save this to `.interface-design/system.md` as the project's single source of truth.

````markdown
# Design System

## Preset & Direction

**Base preset:** [Precision & Density | Warmth & Approachability | Sophistication & Trust | Boldness & Clarity | Utility & Function | Data & Analysis | Custom]

**Identity:** [1-sentence description of the project's visual character]

## Tokens

### Palette
```
--foreground:   [value]
--secondary:    [value]
--muted:        [value]
--faint:        [value]
--accent:       [value]
--destructive:  [value]
--success:      [value]
--background:   [value]
--surface:      [value]
```

### Spacing
Base: [4px | 8px]
Scale: [list values]

### Typography
Heading family: [family]
Body family: [family]
Mono family: [family]
Scale: [list values]
Weights: [400, 500, 600]

### Radius
Scale: [list values]
Strategy: [sharp | medium | soft]

### Depth
Strategy: [borders-only | subtle-shadows | layered-shadows]
Value: [concrete CSS value if shadows]

## Motion

Default transition: [duration] [easing]
Loading pattern: [skeleton | spinner | shimmer]
Scroll behavior: [none | reveal-on-scroll | sticky-header | etc.]
Reduced motion: respect `prefers-reduced-motion`

## Component Overrides

[Document any deviations from the baseline component patterns here]

## Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| | | |
````

---

## 9. Philosophy

- **Decisions compound.** A single spacing value becomes a system. A system becomes a language.
- **Consistency beats perfection.** Coherence across an interface outperforms scattered "correct" values.
- **Concrete beats subjective.** "36px height, 14px font, 500 weight" is implementable. "Buttons should feel balanced" is not.
- **Memory enables iteration.** Log decisions to evolve the system intentionally, not accidentally.
- **Constraint enables speed.** A well-defined system means fewer choices per component, not more.
