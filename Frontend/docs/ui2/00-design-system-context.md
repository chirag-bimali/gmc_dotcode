# Design System Context (Include in every prompt)

Use this as a shared reference block at the top of each page prompt to maintain visual consistency across all generated screens.

## Global Design Tokens

```
Font Family: Inter (400, 500, 600, 700, 800)
Background: #FAFAFA (gray-50)
Surface: #FFFFFF
Primary: #000000 (black)
On-Primary: #FFFFFF
Secondary text: #5e5e5e
Muted text: #A3A3A3 (gray-400)
Borders: #E5E5E5 (gray-200)
Hover border: #D4D4D4 (gray-300)
Success: #10B981
Warning: #F59E0B
Error: #EF4444
Info: #3B82F6
```

## Layout Shell (already built — do NOT regenerate)

- **Sidebar** (left, 240px, bg: black, text: white, collapsible to 64px)
  - Logo: white "school" icon in white rounded square + "Student Hub" text
  - Nav items: icon + label, active = left-4 white border + bg-white/10
  - User card at bottom: avatar + name + email
- **Topbar** (fixed, h-64px, bg: white, border-bottom)
  - Left: hamburger (mobile) + page title (bold)
  - Center: search input (bg gray-100, rounded-lg)
  - Right: notification bell (red dot) + message icon + divider + avatar dropdown
- **Content area**: bg gray-50, padding 24-32px, max-width 1100px centered

## Component Patterns

- **Cards**: bg-white, border border-gray-200, rounded-xl, p-5/p-6, shadow-sm on hover
- **Buttons primary**: bg-black text-white rounded-lg px-5 py-2.5 text-[13px] font-bold
- **Buttons secondary**: bg-gray-100 text-gray-800 border border-gray-200 rounded-lg
- **Inputs**: h-10, border border-gray-200, rounded-lg, px-3, focus:ring-1 focus:ring-black
- **Badge/pill**: px-2 py-0.5, rounded-full, text-[11px] font-bold uppercase tracking-wider
- **Table**: bg-white border rounded-xl, thead bg-gray-50, th text-[11px] uppercase tracking-wider text-gray-500
- **Avatar**: rounded-full, border-2 border-white for stacks
- **Tabs**: flex gap-8, active = border-b-2 border-black text-black font-bold, inactive = text-gray-500
- **Filter chips**: px-4 py-1.5 rounded-full text-[13px] font-medium, active = bg-black text-white

## Typography Scale

```
Display:     48px / 1.2 / 700 / -0.02em tracking
Headline H1: 36px / 1.2 / 600
Headline H2: 30px / 1.2 / 600
Headline H3: 24px / 1.2 / 600
Headline H4: 20px / 1.2 / 600
Body LG:     16px / 1.5 / 400
Body MD:     14px / 1.6 / 400
Label SM:    13px / 1.5 / 500
Caption:     12px / 1.5 / 400
```

## Icons

Use Material Symbols Outlined (not filled, weight 400) for all icons. Do not use Lucide or other icon sets.

## Spacing System

```
xs: 4px    sm: 8px    md: 16px    lg: 24px
xl: 32px   2xl: 48px  3xl: 64px   4xl: 96px
```
