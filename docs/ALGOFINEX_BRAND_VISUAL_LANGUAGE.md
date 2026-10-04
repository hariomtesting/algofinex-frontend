# ALGOFINEX — BRAND VISUAL LANGUAGE SPECIFICATION
## Phase 2.7: Brand Identity Lock & Product Art Direction

**Document Version**: 2.7.0  
**Status**: APPROVED PROPRIETARY BRAND STANDARD  
**Domain**: Light-Mode Financial Technology & Analytical Trading Interface  

---

## 1. Core Brand Thesis: The Recognition Test

> **"An AlgoFinex screenshot should be immediately identifiable within 200 milliseconds, even if the logo is completely removed."**

AlgoFinex achieves this not through loud colors, neon badges, or aggressive marketing banners, but through:
1. **Editorial White Space**: Generous, calm, intentional margins with asymmetric text-to-workstation staging.
2. **Proprietary Precision Cobalt (`#1D4ED8`)**: A single restrained electric cobalt blue used exclusively for structural pivots, confirmed entry triggers, and primary actions.
3. **Physical Analytical Surfaces**: Pure white workstation planes (`#FFFFFF`) elevated over warm architectural canvases (`#F8F8F6`, `#F4F6F9`, `#EDF2F7`, `#F4F2EC`) with hairline borders (`rgba(15, 23, 42, 0.08)`) and ambient diffused lift (`shadow-workstation`).
4. **Restrained Technical Instrumentation**: Exactly 70% Product, 20% Editorial, and 10% Technical Metadata. No fake performance numbers, no PnL claims, no decorative clutter.

---

## 2. Visual Hierarchy & Compositional Ratios

AlgoFinex strictly enforces the **70 / 20 / 10 Compositional Ratio**:

```
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  [70% PRODUCT WORKSTATION]                                            │
│  The live interactive trading canvas, price action, structural grids, │
│  and indicator overlays remain the unquestioned visual protagonist.   │
│                                                                       │
│  [20% EDITORIAL STORYTELLING]                                         │
│  Monumental display typography, intentional line breaks, asymmetric    │
│  left-anchored context that frames the analytical problem.            │
│                                                                       │
│  [10% TECHNICAL METADATA]                                             │
│  Whisper-quiet monospace coordinates, bar timestamps, resolution      │
│  tags, and non-repainting verification status.                        │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 3. Typography Architecture

We use high contrast between monumental display scale and micro-metric precision. Avoid capitalizing all metadata; sentence case preserves editorial elegance.

| Level | Font Family | Size (Desktop / Mobile) | Weight | Tracking | Case | Semantic Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Inter Display` / Sans | `76px–84px` / `38px–44px` | Extra Bold (800) | `-0.038em` | Title / Sentence | Main hero hook (`Cut through chart noise.`) |
| **Display Section**| `Inter Display` / Sans | `56px–64px` / `32px–38px` | Extra Bold (800) | `-0.035em` | Sentence | Scene headers (`Market structure. Progressively revealed.`) |
| **Editorial Lead** | `Inter` / Sans | `16px–18px` / `15px` | Regular (400) | Normal | Sentence | Secondary context and philosophical framing |
| **Section Tag** | `JetBrains Mono` | `11px` / `10px` | SemiBold (600) | `+0.08em` | Uppercase | Architectural eyebrow tags (`ANALYTICAL SUITE`) |
| **Product UI Head**| `Inter Display` / Sans | `18px–22px` / `16px` | Bold (700) | `-0.02em` | Title | Active mode / routine step titles |
| **Chart Axis/Time**| `JetBrains Mono` | `9px–10px` | Medium (500) | `+0.04em` | Monospace | Price ticks (`$68,200`), time increments (`14:45`) |
| **Structural Tag** | `JetBrains Mono` | `9px–10px` | Bold (700) | `+0.05em` | Monospace | Pivot annotations (`HH 67,400`, `BOS ▲`) |

---

## 4. Proprietary Color Palette

```
  CANVAS WARMTH           SURFACE WHITE           COBALT SIGNATURE        STRUCTURE EMERALD
  #F8F8F6                 #FFFFFF                 #1D4ED8                 #059669
  [Page Base]             [Workstation Plane]     [Primary Brand Anchor]  [Bullish / Pivots]
```

### Color Token Reference

- **Canvas Backgrounds**:
  - `bg-canvas-hero`: `#F8F8F6` (Warm off-white base)
  - `bg-canvas-analytical`: `#F4F6F9` (Cool technical workstation plane)
  - `bg-canvas-blueprint`: `#EDF2F7` (Pale engineering grid)
  - `bg-canvas-workflow`: `#F8FAFC` (Clean slate runway)
  - `bg-canvas-paper`: `#F4F2EC` (Warm tactile masterclass paper)
- **Product Surfaces**:
  - `bg-surface-primary`: `#FFFFFF` (Pure white chart stage and modal containers)
  - `bg-surface-subtle`: `#F8FAFC` / `#F1F5F9` (Control bars, pill housings, table rows)
- **Brand Accents**:
  - `brand-cobalt` (Signature): `#1D4ED8` (Electric Precision Cobalt)
  - `brand-cobalt-hover`: `#1E40AF` (Deep Cobalt)
  - `brand-cobalt-tint`: `rgba(29, 78, 216, 0.08)` (Active pill backgrounds, demand fills)
- **Market Signal Accents (Non-Aggressive)**:
  - `signal-bull`: `#059669` (Controlled Emerald Green)
  - `signal-bull-tint`: `rgba(5, 150, 105, 0.08)`
  - `signal-bear`: `#DC2626` (Disciplined Crimson Red)
  - `signal-bear-tint`: `rgba(220, 38, 38, 0.08)`
  - `signal-liquidity`: `#7C3AED` (Deep Violet for resting liquidity pools)
  - `signal-liquidity-tint`: `rgba(124, 58, 237, 0.08)`
- **Borders & Dividers**:
  - `border-hairline`: `rgba(15, 23, 42, 0.07)` (Standard micro divider)
  - `border-medium`: `rgba(15, 23, 42, 0.12)` (Container boundaries)
  - `border-active`: `#1D4ED8` (Selected states)

---

## 5. Signature Chart Visual Language

AlgoFinex replaces standard TradingView default aesthetics with a distinct proprietary visual grammar:

### 1. Candlestick Anatomy
- Bullish candles: `#059669` (Solid body with 1.5px wicks, 95% opacity).
- Bearish candles: `#DC2626` (Solid body with 1.5px wicks, 85% opacity).
- Width: `Math.max(stepX * 0.60, 8px)` to ensure crisp body-to-wick proportions.

### 2. Market Structure (Swing Geometry)
- **Pivots**: Subtle 3px solid circular nodes anchored exactly at the extremity of wicks, with a 10px vertical hairline pin.
  - High pivots (`HH`, `LH`): Pin in `#1D4ED8` with a compact `HH 67,400` pill.
  - Low pivots (`HL`, `LL`): Pin in `#059669` with a compact `HL 66,100` pill.
- **Break of Structure (BOS)**: A fine horizontal dashed line (`strokeDasharray="4 3"`, `#1D4ED8`, 1.5px) spanning between the broken pivot level and the breakout candle, marked with a small coordinate pill `BOS ▲`.

### 3. Liquidity Regions (Order Blocks & Fair Value Gaps)
- **Order Blocks**: Translucent tinted rectangles with subtle 45-degree micro-hatching (`#1D4ED8` at 8% opacity for demand; `#DC2626` at 6% for supply) bounded by a 1.2px dashed perimeter.
- **Labels**: Discrete monospace corner tags (`Demand Zone [Resting]` or `Supply Zone [Unmitigated]`), never blocking candle wicks.

### 4. Trend Context (Dynamic Momentum Cloud)
- **Fast EMA (21)**: Continuous 2.2px solid stroke in `#1D4ED8`.
- **Slow EMA (55)**: 1.5px dashed stroke in `#059669`.
- **Cloud Fill**: Gentle gradient from `#1D4ED8` (12% opacity) to `#059669` (3% opacity) bridging the two curves to visually portray expanding momentum.

### 5. Confirmation & Invalidation Frame
- **Entry Trigger**: White pill with green border (`#059669`, 1.5px) positioned safely below the trigger candle wick: `▲ Entry Confirmed`.
- **Hard Stop Invalidation**: Horizontal crimson dashed line extending forward to the right price axis: `Stop: $66,180` in bold monospace.

---

## 6. Button & Control Language

AlgoFinex buttons communicate mechanical confidence and tactile feedback:

1. **Primary Action (`Button Primary`)**:
   - Background: `bg-brand-blue` (`#1D4ED8`).
   - Text: Pure white `#FFFFFF`, semi-bold (600), font-sans.
   - Elevation: `shadow-xs hover:shadow-sm active:scale-[0.99]`.
   - Hover: Transitions smoothly to `#1E40AF` (Deep Cobalt).
2. **Secondary Workstation Action (`Button Secondary`)**:
   - Background: Pure white `#FFFFFF`.
   - Border: Hairline border `border-black/[0.08] hover:border-black/[0.18]`.
   - Text: Charcoal slate `#0F172A`, medium (500).
   - Icon: Signature blue accent (`#1D4ED8`).
3. **Analytical Mode Selector Pills (`Workstation Tabs`)**:
   - Inactive: Pure white background, `text-slate-600`, hairline border.
   - Active: Solid `bg-brand-blue` (`#1D4ED8`), `text-white`, `shadow-xs`.

---

## 7. Logo Treatment

The AlgoFinex brand mark consists of:
- **Icon Mark**: A minimalist 28×28px geometric badge in Signature Cobalt (`#1D4ED8`), featuring two intersecting technical coordinate axes and an upward 45° geometric structural ray.
- **Wordmark**: `AlgoFinex` in tight-tracked (`-0.03em`) semi-bold Inter, where `Algo` is near-black charcoal (`#0F172A`) and `Finex` is subtle cool slate (`#475569`) with an electric blue period anchor.

---

## 8. Environmental Scene Transitions

Transitions between sections never use jarring dark-mode blocks. Scene changes are communicated through atmospheric material shifts:

1. **Scene 1 (Hero)**: Warm Off-White (`#F8F8F6`) — Editorial poster framing the live terminal protagonist.
2. **Scene 2 (Product Reveal)**: Cool Technical White (`#F4F6F9`) — Expanded wide-stage workstation revealing the 5 progressive clarity lenses.
3. **Scene 3 (Indicator System)**: Pale Engineering Blueprint (`#EDF2F7`) — Mathematical integration of all 4 analytical strata on one instrument.
4. **Scene 4 (Workflow Journey)**: Clean Runway Slate (`#F8FAFC`) — Continuous glowing conduit connecting the 7 stages of execution.
5. **Scene 5 (3-Day Session)**: Warm Editorial Paper (`#F4F2EC`) — Tactile masterclass staging for the 7-step trading routine.

---

## 9. Content Discipline & Zero-Hype Verification

AlgoFinex explicitly prohibits:
- ❌ Win rate percentages (e.g. "89% win rate").
- ❌ Profit & Loss figures (e.g. "+$14,250 today").
- ❌ Execution speed / latency exaggerations (e.g. "<8ms ultra-HFT engine").
- ❌ Unverified customer testimonials or stock portraits.
- ❌ Fabricated indicator product names.

**All claims describe observable market mechanics**:
- Swing geometry (higher highs, higher lows).
- Liquidity sweeps (resting pool reclaims, imbalance mitigation).
- Trend alignment (dynamic multi-period envelopes).
- Execution discipline (non-repainting bar-close verification and fixed invalidation stops).
