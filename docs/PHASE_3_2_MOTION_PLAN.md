# ALGOFINEX — PHASE 3.2 MOTION PLAN
**Prepared by:** Jules (Implementation Engineer)
**Date:** October 2026
**Document Version:** 1.0.0
**Status:** APPROVED MOTION STRATEGY
**Core Motion Principle:** *MOTION AS PRODUCT STORYTELLING (Not Decoration)*
**Visual System Lock:** LIGHT-MODE FIRST (`#F8F8F6`, `#FFFFFF`, `#EDF2F7`, `#F4F2EC`, `#1D4ED8` Cobalt)
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Core Motion Philosophy

In AlgoFinex, motion is an analytical lens and narrative device. Every animation must answer:
> *"What does this motion help the user understand about market structure or the 7-step trading routine?"*

### What We Do:
- **Transformation**: Demonstrating how raw price action transforms into structured clarity.
- **Progressive Revelation**: Revealing layers (`RAW` → `STRUCTURE` → `LIQUIDITY` → `TREND` → `CONFIRMATION`) upon interaction.
- **Spatial Continuity**: Linking the 7-stage workflow execution pipeline down the page using scroll-driven trace lines (`useScroll`, `useTransform`).
- **Tactile Feedback**: Spring layout indicators (`layoutId`) on active tabs and sequence rails.

### What We Avoid:
- ❌ Random floating or bouncing elements
- ❌ Particle effects, neon glow, or dark crypto aesthetics
- ❌ Cinematic 3D card flips or excessive parallax
- ❌ Motion that delays user interaction or chart scrubbing
- ❌ Decorative animation on every text block

---

## 2. Targeted Scenes & Choreography Map

| Scene | Motion Trigger | Animation Choreography & Visual Behavior |
| :--- | :--- | :--- |
| **01. Hero Workstation** | Viewport Mount | Staggered entrance: Eyebrow Badge (`0.05s`) → Display Headline (`0.10s`) → Copy (`0.18s`) → Deliverable Badge (`0.22s`) → CTAs (`0.26s`) → Product Terminal (`0.32s`). |
| **02. Product Reveal** | Stage Selection | `AnimatePresence` layer reveals: SVG overlays fade and reveal into position as lenses shift (`RAW` → `CONFIRMATION`). |
| **03. Market Understanding** | Scroll Viewport | Staggered `whileInView` reveals (`y: 16px → 0px`) and spring layout indicators on active tab switcher. |
| **04. Methodology** | Layer Hover/Click | Focus layer highlighting on the central blueprint canvas (`#EDF2F7`). Active layer stays prominent while inactive recede. |
| **05. Principles Manifesto** | Scroll Viewport | Staggered `whileInView` opacity reveals (`delay: idx * 0.08s`) across unboxed manifesto blocks (`01`–`04`). |
| **06. Workflow Bridge** | Scroll Distance | Scroll-linked execution conduit trace line drawing (`useScroll`, `useTransform`) linking stages 01 through 07. |
| **07. 3-Day Session** | Tab Interaction | Editorial page-turn spring transitions (`layoutId="activeDayRail"`) on warm paper timeline tabs (`DAY 01`–`DAY 03`). |
| **08. Prototype Pricing** | Frequency Toggle | Smooth price number count-up transitions (`CountUp.tsx`) and plan selection highlight. |
| **09. Editorial FAQ** | Click / Accordion | Smooth height and opacity layout transitions (`AnimatePresence`). |
| **10. Closing CTA** | Viewport Mount | Restrained brand glyph reticle pulse and headline entrance (*"Read the market differently."*). |

---

## 3. Accessibility & Reduced-Motion Strategy

- **Mandatory Fallback**: All animations adhere to `@media (prefers-reduced-motion: reduce)` rules configured in `src/index.css`.
- **Reduced Motion Behavior**:
  - Transforms (`translateY`, `scale`, `pathLength`) fall back to instant `opacity: 1`.
  - Scroll-linked trace lines stay 100% visible immediately without scroll animation.
  - Interactive touch scrubbing and chart coordinate inspection remain fully functional.
