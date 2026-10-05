# ALGOFINEX — PHASE 4 WORKSPACE UI CONCEPT

**Date:** October 2026
**Document Version:** 4.0.0
**Status:** BLUEPRINT COMPLETE
**Author:** Implementation Engineer (Jules)
**Target Recipient:** UI Director / Visual Lead
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Visual Hierarchy & Spatial Composition

The Primary Product Workspace (`APP-02`) is the hero surface of the entire AlgoFinex application. It prioritizes the **CHART AND ANALYTICAL CONTEXT** over ambient interface chrome.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP HEADER: Instrument [ BTC/USD ] • Timeframe [ 15m | 1h | 4h ] • Status [ LIVE DEMO ]│
├─────────┬─────────────────────────────────────────────────────────────┬────────────────┤
│ LENS    │ MAIN WORKSPACE CANVAS (#FFFFFF)                             │ CONTEXTUAL     │
│ CONTROL │                                                             │ INSPECTOR      │
│ RAIL    │ • Candlestick Series (Bull: #059669 / Bear: #DC2626)        │ PANEL (DRAWER) │
│         │ • Structural Highs/Lows (HH/HL/LH/LL)                       │                │
│ [RAW]   │ • Liquidity Pool Overlays (#EDF2F7)                         │ Price: $67,400 │
│ [STR]   │ • Trend Corridor Boundaries (#1D4ED8)                       │ Event: BOS ▲   │
│ [LIQ]   │ • Invalidation Badge ($66,180)                              │ Invalidation:   │
│ [TRD]   │                                                             │ $66,180        │
│ [CNF]   │ • Crosshair HUD (Mouse / Touch Scrubbing)                   │ Status: ACTIVE │
├─────────┴─────────────────────────────────────────────────────────────┴────────────────┤
│ BOTTOM RIBBON: OHLC Inspection • Vol: 1,420 • Range: 2.4% • Routine Step 03/07        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Analytical Lens Interaction Model

Users control progressive clarity through a dedicated **Lens Layer Bar**:

1. `RAW`: Pure candlestick chart without overlays.
2. `STRUCTURE`: Adds swing structure points (`HH`, `HL`, `LH`, `LL`) and Break of Structure lines (`BOS ▲`, `CHOCH ▼`).
3. `LIQUIDITY`: Highlights unmitigated buy-side (`BSL`) and sell-side (`SSL`) liquidity pools in pale blueprint tint (`#EDF2F7`).
4. `TREND`: Renders smoothed Trend Corridor boundaries in Precision Cobalt (`#1D4ED8`).
5. `CONFIRMATION`: Overlays structural confirmation zones and exact invalidation price levels (`INVALIDATION — $66,180`).

---

## 3. Light-Mode Palette & Surface Styling

- **Canvas Background:** Pure White (`#FFFFFF`) for maximal contrast and long-session visual comfort.
- **Grid Lines:** Faint blueprint grid (`rgba(15, 23, 42, 0.04)`).
- **Hairline Borders:** Ultra-crisp 1px borders (`rgba(15, 23, 42, 0.08)`).
- **Bullish Candlesticks:** Controlled Emerald (`#059669`).
- **Bearish Candlesticks:** Controlled Crimson (`#DC2626`).
- **Primary Structural Accents:** Precision Cobalt (`#1D4ED8`).
- **Typography:** JetBrains Mono for all price coordinates, timestamps, and OHLC data.

---

## 4. Desktop vs Mobile Adaptation

- **Desktop (1024px – 1440px+):**
  - Full-screen workspace with left vertical lens rail.
  - Hovering mouse drives live crosshairs and top OHLC inspection ribbon.
  - Clicking any chart coordinate pins the inspector panel on the right.

- **Mobile (375px – 430px):**
  - Full-width SVG chart container with touch-drag scrubbing (`onTouchMove`/`onTouchEnd`).
  - Horizontal lens layer bar pinned directly above the bottom tab bar.
  - Inspector opens as a slide-up bottom sheet drawer covering 50% of screen height.
