# ALGOFINEX — PHASE 4 PRODUCT EXPERIENCE MAP

**Date:** October 2026
**Document Version:** 4.0.0
**Status:** BLUEPRINT COMPLETE
**Author:** Implementation Engineer (Jules)
**Target Recipient:** UI Director / Visual Lead
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Primary User Personas

### A. The Discerning Retail Technical Trader
- **Profile:** Experienced active trader frustrated by cluttered indicator suites, lagging oscillator signals, and noisy dark trading terminals.
- **Mental Model:** Values structural market context (Highs/Lows, Liquidity Pools, Fair Value Gaps, Trend Corridors) over automated black-box trading signals.
- **Needs:** Calm workspace environment, instant layer toggling, precise visual hierarchy, zero intrusive UI popups, and high information density without visual chaos.

### B. The 3-Day Session Student / Cohort Participant
- **Profile:** Trader enrolled in the AlgoFinex 3-Day Live Masterclass seeking to apply the 7-Step Routine directly alongside the indicator suite.
- **Needs:** Seamless integration between curriculum materials (Day 01 Arrival, Day 02 Observation, Day 03 Application) and the interactive chart workspace.

---

## 2. Jobs-To-Be-Done (JTBD)

1. **Job 1 (Inspect Structure):** "When I open a chart, I want to immediately see clean swing highs/lows and market structure breaks (BOS/CHOCH) so I can establish directional bias without manual drawing."
2. **Job 2 (Evaluate Liquidity):** "When preparing a trading plan, I want to identify unmitigated liquidity pools and supply/demand zones so I can anticipate institutional reaction areas."
3. **Job 3 (Assess Trend & Momentum):** "When evaluating entry context, I want to see smoothed trend corridors without lagging EMA clutter so I stay on the right side of market momentum."
4. **Job 4 (Verify Confirmation & Invalidation):** "When considering an execution, I want clear structural confirmation levels and exact invalidation coordinates so I can calculate risk precisely."
5. **Job 5 (Masterclass Alignment):** "When attending the 3-Day Live Session, I want quick access to session archives, workout routine checklists, and indicator preset guides within the product."

---

## 3. Product Entry Point & First Meaningful Action

- **Entry Point:** Accessing the AlgoFinex Product Application via the persistent top navigation (`Launch App` / `Client Portal` button).
- **First Meaningful Action:** Selecting an active demo instrument (`BTC/USD`, `ETH/USD`, `SOL/USD`, or `NQ1!`) and toggling progressive analytical lenses (`RAW` → `STRUCTURE` → `LIQUIDITY` → `TREND` → `CONFIRMATION`).
- **Core Value Moment:** Seeing raw price candlesticks instantly transform into an organized, multi-layered blueprint without losing chart readability.

---

## 4. Core & Secondary Workflows

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PRODUCT APPLICATION SHELL                          │
├───────────────┬─────────────────────────────────────────────────────────┤
│ ENTRY         │ User authenticates via prototype Access Pass             │
├───────────────┼─────────────────────────────────────────────────────────┤
│ CORE          │ 1. Select Instrument & Timeframe                        │
│ WORKFLOW      │ 2. Apply Analytical Layer (Structure/Liquidity/Trend)    │
│               │ 3. Inspect Invalidation & Confirmation Points           │
│               │ 4. Formulate 7-Step Execution Plan                      │
├───────────────┼─────────────────────────────────────────────────────────┤
│ SECONDARY     │ • Explore Available Indicator Suite presets             │
│ WORKFLOWS     │ • Access 3-Day Masterclass Curriculum & Archives        │
│               │ • Manage Account Access & TradingView Integration       │
└───────────────┴─────────────────────────────────────────────────────────┘
```

---

## 5. Navigation & Mobile Requirements

- **Desktop Navigation (1024px – 1440px+):** Minimal top instrument bar + left vertical icon rail (`Overview`, `Workspace`, `Indicators`, `Session`, `Access`). Contextual inspector opens as a sleek right-side slide-over panel.
- **Mobile Navigation (375px – 430px):** Fixed top bar with instrument picker and lens layer bar; bottom sticky navigation tab bar (`Chart`, `Layers`, `Session`, `Account`).
- **Mobile Touch Handling:** Full touch-drag scrubbing across chart SVGs with tactile crosshair tracking and active candle inspection ribbons.

---

## 6. Prototype Assumptions & Boundaries

| Aspect | Status | Detail |
| :--- | :--- | :--- |
| **Market Data** | **PROTOTYPE ASSUMPTION** | High-fidelity simulated demo candles and market feeds; no live exchange WebSockets required. |
| **Authentication** | **PROTOTYPE ASSUMPTION** | Instant client-side state toggle (Access Key / Passcode validation); no backend OAuth or database. |
| **Order Execution** | **EXCLUDED** | Product is an **analytical workstation**, not a broker execution engine. No order submission panels or brokerage API integrations. |
| **Billing / Payments** | **EXCLUDED** | Simulated subscription status; no Stripe integration or real financial charges. |
| **Performance / Claims** | **STRICTLY PROHIBITED** | No fake win-rate counters, P&L badges, or fabricated trade profit displays. |
