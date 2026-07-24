# Design System

## Philosophy

Calm, Minimal, Modern, Functional, Accessible.

Interfaces should disappear — students focus on community, not software.

---

# Visual Style

Modern, Minimal, Academic, Professional, Spacious, Calm, Clean.

Avoid: Heavy gradients, strong shadows, neon colors, glassmorphism, excessive animations, large borders, visual clutter.

---

# Color Palette

Grayscale only for MVP.

| Token | Hex | Usage |
|---------|---------|----------------------|
| Gray 50 | #FAFAFA | App background |
| Gray 100 | #F5F5F5 | Secondary background |
| Gray 200 | #E5E5E5 | Borders |
| Gray 300 | #D4D4D4 | Disabled |
| Gray 400 | #A3A3A3 | Placeholder |
| Gray 500 | #737373 | Secondary text |
| Gray 600 | #525252 | Icons |
| Gray 700 | #404040 | Headings |
| Gray 800 | #262626 | Primary text |
| Gray 900 | #171717 | High emphasis |

## Semantic Colors

| State | Color |
|-------------|-------|
| Success | Green |
| Warning | Amber |
| Error | Red |
| Information | Blue |

Only appear when necessary.

---

# Typography

## Font

Inter (fallback: Segoe UI, Roboto, Helvetica, Arial, sans-serif)

## Sizes

| Usage | Size |
|------------|------|
| Display | 48px |
| H1 | 36px |
| H2 | 30px |
| H3 | 24px |
| H4 | 20px |
| H5 | 18px |
| H6 | 16px |
| Body Large | 16px |
| Body | 14px |
| Small | 13px |
| Caption | 12px |

## Weight

| Weight | Usage |
|--------|-----------------|
| 400 | Body |
| 500 | Buttons |
| 600 | Headings |
| 700 | Important Titles |

## Line Height

- Heading: 120%
- Body: 150%
- Paragraph: 160%

---

# Spacing

8px spacing system.

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

---

# Border Radius

| Usage | Radius |
|--------------|--------|
| Small Inputs | 6px |
| Cards | 10px |
| Dialogs | 12px |
| Large Panels | 16px |
| Pills | 9999px |

---

# Shadows

| Size | Value |
|--------|-------------------------------|
| Small | 0 1px 2px rgba(0,0,0,.05) |
| Medium | 0 4px 10px rgba(0,0,0,.08) |
| Large | 0 10px 30px rgba(0,0,0,.10) |

Never stack multiple shadows.

---

# Borders

- Default: 1px solid Gray 200
- Hover: Gray 300
- Focus: 2px

---

# Layout

- Max Width: 1280px
- Content: 1100px
- Reading Width: 700px

## Grid

- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns
- Gutter: 24px

---

# Breakpoints

| Device | Width |
|---------|---------|
| Mobile | <640px |
| Tablet | 640px |
| Laptop | 1024px |
| Desktop | 1280px |
| Wide | 1536px |

---

# Icons

Library: Lucide

| Usage | Size |
|--------|------|
| Small | 16px |
| Normal | 20px |
| Medium | 24px |
| Large | 32px |

Stroke: 2px

---

# Motion

| Type | Duration |
|--------|----------|
| Fast | 150ms |
| Normal | 200ms |
| Slow | 300ms |

Easing: ease-out

Avoid: bouncing, spinning, flashy transitions.

---

# Accessibility

- Touch target: 44 x 44px minimum
- Keyboard navigation: Required
- Focus indicators: Required
- Color contrast: WCAG AA minimum

---

# Design Inspiration

Linear, GitHub, Notion, Discord, Vercel, Stripe Dashboard, Atlassian.

Focus on simplicity rather than copying visual styles.
