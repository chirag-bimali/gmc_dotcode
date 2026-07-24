# Admin Sidebar Variant

## Context

This prompt generates the app shell sidebar in its "University Admin" state. The sidebar is the same component used everywhere, but with an additional "Admin" section appended at the bottom of the main nav.

## Sidebar Structure (Full — Admin Variant)

```
┌────────────────────────────────┐
│ [□] Student Hub                │  ← Logo area (white icon in white square + text)
│                                │
│ ── Navigation ──               │
│ ○ Dashboard                    │
│ ○ Discover Clubs               │
│ ○ My Clubs                     │
│ ○ Events                       │
│ ○ Notifications                │
│ ○ Profile                      │
│                                │
│ ── Admin ──                    │  ← Separator (border-t border-white/10, mt-4, pt-4)
│                                │     Label: "ADMIN" (text-[10px] uppercase tracking-widest text-gray-500 px-3 mb-2)
│ ○ Students                     │
│ ○ Manage Clubs                 │
│ ○ Reports              [3]     │  ← Optional red count badge (bg-red-500 text-white rounded-full w-5 h-5 text-[10px])
│ ○ Analytics                    │
│                                │
│ ── Bottom ──                   │
│ ○ Settings                     │
│                                │
│ ┌──────────────────────────┐   │
│ │ [A] Admin User           │   │  ← User card (avatar + name + email)
│ │     admin@university.edu │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

## Design Specs

- Sidebar width: 240px (expanded), 64px (collapsed — icons only, no text)
- Background: bg-black (primary)
- All nav text: text-gray-400, hover: text-white + bg-white/5
- Active item: bg-white/10, border-l-4 border-white, text-white font-bold
- Admin separator: border-t border-white/10 with "ADMIN" label in text-[10px] text-gray-500 uppercase tracking-widest

## Admin Nav Icons (Material Symbols)

| Item | Icon |
|------|------|
| Students | "school" |
| Manage Clubs | "workspaces" |
| Reports | "flag" |
| Analytics | "insert_chart" |

## Active State Example

When "Students" is active:
```
│ ● Students         │  ← border-l-4 border-white, bg-white/10, text-white font-bold
```

## Reports Badge

When there are pending reports, show a small badge:
```
│ ○ Reports    [3]   │  ← badge: min-w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center
```

## Collapsed State

When sidebar is collapsed (64px):
- Only show icons (centered)
- Admin section icons still visible
- "ADMIN" label hidden
- Separator still renders as a thin white/10 line
- User card shows avatar only
