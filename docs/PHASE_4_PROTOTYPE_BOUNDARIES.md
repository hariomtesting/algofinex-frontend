# ALGOFINEX — PHASE 4 PROTOTYPE BOUNDARIES

**Date:** October 2026
**Document Version:** 4.0.0
**Status:** BLUEPRINT COMPLETE
**Author:** Implementation Engineer (Jules)
**Target Recipient:** UI Director / Visual Lead
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Prototype Scope & Strict Non-Features

The AlgoFinex application is a **FRONTEND PROTOTYPE SPA**. It is designed to demonstrate product UX, analytical clarity, and visual presentation.

It is **NOT** production trading infrastructure or commercial SaaS software.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                     ALLOWED IN PROTOTYPE APPLICATION                      │
├───────────────────────────────────────────────────────────────────────────┤
│ ✓ High-fidelity simulated market candle data                              │
│ ✓ Client-side prototype state (React useState / Context)                  │
│ ✓ Simulated access key validation ("AF-8849-ACTIVE")                       │
│ ✓ Simulated TradingView username integration form                         │
│ ✓ Interactive chart scrubbing & crosshair inspection                     │
│ ✓ Lens layer toggling (RAW → STRUCTURE → LIQUIDITY → TREND → CONFIRMATION)│
│ ✓ Interactive 3-Day Session curriculum timeline                           │
└───────────────────────────────────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────────────────────────────────┐
│                     STRICTLY EXCLUDED / NON-EXISTENT                      │
├───────────────────────────────────────────────────────────────────────────┤
│ ✕ Real payment processing or Stripe checkout                             │
│ ✕ Production OAuth or server database authentication                     │
│ ✕ Broker API connections or order submission panels                       │
│ ✕ Live exchange WebSockets or real financial account balances             │
│ ✕ Fabricated win-rate stats, profit counters, or fake testimonials        │
│ ✕ Backend microservices, databases, or cloud infrastructure              │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Permitted Prototype Data vs Prohibited Fabricated Claims

| Category | Permitted Prototype Data | Prohibited Fabricated Claims |
| :--- | :--- | :--- |
| **Market Data** | Simulated historical candles for demo instruments (`BTC/USD`, `ETH/USD`, `SOL/USD`). | Claims of real-time exchange latency or proprietary exchange feeds. |
| **Analysis** | Objective structural annotations (`HH`, `HL`, `BOS ▲`, `Liquidity Pool`). | Signals claiming guaranteed win rates, 90%+ accuracy, or price predictions. |
| **User Access** | Simulated license badges (`ALL-ACCESS PASS`, `VALIDATED`). | Fake customer user counts ("Join 15,000 active traders"). |
| **Performance** | Technical coordinate values (`$67,400`, `$66,180`). | Fake account balances, dollar profits, or trading result screenshots. |

---

## 3. Client-Side Prototype State Architecture

To maintain a responsive prototype experience without backend dependencies, Phase 4 application state will be managed entirely in-memory:

- **Active Navigation Tab:** `activeAppTab` (`'overview' | 'workspace' | 'indicators' | 'session' | 'access'`)
- **Active Instrument:** `selectedInstrument` (`'BTC/USD' | 'ETH/USD' | 'SOL/USD' | 'NQ1!'`)
- **Active Timeframe:** `selectedTimeframe` (`'15m' | '1h' | '4h' | '1D'`)
- **Active Lens Layer:** `activeLens` (`'RAW' | 'STRUCTURE' | 'LIQUIDITY' | 'TREND' | 'CONFIRMATION'`)
- **Inspector State:** `activeInspectorPoint` (`ChartPoint | null`)
- **User Pass Status:** `userAccess` (`{ passTier: 'All-Access', key: 'AF-8849-ACTIVE', tradingViewId: 'trader_demo' }`)
