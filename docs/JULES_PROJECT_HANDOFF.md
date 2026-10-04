# ALGOFINEX — HANDOFF & CONTEXT BOOTSTRAP REPORT
**Prepared by:** Jules (Implementation Engineer)
**Date:** October 2026
**Document Version:** 1.0.0
**Status:** COMPLETE ONBOARDING & ARCHITECTURAL HANDOFF
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Current Project Architecture

AlgoFinex is a high-fidelity **frontend prototype** built as a Single Page Application (SPA) using **React 18**, **TypeScript 5**, **Vite 5**, and **Tailwind CSS v3**.

- **Entry Point**: `src/main.tsx` renders `src/App.tsx` wrapped in React's `StrictMode`.
- **Primary Orchestrator**: `src/App.tsx` controls the top-level state (e.g. `isPortalOpen` modal state) and renders the sequential page experience from Section 01 through Section 09, followed by the global footer and interactive modals.
- **Data Layer (`src/data/`)**: Pure TypeScript modules containing immutable mock datasets and configuration constants:
  - `mockChartData.ts`: Realistic candlestick coordinate arrays, swing pivot points (`HH`, `HL`, `LH`, `LL`, `BOS`), demand/supply order block regions, dynamic EMA trend lines, and order book depth snapshots.
  - `productExperienceData.ts`: Data models for the 5-stage progressive reveal (`RAW` → `STRUCTURE` → `LIQUIDITY` → `TREND` → `CONFIRMATION`), the 3-step understanding workflow, 4 analytical layers, 4 core principles, 7-step execution pipeline, 3-day session curriculum, pricing tiers, and FAQ accordion pairs.
- **Type Definitions (`src/types/`)**:
  - `trading.ts`: Interfaces for `Candle`, `PivotPoint`, `OrderBlock`, `TrendLine`, `OrderBookEntry`, `IndicatorLayer`, `MarketPhase`, `SessionDay`, `PricingTier`, `FaqItem`.
  - `productExperience.ts`: Domain models for progressive clarity lenses and workflow stages.
- **Styling Architecture**:
  - `tailwind.config.js`: Custom color palette tokens (`background`, `canvas`, `surface`, `border`, `brand`, `signal`, `text`), font families (`sans`, `display`, `mono`), custom shadows (`workstation`, `terminal`, `panel`, `glow-blue`), tracking, and subtle pulse animations.
  - `src/index.css`: Global base styles, custom light-mode blueprint grids (`.bg-blueprint-grid`), dot matrix backgrounds (`.bg-dot-matrix-light`), custom scrollbars, and `@media (prefers-reduced-motion)` directives.

---

## 2. Current Design System

The visual language is strictly **LIGHT-MODE FIRST**, defined as **EDITORIAL LIGHT SPACE + PRECISION INSTRUMENT**.

- **Core Visual Philosophy**: Calm, editorial, precise, product-first, and premium. Avoids generic SaaS tropes, crypto neon glow, glassmorphism, or dark terminals.
- **Color Tokens**:
  - Base Canvases: Warm off-white page background (`#F8F8F6`), cool analytical plane (`#F4F6F9`), engineering blueprint tint (`#EDF2F7`), and warm tactile paper (`#F4F2EC`).
  - Workstation Surface: Crisp pure white (`#FFFFFF`) elevated by ultra-fine hairline borders (`rgba(15, 23, 42, 0.08)`).
  - Brand Anchor: Precision Cobalt (`#1D4ED8` / `#1E40AF`), reserved strictly for structural pivots, confirmed entry signals, primary actions, and breakout vectors.
  - Signal Accents: Controlled Emerald Green (`#059669`) for bullish structure/demand; Controlled Crimson (`#DC2626`) for bearish structure/supply/invalidation.
- **Typography System**:
  - Display Titles: `Inter Display` / Sans, extra bold (800), tight tracking (`-0.035em` to `-0.04em`), tight leading, sentence case.
  - Body & Editorial: `Inter` / Sans, high contrast near-black charcoal (`#0F172A`) and neutral slate (`#475569`).
  - Technical Instrumentation: `JetBrains Mono`, uppercase, tracked out (`+0.05em` to `+0.12em`), 10px–12px for axes, pivot tags (`HH 67,400`, `BOS ▲`), timestamps, and status indicators.
- **70 / 20 / 10 Compositional Ratio**: 70% Product Workstation UI, 20% Editorial Storytelling, 10% Technical Monospace Metadata.

---

## 3. Current Page / Section Structure

The user experience follows a 9-stage sequential narrative flow:

1. **HERO (`Hero.tsx` & `HeroProductTerminal.tsx`)**: Asymmetric editorial poster layout pairing display typography (*"Cut through chart noise. Trade with structural clarity."*) with the primary Trading Terminal workstation protagonist.
2. **PRODUCT REVEAL (`ProductRevealSection.tsx`)**: 5-Stage Progressive Revelation Workstation (`01 RAW` → `02 STRUCTURE` → `03 LIQUIDITY` → `04 TREND` → `05 CONFIRMATION`) with interactive lens switching and native SVG math coordinate pins.
3. **UNDERSTANDING (`MarketUnderstandingSection.tsx`)**: Interactive 3-phase discipline stepper (*Read the Market* → *Build Context* → *Make a Plan*) with architectural tab navigation and live SVG diagrammatic fragments.
4. **METHODOLOGY (`IndicatorSystemSection.tsx`)**: The Coordinated Indicator System set on an engineering blueprint canvas (`#EDF2F7`), integrating all 4 analytical strata into a single workstation interface.
5. **PRINCIPLES (`PrinciplesSection.tsx`)**: An unboxed monumental manifesto detailing the four foundational axioms (*Clarity*, *Context*, *Discipline*, *Consistency*) with minimalist SVG geometry and hairline rules.
6. **WORKFLOW BRIDGE (`SceneTransitionBridge.tsx`)**: Continuous 7-stage execution conduit (`Raw Market` → `Structure` → `Context` → `Setup` → `Invalidation` → `Execution` → `Review`) connecting theory to daily routine.
7. **3-DAY SESSION (`SessionSection.tsx`)**: Tactile editorial masterclass timeline formatted on warm paper canvas (`#F4F2EC`) detailing Day 01 (Arrival), Day 02 (Observation), and Day 03 (Application), featuring the interactive 7-Step Trader Routine sequence rail.
8. **PRICING (`PrototypePricingSection.tsx` & `PrototypeCheckoutModal.tsx`)**: Architectural comparative access presentation clearly separating Core Indicator Software from the 3-Day Live Masterclass Cohort, with annual/quarterly billing toggle and simulated modal checkout.
9. **FAQ (`FaqSection.tsx`)**: Unboxed editorial accordion list formatted with sequential index numerals (`01`–`06`), crisp hairline dividers, and generous negative space.
10. **CLOSING (`ClosingCtaSection.tsx`)**: Final editorial scene (*"Read the market differently."*) framed by the Cobalt brand glyph and technical verification fragment.

---

## 4. Existing Components

### Marketing Components (`src/components/marketing/`)
- `Navbar.tsx`: Top persistent sticky navigation bar with brand mark, section anchor links, client portal trigger, and CTA.
- `Hero.tsx`: Section 01 hero container with asymmetric typography, CTA buttons, and terminal staging.
- `HeroProductTerminal.tsx`: High-fidelity SVG trading chart workstation mockup with candle wicks, order book depth panel, swing pivot pins, and interactive timeframe/mode toggles.
- `ProductRevealSection.tsx`: Section 02 workstation with 5 progressive clarity mode filters and interactive chart canvas.
- `MarketUnderstandingSection.tsx`: Section 03 architectural tab stepper with interactive market structure diagrams.
- `IndicatorSystemSection.tsx`: Section 04 methodology workstation on pale blueprint canvas.
- `PrinciplesSection.tsx`: Section 05 unboxed manifesto with monumental numbers (`01`–`04`).
- `SceneTransitionBridge.tsx`: Section 06 execution conduit linking methodology to application.
- `SessionSection.tsx`: Section 06/07 3-day session timeline on warm paper background with interactive day selector and 7-step routine object.
- `PrototypePricingSection.tsx`: Section 07 comparative pricing architecture with simulated plan selection.
- `PrototypeCheckoutModal.tsx`: Simulated checkout modal capturing TradingView username, plan review, and fake enrollment confirmation.
- `FaqSection.tsx`: Section 08 editorial accordion list with keyboard accessible expand/collapse.
- `ClosingCtaSection.tsx`: Section 09 final brand closing scene.
- `ClientPortalModal.tsx`: Prototype member portal modal showing TradingView script sync status and license status.

### UI Micro-Components (`src/components/ui/`)
- `CountUp.tsx`: Smooth numeric counting animation component using Framer Motion (`useMotionValue`, `useTransform`, `animate`).
- `DecryptedText.tsx`: Text decryption character scramble effect component for technical coordinate reveals.
- `ShinyText.tsx`: Subtle CSS sheen sweep effect across brand text.
- `SpotlightCard.tsx`: Light-mode radial cursor spotlight hover effect container.

---

## 5. Existing Interactions

- **Interactive Chart Controls**: Timeframe switching (`1M`, `5M`, `15M`, `1H`, `4H`), mode toggling (`Structure`, `Liquidity`, `Trend`, `Full System`), and progressive clarity stage selectors (`01`–`05`).
- **Architectural Steppers & Tabs**: Smooth tab state switching in Market Understanding, Indicator System, and Session Timeline with active indicator markers and synchronized SVG diagram updates.
- **Interactive Sequence Rail**: 7-step trader routine interactive selector in the Session section updating step details, operational duration, and rule criteria.
- **Frequency Toggle**: Pricing toggle switching between Quarterly and Annual billing with instant price adjustment and savings badges.
- **Simulated Conversion Flow**: Triggering "Enroll" launches `PrototypeCheckoutModal`, allowing simulated username input, terms agreement, and simulated access provisioning without real payment.
- **Client Portal Simulation**: Clicking "Client Portal" in navbar/footer opens `ClientPortalModal`, showing simulated TradingView script activation status (`Active Sync`, `Invite-Only`).
- **Editorial FAQ Accordion**: Expandable/collapsible FAQ items with keyboard navigation support.

---

## 6. Existing Animation System

- **Framer Motion Integration**: Used deliberately for micro-interactions, modal overlays (`AnimatePresence`, `motion.div`), tab indicator spring physics, and numeric count-up transitions.
- **Hover & Focus States**: Micro transitions (`150ms–200ms ease-in-out`), subtle scale shifts (`active:scale-[0.99]`), hairline border color shifts, and soft shadow lifts.
- **CSS Keyframes**: `pulse-subtle` animation for live bar-close status indicators.
- **Reduced Motion Support**: `src/index.css` contains strict `@media (prefers-reduced-motion: reduce)` overrides setting animation/transition durations to `0.01ms` and scroll-behavior to `auto`.

---

## 7. Existing Dependencies

### Runtime Dependencies (`package.json`)
- `react` (`^18.3.1`) & `react-dom` (`^18.3.1`): Core React library.
- `framer-motion` (`^11.11.17`): Animation and gesture library.
- `lucide-react` (`^0.460.0`): Clean, unified icon set.
- `clsx` (`^2.1.1`) & `tailwind-merge` (`^2.5.4`): Class name composition and deduplication utilities.

### Dev Dependencies
- `typescript` (`^5.6.3`): Static type checking.
- `vite` (`^5.4.10`) & `@vitejs/plugin-react` (`^4.3.3`): Fast build tool and plugin.
- `tailwindcss` (`^3.4.15`), `autoprefixer` (`^10.4.20`), `postcss` (`^8.4.49`): CSS framework and build pipeline.

---

## 8. Existing Prototype Data

All temporary datasets and test state are isolated in `src/data/` and marked with `// PROTOTYPE DATA — REPLACE BEFORE PRODUCTION`:
- **Pricing Tiers**: `$69/mo` annual (`$828/yr`), `$89/mo` quarterly (`$267/qtr`), `$495` 3-Day Session, `$645` All-Access Pass.
- **Cohort Intake Stats**: `October Cohort`, `8 / 12 Enrolled`, `4 Seats Remaining`, `Schedule: 09:00 – 11:30 UTC`.
- **Chart Price Coordinates**: Bitcoin BTC/USDT price data around `$67,420.50` with calculated swing pivots (`HH 67,400`, `HL 66,100`, `BOS ▲ 67,400`).
- **Client Sync State**: Simulated username `trader_demo`, status `Active Sync`, script permissions `Invite-Only Access Granted`.

---

## 9. Current Responsive Strategy

- **Mobile First & Breakpoint Architecture**: Tested and verified across 5 key viewports (`1440px`, `1280px`, `1024px`, `768px`, `390px`).
- **Zero Horizontal Overflow Constraint**: All elements, charts, tables, and modal drawers fit within `clientWidth` without horizontal scrollbars (`overflow-x-hidden` on root).
- **Responsive Layout Transformations**:
  - Desktop 12-column asymmetric grids stack into single-column editorial posters on mobile.
  - Multi-tab pill bars convert to touch-friendly horizontal scrollbars (`no-scrollbar`).
  - SVG chart containers use responsive `viewBox` attributes for proportional scaling down to 390px.
  - CTAs scale to full width on mobile viewports for touch targets (>44px).

---

## 10. Important Design Constraints

- **Light-Mode First**: Never convert main section backgrounds to dark mode. Preserve the warm off-white, cool gray, blueprint, and warm paper canvas progression.
- **Protagonist UI**: The trading workstation interface must remain the primary visual hero (70% ratio).
- **Unboxed Architecture**: Do not wrap every section in repetitive rounded cards (`rounded-3xl border border-black/[0.08]`). Maintain unboxed, editorial, hairline grid layouts.
- **Zero Fabrication Policy**: Never invent fake PnL, win rates (e.g. "89% accuracy"), verified trading results, or fake customer testimonials.
- **Editorial Typography**: Sentence case headings with intentional line breaks and high scale contrast against monospace metadata.

---

## 11. Phase History Summary

- **Phase 1**: Initial visual and product foundation.
- **Phase 2**: Product reveal workstation, indicator system, and 3-Day Session foundation.
- **Phase 2.5**: Departure from generic SaaS layouts towards spatial scene choreography.
- **Phase 2.5B**: Reference-driven visual composition audit (analyzing Framer/OnePercentClub references).
- **Phase 2.6**: Light-mode-first transformation with custom color tokens and warm canvas surfaces.
- **Phase 2.7**: Brand visual language lock, signature chart grammar (cobalt/emerald/crimson), and zero-hype discipline.
- **Phase 3**: Complete 9-stage frontend prototype experience with prototype checkout and portal modals.
- **Phase 3.1**: Surgical visual audit & art-direction polish pass (unboxing Principles, FAQ, and Pricing; de-cluttering Hero telemetry; refining section pacing).

---

## 12. Current Known Limitations

1. **Static / Mocked Chart Feeds**: Chart geometry is generated from deterministic static coordinate arrays (`mockChartData.ts`). It is not connected to a live WebSocket or real-time TradingView Lightweight Charts feed.
2. **Prototype Modals**: Checkout and Client Portal modals simulate user interaction and state changes without backend API endpoints, authentication, or payment gateways.
3. **Hardcoded Seat Counter**: Cohort seat availability (`8 / 12 Enrolled`) is hardcoded prototype data.

---

## 13. What Phase 3.2 Should Touch (When Authorized)

*Note: Phase 3.2 has NOT been started or authorized.* When authorized by the UI Director, Phase 3.2 should focus on:
- Advanced scroll-driven motion choreography (e.g. subtle scroll-linked line tracing and scene reveals).
- Experimental interactive micro-components (evaluating select components from 21st.dev or React Bits against the light-mode design system).
- Enhanced SVG chart interaction (e.g. interactive hover scrubbing across candlestick coordinates with live HUD readout).
- Refined micro-transitions and motion polish across section bridges.

---

## 14. What Phase 3.2 Should NOT Touch

Phase 3.2 must **STRICTLY PRESERVE**:
- ❌ Do NOT change the light-mode visual identity or palette (`#F8F8F6`, `#1D4ED8`, etc.).
- ❌ Do NOT replace the 9-stage narrative section architecture.
- ❌ Do NOT reintroduce heavy rounded card boxes, neon dark-mode themes, or generic 3-column SaaS grids.
- ❌ Do NOT add real payment gateways, production backend code, or fake trading stats.
- ❌ Do NOT alter established core copy or editorial positioning without UI Director approval.

---

### Phase 3.2 Authorization Status:
**PHASE 3.2 HAS NOT BEEN IMPLEMENTED.** All existing files remain strictly in their Phase 3.1 validated state. Awaiting explicit authorization from the UI Director before proceeding to any Phase 3.2 tasks.
