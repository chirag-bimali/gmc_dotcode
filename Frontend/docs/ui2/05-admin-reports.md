# Admin — Reports Page

## Context

This page is at `/admin/reports`. Only visible to `UserRole.UniversityAdmin`. Uses the standard app shell. Page title in topbar: "Reports". Shows a moderation queue of user-submitted reports.

## Page Header

- Left: "Reports" (text-3xl font-semibold) + pending count badge (bg-red-500 text-white rounded-full px-2.5 py-0.5 text-[11px] font-bold, e.g., "7")
- Subtitle: "Review and moderate reported content" (text-base text-gray-500)

## Tabs

```
[Pending] [Resolved] [All]
```

Active = border-b-2 border-black font-bold. Each tab shows count in parentheses.

## Report List

Stacked cards (space-y-4), each card (bg-white, border, rounded-xl, p-5):

### Report Card Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Type Badge]  [Target: "Post in Coding Club"]     [2h ago]  │
│                                                             │
│ Reported by: [avatar] Student Name                          │
│ Reason: Inappropriate content / Spam / Harassment           │
│                                                             │
│ ┌─ Preview ──────────────────────────────────────────────┐  │
│ │ [Truncated content of the reported post/comment, 2     │  │
│ │  lines max, text-sm text-gray-600, bg-gray-50 p-3     │  │
│ │  rounded-lg]                                           │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                             │
│ [View Full Content]  [Dismiss]  [Remove Content]  [Warn User]│
└─────────────────────────────────────────────────────────────┘
```

### Report Card Details

- **Type badge** (top-left):
  - Post: bg-blue-50 text-blue-700
  - Comment: bg-purple-50 text-purple-700
  - User: bg-orange-50 text-orange-700
- **Target**: text-sm font-medium text-black (what was reported — "Post in Coding Club", "Comment by Alex", etc.)
- **Time**: text-xs text-gray-400, right-aligned
- **Reporter row**: small avatar (w-6 h-6) + "Reported by" label + name, text-sm text-gray-500
- **Reason**: text-sm text-gray-700, with a reason badge (bg-gray-100 rounded px-2 py-0.5 text-[11px])
- **Preview block**: bg-gray-50 rounded-lg p-3, truncated reported content (line-clamp-2)
- **Actions row** (flex gap-2, mt-4, border-t border-gray-100, pt-4):
  - "View Full" — text button (text-black underline, text-sm)
  - "Dismiss" — secondary button (border, rounded-lg)
  - "Remove Content" — warning button (bg-red-50 text-red-600 border border-red-200)
  - "Warn User" — warning button (bg-amber-50 text-amber-700 border border-amber-200)

## Resolved Reports

Same card layout but:
- Actions replaced by resolution badge:
  - "Dismissed" — bg-gray-100 text-gray-600
  - "Content Removed" — bg-red-50 text-red-600
  - "User Warned" — bg-amber-50 text-amber-700
  - "User Disabled" — bg-red-100 text-red-700
- Resolved by + timestamp (text-xs text-gray-400)

## Empty State (when no pending reports)

- Icon: "verified_user" (text-6xl text-gray-200)
- "All clear!" (text-lg font-medium text-gray-600)
- "No pending reports to review" (text-sm text-gray-400)
- Subtle green accent feel (celebratory)

## Stats Row (above the list, optional)

Four compact stat pills (flex gap-3):
- "7 Pending" (bg-red-50 text-red-600 px-3 py-1 rounded-full text-[13px] font-medium)
- "23 This Week" (bg-gray-100 text-gray-700)
- "156 Total" (bg-gray-100 text-gray-700)
- "92% Resolved" (bg-emerald-50 text-emerald-700)
