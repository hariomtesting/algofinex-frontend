# ALGOFINEX — LIGHT-MODE ART DIRECTION
## Phase 2.6: Light-Mode-First Visual Identity & Spatial System

**Date**: October 2026  
**Document**: Architectural Blueprint for Light-Mode Redesign  
**Status**: APPROVED DESIGN SYSTEM  

---

## 1. Executive Philosophy: Editorial Light Space + Precision Instrument

AlgoFinex is transitioning to a **Light-Mode-First** visual identity. This is **not a color inversion**; it is an intentional design system built from the ground up to convey:

> **EDITORIAL LIGHT SPACE + PRECISION TRADING INTERFACE + TECHNICAL INSTRUMENTATION + PREMIUM RESTRAINT**

### Target Emotional Register
- **Calm & Objective**: Removes the dark gaming/crypto aggressive visual noise. Replaces it with the deliberate clarity of an editorial publication or an architectural workstation.
- **Physical & Crisp**: Interfaces feel tactile, clean, and mathematically grounded, with whisper-soft shadows, hairline borders, and pure white product surfaces set against warm off-white canvases.
- **High Legibility**: High-contrast typography (near-black charcoal on off-white) paired with precision monospace metadata and calibrated signal colors.

### Explicit Anti-Patterns (Avoided)
- ❌ Simple inverted dark mode (e.g. harsh pure `#FFFFFF` background with black boxes).
- ❌ Generic SaaS dashboard templates (overused blue gradients, heavy drop shadows).
- ❌ Neon glow, cyan bloom, or crypto laser effects.
- ❌ Glassmorphism / frosty blurred card stacks.
- ❌ Stock photos of traders or generic charts.
- ❌ "WIN" or boastful gambling language.

---

## 2. Color System & Architectural Tokens

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **`bg-canvas`** | `#F8F8F6` | Universal warm off-white page background. Prevents eye strain from pure white. |
| **`bg-surface`** | `#FFFFFF` | Crisp white product workstation surface and primary focal cards. |
| **`bg-surface-subtle`** | `#F1F3F5` | Muted cool-tinted container background for controls and telemetry bars. |
| **`bg-surface-warm`** | `#F4F2EC` | Paper-like editorial surface reserved specifically for the 3-Day Session. |
| **`bg-blueprint`** | `#EEF2F6` | Pale technical blueprint tone for the Coordinated Indicator System. |
| **`text-primary`** | `#0F172A` | Near-black charcoal for dominant display titles and primary body text. |
| **`text-secondary`** | `#475569` | Neutral slate for explanatory copy and secondary descriptions. |
| **`text-muted`** | `#64748B` | Technical metadata, axis labels, and operational rules. |
| **`text-dim`** | `#94A3B8` | Subtle hairline metadata and decorative dividers. |
| **`border-subtle`** | `rgba(15, 23, 42, 0.08)` | Standard ultra-fine hairline border for clean separation. |
| **`border-medium`** | `rgba(15, 23, 42, 0.14)` | Hover states, active tabs, and structural container borders. |
| **`brand-blue`** | `#1D4ED8` / `#2563EB` | Restrained electric blue for key active states, BOS lines, and primary actions. |
| **`brand-accent`** | `#0284C7` | Crisp precision blue for telemetry pins, crosshairs, and highlights. |
| **`signal-bull`** | `#059669` | Controlled emerald green for bullish candles, higher lows, and verified triggers. |
| **`signal-bull-tint`**| `rgba(5, 150, 105, 0.08)` | Soft tinted backing for bullish order blocks and status badges. |
| **`signal-bear`** | `#DC2626` | Controlled muted red for bearish candles, supply blocks, and invalidations. |
| **`signal-bear-tint`**| `rgba(220, 38, 38, 0.08)` | Soft tinted backing for supply zones and hard stop callouts. |
| **`shadow-workstation`**| `0 24px 60px -15px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(15, 23, 42, 0.06)` | Restrained, deep, physical lift without harsh darkness. |

---

## 3. Typography & Hierarchy

- **Display Headings**: `font-display` (`Inter Display` / `Inter`, tight `-0.035em` to `-0.04em` tracking).
  - Scale: `80px–88px` on desktop, `40px–56px` on tablet/mobile.
  - Composition: Tight line-height (`1.02–1.05`), deliberate line breaks, strong asymmetry.
- **Body & Editorial Copy**: `font-sans` (`Inter`), `15px–17px`, line-height `1.65`, high contrast charcoal `#0F172A` and neutral slate `#475569`.
- **Technical & Precision Telemetry**: `font-mono` (`JetBrains Mono`), `10px–12px`, tracking `+0.05em` to `+0.12em`, uppercase.

---

## 4. Scene Architecture & Environmental Progression

Rather than maintaining a monotonous white page or relying on artificial dark sections, each scene possesses a distinct, deliberate material surface:

1. **Scene 1: The Poster Hero (`Hero.tsx`)**
   - **Canvas**: Warm off-white (`#F8F8F6`).
   - **Composition**: Asymmetric poster layout. Left side anchors massive editorial typography (`Cut through chart noise. Trade with structural clarity.`) with restrained CTA and micro telemetry ticker.
   - **Protagonist**: The Trading Terminal appears as a bright, crisp white workstation (`#FFFFFF`) with subtle border, soft depth shadow, dark candlesticks, and blue analytical overlays.
2. **Scene 2: The Unboxed Workstation (`ProductRevealSection.tsx`)**
   - **Canvas**: Cooler analytical plane (`#F4F6F9`).
   - **Composition**: Full-viewport workstation reveal (`max-w-[1440px]`). Large white chart stage with hairline coordinate grids, floating coordinate pins (`[HH] 67,400`, `[HL] 66,100`, `[BOS] Break of Structure`), and clean progressive clarity toggles (`01 RAW → 02 STRUCTURE → 03 LIQUIDITY → 04 TREND → 05 CONFIRMATION`).
3. **Scene 3: The Coordinated Instrument (`IndicatorSystemSection.tsx`)**
   - **Canvas**: Pale technical blueprint (`#EDF2F7`).
   - **Composition**: ONE LARGE CENTRAL TRADING INTERFACE on white canvas. 4 analytical strata (`STRUCTURE`, `LIQUIDITY`, `TREND`, `CONFIRMATION`) overlay seamlessly with subtle optical depth.
4. **Scene 4: The Continuous Journey Ribbon (`SceneTransitionBridge.tsx`)**
   - **Canvas**: Clean white & warm-gray runway (`#F8FAFC`).
   - **Composition**: Continuous glowing blue/emerald datum trace line connecting `01 RAW MARKET → 02 STRUCTURE → 03 CONTEXT → 04 SETUP → 05 INVALIDATION → 06 EXECUTION → 07 REVIEW`. Real-time waveform transformation communicating increasing geometric order.
5. **Scene 5: The Editorial Masterclass (`SessionSection.tsx`)**
   - **Canvas**: Warm editorial paper-like surface (`#F4F2EC`).
   - **Composition**: High-value editorial masterclass scene. Large typography (`3 DAYS TO REFINE THE ROUTINE.`), restrained intake module, and the 7-Step Trading Routine as a tactile sculptural sequence rail.

---

## 5. Product UI & Workstation Treatment

- **Candlestick Color Palette**:
  - Bullish: `#059669` (Emerald Green) with solid crisp bodies.
  - Bearish: `#DC2626` (Muted Crimson) with solid bodies.
  - Chart background: Crisp `#FFFFFF` with whisper-light coordinate lines (`rgba(15, 23, 42, 0.04)`).
- **Overlays**:
  - Order Blocks: Light translucent tinted fills (`rgba(37, 99, 235, 0.08)` for demand, `rgba(220, 38, 38, 0.08)` for supply) with fine dashed borders.
  - Trend Cloud: Clean subtle gradient ribbon (`#2563EB` to `#059669` at 12% opacity).
  - Pivot Badges: Solid white pill with hairline border and saturated blue/green coordinate text.

---

## 6. Motion & Interaction Principles

- **Subtle & Purposeful**: Animations are editorial reveals (opacity fade + micro 6px translation).
- **Line Tracing**: Continuous datum lines draw in smoothly during stage transitions.
- **Zero Gimmicks**: No particles, no neon bloom, no distracting cursor magnetic loops.

---

## 7. Responsive Rules (1440, 1024, 768, 390)

- Zero horizontal overflow (`scrollWidth <= clientWidth` across all breakpoints).
- Asymmetric desktop layouts stack naturally on mobile with left-aligned editorial typography.
- Workstation SVGs scale responsively via `viewBox` with touch-friendly no-scrollbar filter pills.
