# Design System

> **Version:** 1.0
>
> **Project:** Student Hub
>
> **Philosophy:** Calm • Minimal • Modern • Functional • Accessible

---

# 1. Design Principles

Student Hub follows a clean SaaS-inspired interface focused on readability, consistency, and usability rather than decoration.

Core principles:

- Minimal visual noise
- Content first
- Consistent spacing
- Predictable interactions
- Accessible by default
- Neutral grayscale palette
- Responsive from mobile to desktop
- Smooth but subtle animations

---

# 2. Visual Style

## Keywords

- Modern
- Minimal
- Academic
- Professional
- Spacious
- Calm
- Clean

Avoid

- Heavy gradients
- Strong shadows
- Neon colors
- Glassmorphism
- Excessive animations
- Large borders
- Visual clutter

---

# 3. Color Palette

For the MVP we intentionally use only grayscale.

## Gray Scale

| Name | Hex | Usage |
|-------|------|----------------|
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

---

## Semantic Colors

Only semantic states should introduce color.

| State | Color |
|--------|---------|
| Success | Green |
| Warning | Amber |
| Error | Red |
| Information | Blue |

These should only appear when necessary.

---

# 4. Typography

## Font

Preferred

```
Inter
```

Fallback

```
Inter,
Segoe UI,
Roboto,
Helvetica,
Arial,
sans-serif
```

---

## Font Sizes

| Usage | Size |
|---------|------|
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

---

## Font Weight

| Weight | Usage |
|---------|-----------|
| 400 | Body |
| 500 | Buttons |
| 600 | Headings |
| 700 | Important Titles |

---

## Line Height

- Heading → 120%
- Body → 150%
- Paragraph → 160%

---

# 5. Spacing System

Use an **8px spacing system**.

| Token | Value |
|---------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

Never invent arbitrary spacing.

Examples

```
Padding
16px
24px
32px

Margins
24px
32px
48px
64px
```

---

# 6. Border Radius

| Usage | Radius |
|---------|--------|
| Small Inputs | 6px |
| Cards | 10px |
| Dialogs | 12px |
| Large Panels | 16px |
| Pills | 9999px |

---

# 7. Shadows

Minimal.

### Small

```
0 1px 2px rgba(0,0,0,.05)
```

### Medium

```
0 4px 10px rgba(0,0,0,.08)
```

### Large

```
0 10px 30px rgba(0,0,0,.10)
```

Never stack multiple shadows.

---

# 8. Borders

Default

```
1px solid Gray 200
```

Hover

```
Gray 300
```

Focus

```
2px
```

---

# 9. Layout

## Max Width

```
1280px
```

Content

```
1100px
```

Reading Width

```
700px
```

---

# 10. Grid

Desktop

```
12 Columns
```

Tablet

```
8 Columns
```

Mobile

```
4 Columns
```

Gutter

```
24px
```

---

# 11. Component Spacing

Card

```
Padding
24px
Gap
16px
```

Section

```
64px
```

Page

```
80px
```

Button

```
Horizontal
16px

Vertical
10px
```

Input

```
Padding
12px 16px
```

---

# 12. Iconography

Preferred icon library

```
Lucide
```

Sizes

| Usage | Size |
|---------|------|
| Small | 16px |
| Normal | 20px |
| Medium | 24px |
| Large | 32px |

Stroke

```
2px
```

---

# 13. Buttons

## Primary

- Filled
- Dark background
- White text

---

## Secondary

- Gray background
- Dark text

---

## Ghost

- Transparent
- Borderless

---

## Danger

- Red only when destructive

---

# 14. Cards

Cards should be simple.

```
Border

Light shadow

16–24px padding

Rounded corners
```

Avoid

- gradients
- glass
- thick borders

---

# 15. Forms

Rules

- Left aligned labels
- Labels above fields
- Required fields marked
- Helpful validation messages
- Consistent spacing

Field height

```
44px
```

---

# 16. Navigation

Sidebar

```
Fixed

Collapsible

Simple icons

Section labels
```

Top Navigation

Contains

- Search
- Notifications
- Profile
- Theme toggle

---

# 17. Tables

Requirements

- Zebra rows optional
- Sticky header
- Hover state
- Sort indicators
- Search
- Pagination

Padding

```
16px
```

---

# 18. Modals

Width

```
480px
```

Large

```
720px
```

Padding

```
24px
```

---

# 19. Motion

Animations should feel natural.

Duration

| Type | Duration |
|---------|----------|
| Fast | 150ms |
| Normal | 200ms |
| Slow | 300ms |

Easing

```
ease-out
```

Avoid

- bouncing
- spinning
- flashy transitions

---

# 20. Accessibility

Minimum touch target

```
44 × 44 px
```

Keyboard navigation

Required

Focus indicators

Required

Color contrast

WCAG AA minimum

---

# 21. Empty States

Should include

- Illustration or icon
- Clear message
- Explanation
- Primary action

---

# 22. Loading States

Use

- Skeleton loaders
- Progress bars
- Spinner only when necessary

Avoid blank screens.

---

# 23. Responsive Breakpoints

| Device | Width |
|---------|---------|
| Mobile | <640px |
| Tablet | 640px |
| Laptop | 1024px |
| Desktop | 1280px |
| Wide | 1536px |

---

# 24. Design Inspiration

The design language should draw inspiration from:

- Linear
- GitHub
- Notion
- Discord
- Vercel
- Stripe Dashboard
- Atlassian

Focus on simplicity rather than copying visual styles.

---

# 25. Design Checklist

Every new UI should satisfy the following:

- Consistent spacing
- Neutral grayscale palette
- Minimal visual clutter
- Clear typography hierarchy
- Accessible contrast
- Responsive layout
- Predictable interactions
- Reusable components
- Consistent iconography
- Proper empty and loading states
- Smooth, subtle animations
- Keyboard accessibility
- Mobile-friendly touch targets

---

# Philosophy

> "Interfaces should disappear, allowing students to focus on learning, collaboration, and community rather than the software itself."

```
Less Color.
More Space.

Less Decoration.
More Clarity.

Less Complexity.
More Consistency.
```