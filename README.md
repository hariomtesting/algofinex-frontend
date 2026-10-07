# AlgoFinex Frontend — LuxAlgo Dark Mode Workstation

AlgoFinex is an algorithmic market structure analysis workstation and educational masterclass platform engineered in an ultra-sleek **Obsidian Dark Mode** aesthetic inspired by [LuxAlgo](https://luxalgo.com) and the [LuxAlgo Vela](https://github.com/LuxAlgo/Vela) design system.

---

## 🎨 Visual Identity & Design System

- **Canvas & Backgrounds:** Deep space obsidian (`#05080E`, `#060A12`) with blueprint hairline grids
- **Surface Elevation:** Frosted dark glass (`#0A0E1A`, `#0D1322`) with `backdrop-blur-xl` and `border-white/10`
- **Signal Confirmation:** Electric Emerald (`#00F090`) with neon radial glow (`shadow-[0_0_20px_#00F090]`)
- **Trend Corridors & Blocks:** Neon Cyan (`#00E5FF`) and Quant Violet (`#A855F7`)
- **Risk Invalidation:** Signal Rose / Neon Red (`#FF3B69`)
- **Typography:** Inter, Inter Display, and JetBrains Mono for telemetry figures

---

## 🚀 Technical Stack & Architecture

- **Framework:** React 18 + TypeScript 5 + Vite 5
- **Styling:** Tailwind CSS v3 + Modern CSS Tokens
- **Icons:** Lucide React
- **Motion:** Framer Motion (restrained quantitative motion + `prefers-reduced-motion` compliance)
- **Deployment:** Cloudflare Pages (SPA-ready with `public/_redirects`)

---

## 🖥️ Application Architecture

### 1. Marketing Presentation
- **Hero & Live Charting Terminal:** macOS-style window affordances, interactive candlestick scrubs, and dynamic indicators.
- **5-Stage Reveal Experience:** Step-by-step structural isolation (`Raw Market` → `Pivots` → `Liquidity Pools` → `Corridor` → `Execution Trigger`).
- **3-Phase Discipline Workflow:** Market understanding and pre-trade invalidation.
- **Continuous 7-Step Routine Conduit:** Interactive timeline with real-time waveform states.
- **Pricing & Intake:** Tier breakdown with interactive simulated checkout modal.
- **Client Portal:** TradingView username binding and script verification dialog.

### 2. Workstation Terminal (`/app`)
- `APP-01` **Overview:** Workstation orientation dashboard with live engine status.
- `APP-02` **Primary Workspace:** Full-height Vela terminal canvas with strata lens selector (`RAW`, `STRUCTURE`, `LIQUIDITY`, `TREND`, `CONFIRMATION`), crosshair scrubbers, and SVG candlestick series.
- `APP-03` **Indicators Directory:** Master-detail Pine Script algorithm catalog with logic formulas and sensitivity tuner.
- `APP-04` **3-Day Session Companion:** Masterclass lab companion with video playback and exercise checklists.
- `APP-05` **Access Portal:** Simulated access pass tier status and TradingView handle provisioning.
- `APP-06` **Contextual Inspector:** 380px desktop right slide-over & mobile drawer for structural coordinate analysis.

---

## 🛠️ Local Development & Build

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

---

## 🌐 Cloudflare Pages Deployment

This project is pre-configured for Cloudflare Pages:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **SPA routing:** `public/_redirects` contains `/* /index.html 200` to automatically route all paths (e.g. `/app`) to `index.html`.
