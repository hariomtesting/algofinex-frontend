# ALGOFINEX — PHASE 4 SCREEN INVENTORY

**Date:** October 2026
**Document Version:** 4.0.0
**Status:** BLUEPRINT COMPLETE
**Author:** Implementation Engineer (Jules)
**Target Recipient:** UI Director / Visual Lead
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Inventory Summary (6 Core Prototype Screens)

To prevent visual clutter and maintain institutional focus, the initial Phase 4 application prototype is constrained to **6 core screens**:

1. `APP-01`: **Product App Shell & Overview (`/app`)**
2. `APP-02`: **Primary Product Workspace (`/app/workspace`)**
3. `APP-03`: **Indicator Suite Directory (`/app/indicators`)**
4. `APP-04`: **3-Day Live Session Companion (`/app/session`)**
5. `APP-05`: **Client Portal & Access Management (`/app/access`)**
6. `APP-06`: **Contextual Analytical Inspector (Drawer / Modal Overlay)**

---

## 2. Screen Specifications

### APP-01: Product App Shell & Overview (`/app`)
- **Purpose:** Central hub greeting authenticated members; provides system status, upcoming live session banners, active indicator licenses, and recent market analysis presets.
- **Primary User Action:** Launch primary chart workspace or review upcoming session schedule.
- **Primary Visual:** Minimalist light-space dashboard with warm off-white canvas (`#F8F8F6`), active access tier badge, and quick-action workstation cards.
- **Desktop Behavior:** Grid of 3 editorial cards (Workspace, Session, License Keys).
- **Mobile Behavior:** Single-column vertical stack with prominent "Open Workspace" primary action.
- **Prototype Elements:** Simulated license activation key state (`AF-8849-ACTIVE`).

### APP-02: Primary Product Workspace (`/app/workspace`) — *THE PROTAGONIST*
- **Purpose:** Interactive analytical workstation featuring full-canvas chart SVG with real-time crosshair inspection, time-frame selection, and lens layer controls.
- **Primary User Action:** Toggle analytical strata (`RAW` → `STRUCTURE` → `LIQUIDITY` → `TREND` → `CONFIRMATION`) and inspect market levels.
- **Primary Visual:** High-density, unboxed white workstation plane (`#FFFFFF`) with pale blueprint overlays (`#EDF2F7`), custom coordinate markers (`HH 67,400`, `BOS ▲`), and crosshair HUD.
- **Desktop Behavior:** Fullscreen interactive canvas with top context bar and left lens control rail.
- **Mobile Behavior:** Compact chart view with touch-drag scrubbing and bottom layer selector tab bar.
- **Prototype Elements:** Simulated candle datasets for `BTC/USD`, `ETH/USD`, `SOL/USD`, and `NQ1!`.

### APP-03: Indicator Suite Directory (`/app/indicators`)
- **Purpose:** Technical documentation and configuration catalog for the AlgoFinex TradingView indicator suite.
- **Primary User Action:** Review indicator methodology, copy TradingView script access invites, and adjust signal sensitivity parameters.
- **Primary Visual:** Editorial 2-column catalog (Left: Indicator list; Right: Selected indicator blueprint, mathematical formula explanation, and parameter sliders).
- **Desktop Behavior:** Side-by-side master-detail layout.
- **Mobile Behavior:** Accordion list with expandable indicator detail sheets.
- **Prototype Elements:** "Copy TradingView Access Invite" action with instant clipboard feedback.

### APP-04: 3-Day Live Session Companion (`/app/session`)
- **Purpose:** Interactive companion hub for students enrolled in the 3-Day Masterclass.
- **Primary User Action:** Select class day (`Day 01 Arrival`, `Day 02 Observation`, `Day 03 Application`), review exercise checklists, and watch session recordings.
- **Primary Visual:** Warm tactile paper canvas (`#F4F2EC`) with vertical timeline rail and video/material download cards.
- **Desktop Behavior:** Horizontal 3-day timeline stepper + central content viewer.
- **Mobile Behavior:** Vertical accordion timeline with touch-friendly action buttons.
- **Prototype Elements:** Simulated video player frame and downloadable PDF workbook links.

### APP-05: Client Portal & Access Management (`/app/access`)
- **Purpose:** Account overview displaying TradingView username integration, active subscription tier, and session enrollment status.
- **Primary User Action:** Update TradingView username or upgrade access pass tier.
- **Primary Visual:** Clean white card interface (`#FFFFFF`) with hairline borders and blue status indicators (`#1D4ED8`).
- **Desktop Behavior:** Two-column card grid (Left: TradingView ID & License; Right: Session Enrollment).
- **Mobile Behavior:** Single column card stack.
- **Prototype Elements:** Client-side form state with zero backend dependency.

### APP-06: Contextual Analytical Inspector (Overlay / Slide-Over)
- **Purpose:** Slide-over detail panel opening when clicking a specific chart marker (e.g., `BOS ▲ 67,400` or `Liquidity Pool $65,800`).
- **Primary User Action:** Inspect detailed structural metrics, invalidation points, and context notes for the selected price point.
- **Primary Visual:** Sleek right-hand slide-over drawer with dark gray monospace metadata (`JetBrains Mono`) and hairline divider rules.
- **Desktop Behavior:** 380px wide right slide-over.
- **Mobile Behavior:** Bottom sheet drawer taking 60% viewport height.
- **Prototype Elements:** Hardcoded contextual explanations for demo chart coordinates.
