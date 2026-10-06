# AlgoFinex UI — Frontend Prototype

AlgoFinex is a **Light-Mode First** technical market structure analysis workstation and educational masterclass platform prototype.

---

## ALGOFINEX FRONTEND PROTOTYPE

> **IMPORTANT PROTOTYPE NOTICE:**
> This repository is a **FRONTEND PROTOTYPE SPA** created for user experience validation and visual presentation.
>
> - **Simulated Market Feeds:** Market chart data and candlestick series are high-fidelity prototype simulations.
> - **No Real Payments:** Subscription checkout forms and access pass states are simulated on client-side React state (`AF-8849-VALIDATED`). No real financial transactions take place.
> - **No Production Backend:** OAuth authentication, server databases, and exchange WebSockets are not connected.
> - **No Broker Execution:** AlgoFinex is an analytical workstation and educational suite. It does not connect to broker APIs, execute orders, or manage live financial trading accounts.
> - **Zero Guarantee / Not Financial Advice:** All market structure annotations (`BOS`, `CHOCH`, `Liquidity Pools`, `Invalidation Levels`) are objective educational coordinates. Nothing presented constitutes financial advice or guaranteed trade outcomes.

---

## Technical Stack & Architecture

- **Framework:** React 18 + TypeScript 5 + Vite 5
- **Styling:** Tailwind CSS v3 + CSS Variables
- **Icons:** Lucide React
- **Animations:** Framer Motion (restrained product storytelling transitions + `prefers-reduced-motion` compliance)

---

## Application Prototype Views (`/app`)

1. `APP-01` **Overview:** Workstation orientation & continuation hub.
2. `APP-02` **Primary Workspace:** Interactive SVG candlestick chart with 5 progressive strata lenses (`RAW` → `STRUCTURE` → `LIQUIDITY` → `TREND` → `CONFIRMATION`).
3. `APP-03` **Indicators Directory:** Master-detail TradingView indicator catalog with logic formulas and simulated access key actions.
4. `APP-04` **3-Day Session Companion:** Warm tactile paper (`#F4F2EC`) masterclass curriculum companion.
5. `APP-05` **Access Portal:** Simulated access pass tier status and TradingView username binding.
6. `APP-06` **Contextual Inspector:** 380px desktop right slide-over & mobile bottom sheet drawer for price coordinate analysis.

---

## Local Development & Build

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run TypeScript check & build production bundle
npm run build

# Preview production build locally
npm run preview
```
