# ALGOFINEX — LUXALGO-INSPIRED ENGINEERING STACK AUDIT (PHASE 2A)
**Prepared by:** Jules (Implementation Engineer)
**Date:** October 2026
**Document Version:** 1.0.0
**Status:** COMPLETE ENGINEERING AUDIT (NO APPLICATION CODE MODIFIED)
**Strategic Shift:** From Editorial Light Space to **LuxAlgo-Inspired Premium Dark Product Platform**.
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Executive Summary & Audit Purpose

This audit evaluates the current AlgoFinex repository (`package.json`, `src/`, `components/`, `data/`, `styles/`) against the newly authorized **LuxAlgo-Inspired Product Platform Rebuild**.

The goal of Phase 2A is to map existing components to the new 13-stage dark information architecture, audit existing and proposed open-source dependencies, establish license/bundle compliance, and define the exact component migration roadmap before editing application source code.

---

## 2. Existing Dependencies & Proposed Open-Source Toolkit

### Current Dependencies in `package.json`
- `react` (`^18.3.1`) & `react-dom` (`^18.3.1`): Core React framework. (Keep)
- `framer-motion` (`^11.11.17`): Motion & animation library. (Keep — MIT License)
- `lucide-react` (`^0.460.0`): Clean UI icon family. (Keep — ISC License)
- `clsx` (`^2.1.1`) & `tailwind-merge` (`^2.5.4`): Tailwind utility helpers. (Keep — MIT License)
- `tailwindcss` (`^3.4.15`), `autoprefixer`, `postcss`, `typescript`, `vite`: Build pipeline. (Keep)

### Proposed New Dependencies for Phase 2 Implementation
1. **TradingView Lightweight Charts (`lightweight-charts`)**:
   - **Purpose**: Real financial chart rendering (candlesticks, price/time scales, crosshair, area fills, markers) replacing static SVG approximations.
   - **License**: Apache License 2.0 (Commercial-friendly with TradingView attribution requirement).
   - **Bundle Impact**: ~45 kB gzipped. Highly performant HTML5 Canvas renderer.
   - **Recommendation**: **APPROVED FOR INSTALLATION**.
2. **Shadcn / Radix UI Primitives (`@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-tabs`)**:
   - **Purpose**: Accessible UI primitives (accordions, modals, pricing tabs) without bloated design systems.
   - **License**: MIT.
   - **Bundle Impact**: ~8–12 kB gzipped per primitive.
   - **Recommendation**: **APPROVED FOR SELECTIVE USAGE**.
3. **Lenis (`@studio-freight/lenis` or `lenis`)**:
   - **Purpose**: Smooth page scrolling for dark landing page.
   - **License**: MIT.
   - **Bundle Impact**: ~3 kB gzipped.
   - **Recommendation**: **OPTIONAL / CONDITIONAL** (Verify native mobile touch scroll remains 100% unimpeded before retaining).

### License Safety Verification
- ❌ **React Bits**: Uses MIT + Commons Clause (commercial restriction). **DO NOT INSTALL PACKAGE DIRECTLY**. Use pure CSS/Framer Motion primitives instead.
- ❌ **Do NOT Install**: Magic UI, Motion Primitives, or heavy UI frameworks. Retain existing Vite + Tailwind + Framer Motion setup.

---

## 3. Architecture & Component Mapping Roadmap

The new dark homepage follows a 13-stage product-led structure:

| # | New Stage / Section Name | Current Component File | Action | Migration & Refactoring Strategy |
| :-: | :--- | :--- | :---: | :--- |
| **01** | **Hero Workstation** | `Hero.tsx` & `HeroProductTerminal.tsx` | **REWRITE** | Dark background (`#0A0D14`), approved headline/subhead, dual CTAs, and large canvas-backed chart workspace. |
| **02** | **Product / Chart Showcase** | `ProductRevealSection.tsx` | **REWRITE** | Headline *"Charts Built for Structural Clarity."* 5 dark interactive mode lenses with live overlay transitions. |
| **03** | **Structure Feature** | `MarketUnderstandingSection.tsx` | **REWRITE** | Headline *"See Structure. Not Noise."* Focus on swing geometry (`HH`, `HL`, `BOS ▲`) on dark chart stage. |
| **04** | **Liquidity Feature** | New / Refactored | **CREATE** | Headline *"See Where Liquidity Sits."* Visualizes demand/supply order block regions and Fair Value Gap imbalances. |
| **05** | **Trend Context Feature** | New / Refactored | **CREATE** | Headline *"Context Before Confirmation."* Visualizes dynamic trend cloud corridor on dark price action. |
| **06** | **Confirmation Feature** | New / Refactored | **CREATE** | Headline *"Make Confirmation Visible."* Displays locked bar-close confirmation markers and invalidation stops (`INVALIDATION — $66,180`). |
| **07** | **Unified Product Workflow** | `IndicatorSystemSection.tsx` & `SceneTransitionBridge.tsx` | **REWRITE / MERGE** | Dark execution runway (`#0B0F19`) connecting `RAW → STRUCTURE → LIQUIDITY → TREND → CONFIRMATION` with continuous glowing line. |
| **08** | **3-Day Live Session** | `SessionSection.tsx` | **MODIFY** | Dark slate masterclass canvas (`#121620`), Day 01–03 timeline tabs, 7-step routine sequence rail, and intake seat counter. |
| **09** | **Product Capabilities / Proof** | `PrinciplesSection.tsx` | **REWRITE** | Headline *"Built Around a Clear Analytical Workflow."* Replaces stock social proof with 4 operational specification cards (`Clarity`, `Context`, `Discipline`, `Consistency`). |
| **10** | **Dark Pricing Architecture** | `PrototypePricingSection.tsx` & `PrototypeCheckoutModal.tsx` | **REWRITE** | Dark pricing canvas (`#0A0D14`) with featured `All-Access Master Pass` card, annual/quarterly billing toggle, and prototype disclaimers. |
| **11** | **Comparison Matrix** | New / Refactored | **CREATE** | Clean dark comparison table comparing Indicator Suite vs 3-Day Session capabilities. |
| **12** | **Editorial FAQ** | `FaqSection.tsx` | **MODIFY** | Dark accordion list (`#0A0D14`) with 48px touch heights, hairline dividers, and honest rejection of guaranteed outcomes. |
| **13** | **Final Closing CTA** | `ClosingCtaSection.tsx` | **MODIFY** | Dark brand closing scene with glowing Cobalt glyph reticle, headline (*"Read the market differently."*), and dual actions. |

---

## 4. Mobile & Desktop Responsive Strategy

- **Mobile Viewports (375px, 390px, 430px)**:
  - Purpose-built mobile composition with 36px hero display headline, 48px minimum touch heights, full-width CTAs, single-column vertical sequences, and touch chart scrubbing.
  - Featured `All-Access Master Pass` pricing card ordered first on mobile (`order-first lg:order-last`).
- **Desktop Viewports (1024px, 1280px, 1440px)**:
  - Immense 1400px dark terminal stage, asymmetric 12-column grid, 7-column terminal staging, and wide blueprint methodology canvases.

---

## 5. Absolute Truthful Prototype Boundaries

- ❌ **Zero Fabricated Claims**: No fake win rates, win percentages, automated trading claims, or stock testimonials.
- ❌ **Zero Fake Capabilities**: Do NOT copy LuxAlgo's AI coding agent, 800+ indicators, or backtesting engine claims.
- ✅ **Truthful Scope**: AlgoFinex remains a TradingView indicator suite mapping Structure, Liquidity, Trend, and Confirmation + an intensive live 3-Day Session.
- ✅ **Prototype Disclaimers**: Pricing and cohort schedules retain explicit disclaimers (`// PROTOTYPE DATA — REPLACE BEFORE PRODUCTION`).

---

## 6. Phase 2A Audit Conclusion

This audit provides a complete, risk-assessed roadmap for transitioning AlgoFinex to a **LuxAlgo-inspired Premium Dark Product Platform**.

### Final Audit Status:
**AUDIT COMPLETE. NO APPLICATION CODE MODIFIED.**
Awaiting UI Director review and approval of `docs/LUXALGO_ENGINEERING_STACK_AUDIT.md` before installing dependencies or editing components.
