# ALGOFINEX — PHASE 4 INFORMATION ARCHITECTURE

**Date:** October 2026
**Document Version:** 4.0.0
**Status:** BLUEPRINT COMPLETE
**Author:** Implementation Engineer (Jules)
**Target Recipient:** UI Director / Visual Lead
**Repository:** `hariomtesting/algofinex-ui`

---

## 1. Architectural Tree

```
ALGOFINEX APPLICATION (LIGHT-MODE FIRST)
├── PERSISTENT TOP APP HEADER
│   ├── Brand Wordmark & Mode Indicator ("PROTOTYPE WORKSTATION")
│   ├── Active Instrument Selector [ BTC/USD ▼ ]
│   ├── Timeframe Selector [ 15m | 1h | 4h | 1D ]
│   └── User Access Badge [ ACTIVE PASS · AF-8849 ]
│
├── APP NAVIGATION RAIL (LEFT VERTICAL ON DESKTOP / BOTTOM BAR ON MOBILE)
│   ├── [1] OVERVIEW    → Dashboard / System Status (`/app`)
│   ├── [2] WORKSPACE   → Primary Interactive Chart Workstation (`/app/workspace`)
│   ├── [3] INDICATORS  → Indicator Suite Directory & TradingView Invites (`/app/indicators`)
│   ├── [4] SESSION     → 3-Day Live Masterclass Companion (`/app/session`)
│   └── [5] ACCESS      → Account & TradingView Integration (`/app/access`)
│
└── MAIN APPLICATION CONTENT AREA
    ├── [SCREEN APP-01] OVERVIEW HUB
    ├── [SCREEN APP-02] WORKSPACE (Chart Canvas + Lens Layer Bar + Contextual Inspector)
    ├── [SCREEN APP-03] INDICATORS CATALOG
    ├── [SCREEN APP-04] 3-DAY SESSION COMPANION
    ├── [SCREEN APP-05] ACCESS MANAGEMENT
    └── [OVERLAY APP-06] CONTEXTUAL INSPECTOR DRAWER
```

---

## 2. Navigation Philosophy & Minimal Chrome Hierarchy

1. **Uncluttered Canvas:** The main content panel occupies > 85% of available screen area. Navigation chrome is quiet, neutral, and translucent off-white (`#F8F8F6`).
2. **Instant Navigation:** Tab switching utilizes client-side React state or lightweight sub-routing (`/app/*`) without full page reloads.
3. **Contextual Continuity:** Switching from Workspace to Session or Indicators maintains the active instrument selection in global prototype state.
4. **No Deep Hierarchy:** Navigation is flat (max 2 levels deep). Users are never more than 1 click away from the primary chart workspace.

---

## 3. Surface & Canvas Assignments

| Section / Screen | Primary Canvas Color | Surface Description |
| :--- | :--- | :--- |
| **App Header & Navigation Rail** | `#F8F8F6` (Off-White) | Quiet neutral frame with 1px hairline border (`rgba(15, 23, 42, 0.08)`). |
| **Workspace (APP-02)** | `#FFFFFF` (Pure White) | High-contrast working plane designed for long analytical sessions. |
| **Overview (APP-01)** | `#F4F6F9` (Cool Gray) | Structured dashboard plane with crisp white card containers. |
| **Indicators (APP-03)** | `#EDF2F7` (Blueprint Pale) | Technical documentation surface with hairline blueprint accents. |
| **Session (APP-04)** | `#F4F2EC` (Warm Paper) | Tactile educational canvas evoking masterclass notebooks. |
| **Access (APP-05)** | `#FFFFFF` (Pure White) | Clean account card container with Precision Cobalt accents (`#1D4ED8`). |
