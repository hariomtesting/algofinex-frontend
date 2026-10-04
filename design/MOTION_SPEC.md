# ALGOFINEX — MOTION SPEC v1

## Motion philosophy

Motion should make the interface easier to understand and the story more memorable.

It should never feel like a component showcase.

## Four motion layers

### 1. Micro
Button hover, focus, icon movement.

Duration: approximately 150–300ms.

### 2. Component
Cards, product UI, chart elements.

Duration: approximately 300–700ms.

### 3. Scene
Large product/environment transitions.

Duration: approximately 700–1600ms depending on context.

### 4. Atmospheric
Very slow background/depth movement.

Should be subtle enough that users can ignore it.

## Scroll choreography

Use scroll-linked movement for:
- product reveal
- dashboard transformation
- layered visualization
- scene transitions

Do not animate every text block.

## Easing

Prefer smooth, composed easing.

Avoid cartoonish bounce unless the interaction specifically benefits from it.

## Reduced motion

Respect prefers-reduced-motion.

When reduced motion is enabled:
- disable parallax
- reduce transform distance
- remove unnecessary looping motion
- preserve information hierarchy

## React Bits

React Bits components are allowed only after their visual behavior is evaluated against this motion system.
