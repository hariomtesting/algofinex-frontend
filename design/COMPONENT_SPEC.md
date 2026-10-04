# ALGOFINEX — COMPONENT SPECIFICATION

## Marketing

### Navbar
Purpose: persistent navigation and conversion.

Desktop:
- brand
- primary navigation
- primary CTA

Mobile:
- brand
- menu trigger
- primary CTA if space permits

### Hero
Must be custom-built.

Do not use a generic SaaS hero template.

### ProductFrame
Reusable shell for presenting AlgoFinex product UI.

### ProductPreview
Interactive or animated product representation.

### FeatureStatement
Large editorial statement paired with a visual.

### DataVisual
Original market/product visualization.

### SessionCTA
3-day session conversion block.

### Pricing
Minimal plans. No artificial urgency.

### FAQ
Expandable, keyboard accessible.

---

## Application

### DashboardShell
Navigation + content area.

### IndicatorCard
Shows:
- indicator name
- purpose
- active state
- access state

### ChartPanel
Original demo trading visualization.

### SignalPanel
Shows an illustrative signal and its context.

### SessionStatus
Shows:
- session state
- remaining time
- next action

### ReferralPanel
Shows referral link and referral statistics.

---

## Engineering rules

- TypeScript
- component composition over monolithic pages
- reusable tokens
- accessible controls
- no hard-coded duplicated UI
- demo data separated from presentation components
