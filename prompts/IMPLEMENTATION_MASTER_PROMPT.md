# ALGOFINEX — IMPLEMENTATION MASTER PROMPT

You are implementing the AlgoFinex website from an existing React codebase.

## Mission

Build a premium, original financial product website for AlgoFinex.

The design references are:
1. https://necessary-expectations-836515.framer.app/
2. https://www.onepercentclub.io/

React component source:
https://github.com/DavidHDev/react-bits

IMPORTANT:
Do not clone the references.
Do not reproduce their source code, assets, copy, or exact layouts.
Study their design principles and create an original AlgoFinex implementation.

---

# BEFORE CODING

Use Chrome DevTools to inspect both reference sites.

Record:
- viewport dimensions
- container widths
- spacing
- typography hierarchy
- image behavior
- section heights
- responsive behavior
- scroll interactions
- sticky behavior
- transition patterns
- hover behavior

Create:
REFERENCE_ANALYSIS.md

Compare your observations against the project's existing DESIGN_DIRECTION.md.

Do not start by generating the entire website.

---

# PHASE 1 — HERO ONLY

Implement the AlgoFinex hero first.

Requirements:

1. It must establish the visual identity.
2. It must feature the AlgoFinex product/interface.
3. It must not look like either reference copied into a new color.
4. It must use original product visualization.
5. Motion must be restrained and purposeful.
6. Desktop and mobile must both be considered.

Do not build the remaining landing page until the hero is visually coherent.

---

# REACT BITS

Inspect the React Bits repository and select components only when they fit.

Potential use cases:
- text reveal
- subtle scroll reveal
- refined button interaction
- micro-interactions
- controlled background effects

Never use a component simply because it looks impressive in isolation.

Customize all selected components to AlgoFinex.

---

# VISUAL ASSETS

If a visual cannot be built cleanly with CSS/SVG/React, request/create an original asset.

Do not use:
- generic stock trading images
- random AI trader portraits
- cryptocurrency stock photos
- copied reference assets

Product visuals should preferably be implemented as real React/SVG UI so they remain responsive and interactive.

---

# PRODUCT UI

Create an original demo trading interface.

It may contain:
- chart
- market structure
- signal markers
- indicator state
- timeframe
- symbol
- contextual metrics

Use clearly fictional/demo data.

Never imply fabricated numbers are real AlgoFinex performance.

---

# CODE QUALITY

Use:
- React
- TypeScript
- existing project conventions where reasonable
- Tailwind if already installed
- Framer Motion if appropriate
- React Bits selectively

Do not introduce a large dependency for a trivial animation.

Keep:
- components reusable
- demo data isolated
- animation logic understandable
- responsive styles maintainable

---

# VISUAL QA

After implementation:

1. Run the application.
2. Inspect at desktop width.
3. Inspect at mobile width.
4. Check overflow.
5. Check animation smoothness.
6. Check typography.
7. Check CTA visibility.
8. Check accessibility.
9. Check reduced-motion behavior.

Use Chrome DevTools for the final visual inspection.

---

# DO NOT

Do not:
- build a generic dark SaaS template
- use excessive gradients
- use neon trading aesthetics
- add floating 3D objects everywhere
- add particles just to make the page look “AI”
- create repeated card grids
- fake testimonials
- fake performance statistics
- claim guaranteed profits
- copy the reference site's visual assets
- copy exact animation sequences
- finish 15 sections before validating the hero

---

# DEFINITION OF DONE FOR PHASE 1

The hero should make a reviewer think:

“This is a serious trading product with its own visual identity.”

Not:

“This looks like a Framer template.”

Not:

“This looks AI-generated.”

Not:

“This is a copy of FinanceX.”

Not:

“This is a generic crypto website.”

Once the hero passes that test, proceed section-by-section.
