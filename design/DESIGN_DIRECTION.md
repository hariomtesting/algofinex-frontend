# ALGOFINEX — DESIGN DIRECTION v1.0

## Status
Phase 1 — Art direction and implementation foundation.

## North Star

AlgoFinex must feel like a deliberately designed financial technology product, not an AI-generated SaaS landing page.

The website should combine:
- the strong product presentation and visual composition of the primary FinanceX reference
- the scene-based storytelling and scroll choreography observed in the 1% Club reference
- an original AlgoFinex visual identity
- selectively used React Bits components
- custom-built trading/product visualizations

React Bits is a component source/toolkit, not the visual identity.

Official component repository:
https://github.com/DavidHDev/react-bits

Primary visual reference:
https://necessary-expectations-836515.framer.app/

Secondary visual reference:
https://www.onepercentclub.io/

---

# 1. Design Principles

### 1.1 Originality over imitation
Never reproduce a reference site's:
- exact hero composition
- exact section ordering
- exact illustrations
- exact imagery
- exact copy
- exact component styling
- exact animation sequence

Study the underlying design principle and reinterpret it for AlgoFinex.

### 1.2 Product before decoration
AlgoFinex sells a trading product. The indicator/product experience should be visually central.

Avoid generic:
- crypto coins
- candlestick wallpaper
- glowing neon charts
- random 3D finance objects
- AI-generated trader photos
- stock-market clichés

### 1.3 Designed scenes, not repeated cards
Do not build the landing page as:
hero → 3 cards → 3 cards → testimonial cards → pricing cards.

Sections should have different compositions and visual rhythm.

### 1.4 Motion must explain something
Animations should communicate:
- product behavior
- progression
- market movement
- hierarchy
- transition between ideas
- interaction

Avoid animation simply because a library makes it easy.

### 1.5 Restraint
Premium does not mean maximum effects.

If removing an animation improves clarity, remove it.

---

# 2. Visual Direction

Do NOT lock the site into a generic dark trading-terminal aesthetic.

The references suggest a broader visual language:
- large typography
- generous whitespace
- strong visual environments
- product UI as an object in the composition
- soft atmospheric transitions
- editorial pacing
- carefully controlled interface density

AlgoFinex should find its own balance between:
- analytical precision
- visual atmosphere
- software credibility
- trading-product energy

Color palette must be finalized after the first hero exploration rather than assumed in advance.

---

# 3. Brand Personality

AlgoFinex should feel:

- intelligent
- composed
- technical
- premium
- credible
- precise
- modern
- ambitious

It should NOT feel:

- hype-driven
- casino-like
- childish
- overly corporate
- template-generated
- crypto-bro
- artificially futuristic

---

# 4. Landing Page Experience

The landing page should feel like a sequence of designed scenes.

Potential narrative:

1. Arrival / Hero
2. Product reveal
3. Why structured trading support
4. Indicator system
5. Interactive product demonstration
6. Market/data visualization
7. 3-day session conversion moment
8. Product ecosystem / dashboard
9. Trust / methodology
10. Pricing
11. Support / FAQ
12. Final conversion

This is a starting narrative, not a rigid requirement.

The implementation agent must adjust section order if the visual/story flow improves.

---

# 5. Hero Direction

The hero is the first major design experiment.

It should answer three questions immediately:

1. What is AlgoFinex?
2. Who is it for?
3. What can I do next?

Primary product emphasis:
- indicator/product interface
- trading visualization
- system behavior

Avoid generic stock imagery.

The hero should feel like a designed environment around the product rather than a plain SaaS hero with a screenshot below it.

Possible visual ingredients:
- original trading interface
- market structure layers
- signal visualization
- subtle atmospheric background
- oversized typography
- controlled depth
- one strong CTA
- secondary exploratory CTA

Do not finalize the hero until it has been visually reviewed.

---

# 6. Product Visualization

The product UI should be original.

Possible components:
- chart viewport
- market structure markers
- signal state
- indicator layers
- timeframe selector
- symbol selector
- analysis sidebar
- compact metrics
- signal explanation

The visualization may use deterministic demo data.

IMPORTANT:
Never present fabricated trading performance as real performance.

If demo data is used, clearly treat it as interface/demo data.

---

# 7. Motion Language

Motion should borrow principles from the references, not their exact animation.

Desired motion characteristics:
- slow and deliberate where atmospheric
- crisp and responsive for UI
- smooth scene transitions
- layered depth
- subtle parallax
- controlled entrance/exit
- progressive reveal
- occasional transformation of product UI

Avoid:
- constant floating
- excessive blur
- random particle fields
- bounce everywhere
- text flying in from random directions
- 3D spinning objects without purpose

Preferred animation architecture:
- CSS transitions for simple states
- Framer Motion for component/page transitions
- scroll-linked motion only where it materially improves storytelling
- React Bits for selected micro-interactions

---

# 8. Typography

Typography should create a strong hierarchy.

Requirements:
- one primary display/system type family
- restrained supporting type
- large editorial headlines
- compact data typography inside product UI
- consistent tracking
- strong contrast between marketing copy and interface text

Do not use five different font styles.

Font selection should be validated visually during hero implementation.

---

# 9. Components

Create reusable primitives:

Marketing:
- Navbar
- CTA
- SectionHeading
- FeatureStatement
- ProductFrame
- ProductPreview
- DataVisual
- TrustStrip
- PricingBlock
- FAQ
- Footer

Product:
- DashboardShell
- Sidebar
- Topbar
- MetricCard
- ChartPanel
- SignalPanel
- IndicatorCard
- SessionStatus
- ReferralPanel

---

# 10. React Bits Policy

Use React Bits only when the component fits the established AlgoFinex language.

Good candidates:
- text reveal
- subtle scroll reveal
- magnetic interaction
- button micro-interaction
- background effects
- carefully controlled visual transitions

Do not:
- import components simply to increase animation count
- stack multiple flashy effects
- preserve a React Bits demo's default styling when it conflicts with AlgoFinex
- allow library defaults to determine the brand

Every React Bits component must be customized to the AlgoFinex design system.

---

# 11. Responsive Design

Desktop is not the only target.

Required:
- large desktop
- standard desktop
- tablet
- mobile

Do not merely shrink desktop layouts.

Mobile may require:
- different section composition
- simplified visualizations
- alternate navigation
- reduced animation
- verticalized product UI
- different image cropping

Respect prefers-reduced-motion.

---

# 12. Accessibility

Minimum requirements:
- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- reduced-motion support
- descriptive labels for controls
- no information conveyed only through color

---

# 13. Performance

Avoid:
- unnecessary giant background videos
- unoptimized images
- heavy libraries for tiny effects
- loading every animation package globally

Use:
- lazy loading
- responsive images
- code splitting where useful
- GPU-friendly transforms
- efficient scroll listeners / motion APIs

---

# 14. Content Rules

Tone:
- confident
- specific
- concise
- technically grounded

Avoid:
- “revolutionary”
- “game-changing”
- “unlock infinite profits”
- “guaranteed”
- “90% win rate”
- unsupported performance claims

The product should sell the quality of the system, not fantasy returns.

---

# 15. Design Review Gate

Before expanding the page beyond the hero, review:

- Does it look like AlgoFinex?
- Could this be mistaken for an AI-generated template?
- Is the product visible enough?
- Are animations serving a purpose?
- Does the typography feel intentional?
- Is the visual rhythm varied?
- Are we borrowing principles rather than copying references?
- Does the design still work without decorative effects?

If the answer to the second question is yes, stop and redesign before continuing.

---

# 16. Phase 1 Deliverables

Create:

design/
├── DESIGN_DIRECTION.md
├── DESIGN_SYSTEM.md
├── MOTION_SPEC.md
├── COMPONENT_SPEC.md
├── RESPONSIVE_SPEC.md
└── REFERENCE_ANALYSIS.md

assets/
├── hero/
├── product/
├── indicators/
├── backgrounds/
└── brand/

Implementation starts only after the hero direction has been established.
