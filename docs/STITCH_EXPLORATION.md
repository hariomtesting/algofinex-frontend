# ALGOFINEX — STITCH COMPOSITION EXPLORATIONS
**Prepared by:** Jules (Implementation Engineer)
**Date:** October 2026
**Document Version:** 1.0.0
**Status:** COMPONENT & SCENE COMPOSITION AUDIT
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Executive Summary

This document evaluates composition concepts explored via visual benchmarking tools (Stitch / Framer reference audits) against AlgoFinex's light-mode design system (`#F8F8F6`, `#FFFFFF`, `#EDF2F7`, `#F4F2EC`, `#1D4ED8`).

---

## 2. Scene-by-Scene Composition Evaluations

### Scene 01: Asymmetric Poster Hero
- **Concept Explored**: Left 5-column editorial typography + Right 7-column oversized tilted workstation.
- **Useful Idea**: Asymmetric scale contrast between monumental headlines (*"Cut through chart noise."*) and precise monospace metadata.
- **Rejected Idea**: 3D perspective tilt (`rotateX(8deg) rotateY(-6deg)`).
- **Reason for Rejection**: 3D tilt made candlestick wicks look distorted and reduced chart coordinate readability. Retained 2D flat, crisp white workstation surface instead.

### Scene 02: Dominant Unboxed Workstation (Product Reveal)
- **Concept Explored**: Full-viewport 1400px workstation canvas with floating lens filter pills.
- **Useful Idea**: Direct SVG math coordinate pins (`HH 67,400`, `HL 66,100`, `BOS ▲ 67,400`) anchored directly to candlestick wicks.
- **Rejected Idea**: Glassmorphic frosted backdrop filters behind chart controls.
- **Reason for Rejection**: Glassmorphism reduced contrast against light off-white canvases. Retained crisp `#FFFFFF` surfaces with 1px hairline borders (`rgba(15, 23, 42, 0.08)`).

### Scene 03: Continuous Workflow Execution Spine
- **Concept Explored**: Scroll-linked horizontal and vertical trace line linking the 7 execution stages.
- **Useful Idea**: Vertical execution spine on mobile and glowing conduit track on desktop (`useScroll`, `useTransform`).
- **Rejected Idea**: Infinite loop particle dots moving along the line.
- **Reason for Rejection**: Particles felt like generic crypto animation noise. Retained clean, solid scroll-driven trace fill instead.

### Scene 04: Warm Paper Masterclass Timeline (3-Day Session)
- **Concept Explored**: Physical paper editorial surface (`#F4F2EC`) with connected day timeline cards.
- **Useful Idea**: Tactile day tabs with spring layout indicators (`layoutId="activeDayRail"`).
- **Rejected Idea**: Skeuomorphic heavy drop shadows or torn paper edge effects.
- **Reason for Rejection**: Retained modern flat editorial paper aesthetic with subtle border definition.
