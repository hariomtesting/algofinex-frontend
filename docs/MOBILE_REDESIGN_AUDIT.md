# ALGOFINEX — MOBILE EXPERIENCE REDESIGN AUDIT (PHASE M1)
**Auditor:** Jules (Implementation Engineer)
**Date:** October 2026
**Document Version:** 1.0.0
**Status:** COMPLETE AUDIT REPORT (NO CODE MODIFIED)
**Target Viewports Audited:** 375px (iPhone SE/13 Mini), 390px (iPhone 13/14), 430px (iPhone 14/15 Pro Max), 768px (iPad/Tablet Portrait)
**Core Directive:** *Mobile is NOT desktop / 2. Mobile is a purpose-built, focused precision instrument.*
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Executive Summary & Core Principles

While the current desktop prototype achieves a 91.5/100 score on wide screens, inspecting the experience at **375px, 390px, and 430px** reveals that mobile currently relies on responsive scaling and stacked desktop grids.

### The Mobile Philosophy Shift:
- **DESKTOP**: Editorial Light Space + Spatial Precision Instrument (wide multi-column layouts, side-by-side terminal panels, expansive blueprint canvases).
- **MOBILE**: Editorial Light Space + **Focused Precision Instrument** (deliberate single-column vertical sequences, bold display typography, full-width touch targets >= 48px, high-legibility chart viewports).

This audit evaluates all 12 major scenes, typography, spacing, touch targets, and motion behavior across 375px, 390px, 430px, and 768px viewports.

---

## 2. Section-by-Section Mobile Audit

### 1. Mobile Header (`Navbar.tsx`)
- **Current Mobile Problem**: Header contains a small brand mark, a compressed secondary link, and a small client portal trigger button. It feels like a shrunk desktop navbar rather than an intentional mobile header.
- **Why Desktop Composition Fails**: Desktop navigation spans 1400px with 5 anchor links and 2 action buttons. Squeezing this into 390px creates crowded touch targets (< 40px).
- **Desired Mobile Behavior**: Compact AlgoFinex identity on the left, an obvious mobile menu trigger or persistent primary action (`Join Session`) on the right, generous vertical breathing room, and touch targets >= 48px.
- **Section Strategy**: **RESTRUCTURE**.
- **Priority**: **P0 (Critical)**.

---

### 2. Hero Section (`Hero.tsx` & `HeroProductTerminal.tsx`)
- **Current Mobile Problem**: The asymmetric 12-column poster grid stacks vertically, placing the large display headline on top and forcing the entire desktop terminal mockup directly below.
- **Why Desktop Composition Fails**: The desktop terminal is 780px wide with side-by-side chart and intelligence panels. On 390px, the side panel stacks underneath the chart, causing excessive vertical scrolling before the user understands the core offer.
- **Desired Mobile Behavior**: A mobile editorial poster hierarchy:
  1. AlgoFinex Glyph + Deliverable Badge (`TRADINGVIEW INDICATOR SUITE · 3-DAY LIVE SESSION`)
  2. Bold Headline: *"Cut through chart noise. Trade with structural clarity."*
  3. Short, punchy 2-line supporting copy
  4. Primary CTA: `Join 3-Day Session` (full-width 48px height)
  5. Secondary Action: `Inspect Workstation` (full-width)
  6. Mobile-Optimized Product Terminal (focused chart viewport, key candlesticks, active overlay, no tiny illegible chart chrome).
- **Section Strategy**: **RESTRUCTURE & SIMPLIFY**.
- **Priority**: **P0 (Critical)**.

---

### 3. Mobile Product Terminal (`HeroProductTerminal.tsx`)
- **Current Mobile Problem**: The terminal title bar displays 6 tiny pill buttons (`1m`, `5m`, `15m`, `1H`, `4H`, `Trend`, `Liquidity`, `Structure`) that wrap onto 3 crowded lines. Text tags like `BTC/USDT SPOT/PERP $68,220.50` become cramped.
- **Why Desktop Composition Fails**: Desktop terminal chrome assumes a 1200px container width with ample horizontal space for multi-button button groups and telemetry tags.
- **Desired Mobile Behavior**: Focus strictly on essential chart geometry:
  1. Candlestick series with bold emerald/crimson wicks
  2. Active structural overlays (`HH`, `HL`, `BOS ▲`)
  3. Touch-driven chart scrubbing with crosshair & Y-axis price badge
  4. Single clean mode selector pill row (`Trend` | `Liquidity` | `Structure`)
  5. Remove 8px microscopic telemetry text and secondary window affordances.
- **Section Strategy**: **SIMPLIFY INTERACTION**.
- **Priority**: **P0 (Critical)**.

---

### 4. Product Reveal (`ProductRevealSection.tsx`)
- **Current Mobile Problem**: The 5 progressive clarity mode filters (`01. Raw Price`, `02. Market Structure`, `03. Liquidity`, `04. Trend Context`, `05. Decision Frame`) render as a horizontal scrollable row of small text pills. Users must scroll horizontally to find stages 4 and 5.
- **Why Desktop Composition Fails**: On desktop, 5 stage pills fit comfortably in one line across 1400px. On 390px, horizontal scrolling hides the active decision lenses.
- **Desired Mobile Behavior**: Large, readable stage selector pills formatted in a clean 2-row or vertical stage ribbon:
  `RAW (01)` • `STRUCTURE (02)` • `LIQUIDITY (03)` • `TREND (04)` • `CONFIRMATION (05)`.
  The active state dominates visually; inactive states stay quiet. The SVG chart canvas uses a dedicated mobile aspect ratio.
- **Section Strategy**: **RESTRUCTURE INTERACTION**.
- **Priority**: **P1 (High)**.

---

### 5. Market Understanding (`MarketUnderstandingSection.tsx`)
- **Current Mobile Problem**: The 3-phase discipline switcher (`Read the Market`, `Build Context`, `Make a Plan`) uses horizontal tab headers above a stacked 2-column card container. On 390px, users must scroll back and forth to see phase details.
- **Why Desktop Composition Fails**: Side-by-side editorial copy and SVG diagram panels work on desktop (50/50 split), but stack into a very long vertical block on mobile.
- **Desired Mobile Behavior**: A vertical editorial sequence where each phase (`01 READ THE MARKET` → `02 BUILD CONTEXT` → `03 MAKE A PLAN`) is presented with a large index numeral, short 2-line explanation, and a compact supporting SVG diagram. No nested card grids.
- **Section Strategy**: **RESTRUCTURE**.
- **Priority**: **P1 (High)**.

---

### 6. Methodology (`IndicatorSystemSection.tsx`)
- **Current Mobile Problem**: Attempts to scale down a wide engineering blueprint canvas (`#EDF2F7`) containing a central chart and 4 surrounding layer parameter panels.
- **Why Desktop Composition Fails**: The blueprint grid and 4 layer panels (`Structure`, `Liquidity`, `Trend`, `Confirmation`) wrap into 5 consecutive full-width boxes on mobile, creating visual repetition with Section 02.
- **Desired Mobile Behavior**: A vertically sequenced instrument where each layer reveals naturally into the next:
  `01 STRUCTURE` ↓ `02 LIQUIDITY` ↓ `03 TREND` ↓ `04 CONFIRMATION`.
  One focused, high-contrast chart element with expandable layer accordion details.
- **Section Strategy**: **SIMPLIFY & COMPRESS**.
- **Priority**: **P1 (High)**.

---

### 7. Principles Manifesto (`PrinciplesSection.tsx`)
- **Current Mobile Problem**: Displays 4 stacked cards with monumental numerals (`01`–`04`) and technical specification SVG fragments. Generates excessive vertical whitespace between sections.
- **Why Desktop Composition Fails**: Desktop uses 120px padding (`py-36`) between principles. On mobile, this creates empty scrolling space without adding information.
- **Desired Mobile Behavior**: Monumental editorial manifesto:
  `01 — CLARITY`
  `02 — CONTEXT`
  `03 — DISCIPLINE`
  `04 — CONSISTENCY`
  Large display typography, fine hairlines, tight vertical spacing (`py-12`), minimal supporting copy, zero heavy card containers.
- **Section Strategy**: **COMPRESS & EDIT**.
- **Priority**: **P2 (Medium)**.

---

### 8. Workflow Bridge (`SceneTransitionBridge.tsx`)
- **Current Mobile Problem**: The desktop horizontal runway trace line turns into a mobile horizontal pill scroller, losing the visual feeling of a continuous execution conduit.
- **Why Desktop Composition Fails**: The 7-stage horizontal trace line (`Raw Market` → `Observe` → `Structure` → `Context` → `Setup` → `Invalidation` → `Decision`) cannot fit horizontally on a 390px screen.
- **Desired Mobile Behavior**: A vertical execution spine where a continuous glowing line connects all 7 stages vertically down the screen as the user scrolls. Clicking a waypoint updates the waveform graphic smoothly.
- **Section Strategy**: **RESTRUCTURE**.
- **Priority**: **P1 (High)**.

---

### 9. 3-Day Session (`SessionSection.tsx`)
- **Current Mobile Problem**: The 3 day timeline buttons (`DAY 01`, `DAY 02`, `DAY 03`) stack vertically above the active day detail card, followed by the 7-step routine sequence rail. This creates a very long, repetitive list of buttons.
- **Why Desktop Composition Fails**: Desktop places 3 day tabs in a 3-column row, with the active day details spanning full width. Stacking them on mobile results in 10+ stacked boxes in one section.
- **Desired Mobile Behavior**: A vertical editorial timeline (`DAY 01 Workspace Calibration` ↓ `DAY 02 Order Flow Audit` ↓ `DAY 03 7-Step Routine Build`) set on warm paper canvas (`#F4F2EC`). Clean tab switching with full-width 48px touch targets.
- **Section Strategy**: **RESTRUCTURE & COMPRESS**.
- **Priority**: **P1 (High)**.

---

### 10. Prototype Pricing (`PrototypePricingSection.tsx`)
- **Current Mobile Problem**: Stacks the Software Suite card, 3-Day Session card, and All-Access Pass card sequentially. The user must scroll past two full-screen cards before reaching the recommended All-Access tier.
- **Why Desktop Composition Fails**: Desktop uses a 7-column / 5-column split layout comparing software + cohort on the left with All-Access on the right. Stacking these creates 3 equal-weight full-viewport cards on mobile.
- **Desired Mobile Behavior**: Prioritize decision hierarchy on mobile:
  1. `ALL-ACCESS MASTER PASS` (Primary featured card at top with Cobalt border)
  2. `INDICATOR SUITE` (Secondary option)
  3. `3-DAY LIVE SESSION` (Cohort option)
  Clear pricing, deliverables checklist, full-width 48px CTA buttons, and prototype disclaimer.
- **Section Strategy**: **RESTRUCTURE HIERARCHY**.
- **Priority**: **P1 (High)**.

---

### 11. Editorial FAQ (`FaqSection.tsx`)
- **Current Mobile Problem**: Standard text accordions are functional, but chevron touch targets are small (32px) and question text wraps onto 3–4 lines on 375px screens.
- **Why Desktop Composition Fails**: Desktop question font size (20px) causes aggressive text wrapping on narrow mobile screens.
- **Desired Mobile Behavior**: Editorial numbered list (`01`–`06`) with font size tuned to 16px font-display, 48px minimum touch height, fine hairline dividers, and smooth expand/collapse.
- **Section Strategy**: **SIMPLIFY & TUNE**.
- **Priority**: **P2 (Medium)**.

---

### 12. Final Closing Scene (`ClosingCtaSection.tsx`)
- **Current Mobile Problem**: The brand glyph and headline (*"Read the market differently."*) sit inside 200px of top and bottom padding (`py-44`), causing excessive empty vertical scrolling on mobile.
- **Why Desktop Composition Fails**: Desktop uses vast negative space to create back-cover editorial weight. On 390px, 200px padding equals half the screen height in blank space.
- **Desired Mobile Behavior**: Intentional mobile closing scene:
  Cobalt Brand Glyph → Headline (*"Read the market differently."*) → Primary CTA (`Join 3-Day Session`) → Secondary link (`Client Portal`). Compact vertical padding (`py-20`).
- **Section Strategy**: **COMPRESS**.
- **Priority**: **P2 (Medium)**.

---

## 3. Mobile Typography, Spacing, Touch, and Motion Audit

### 1. Typography Scale Rules for Mobile (375px – 430px)
- **Hero Headline**: `36px–42px` (tight `-0.035em` tracking, line-height `1.08`). *Never wrap words awkwardly.*
- **Section Headlines**: `28px–32px` (bold font-display, leading `1.1`).
- **Subheads & Editorial Lead**: `14px–15px` (charcoal `#0F172A`, line-height `1.55`).
- **Monospace Metadata & Labels**: `11px–12px` (uppercase `JetBrains Mono`, tracking `+0.05em`). *Strict rule: No text under 11px on mobile.*

### 2. Spacing Rules for Mobile
- **Section Padding**: Standardize to `py-16 sm:py-20` (64px–80px) on mobile instead of desktop `py-36` (144px).
- **Container Margins**: `px-4 sm:px-6` (16px–24px outer horizontal margins).

### 3. Touch Target Rules
- **Minimum Target Height**: **48px** for all primary CTA buttons, tabs, stage selectors, and accordion triggers.
- **Button Width**: Full-width (`w-full`) for primary actions on mobile viewports (< 640px).

### 4. Motion & Reduced Motion Strategy
- **Lighter Mobile Animations**: Reduce transform translation distances from `y: 20px` to `y: 6px`.
- **Touch Scrubbing**: Preserve touch-based chart crosshair scrubbing (`onTouchMove`, `onTouchEnd`).
- **Reduced Motion**: Fall back to instant opacity toggles when `prefers-reduced-motion` is active.

---

## 4. Breakpoint Behavior Matrix (375px, 390px, 430px, 768px)

| Breakpoint | Target Device | Layout Strategy |
| :--- | :--- | :--- |
| **375px** | iPhone SE / 13 Mini | Compact single-column poster; 36px hero display type; full-width 48px CTAs; hidden chart chrome. |
| **390px** | iPhone 13 / 14 / 15 | Primary reference mobile viewport; 38px hero display type; vertical workflow spine; primary All-Access pricing card atop. |
| **430px** | iPhone Pro Max / Plus | Expanded mobile canvas; 42px hero display type; generous touch targets; crisp high-contrast chart viewports. |
| **768px** | iPad / Tablet Portrait | Hybrid tablet layout: 2-column pricing grids, horizontal stage ribbons, 48px hero display type, full interactive chart terminals. |

---

## 5. Audit Conclusion & Next Steps

This audit establishes that the current mobile experience requires a **purpose-built mobile composition** across header, hero, chart terminals, progressive lenses, workflow conduit, session timeline, and pricing hierarchy.

### Final Audit Status:
**AUDIT COMPLETE. NO CODE MODIFIED.**
Awaiting UI Director review and approval of `docs/MOBILE_REDESIGN_AUDIT.md` before proceeding to implementation.
