# Notifications Page

## Context

This page is at `/notifications`. Available to all authenticated users. Uses the standard app shell. Page title in topbar: "Notifications".

## Page Header

- "Notifications" (text-3xl font-semibold)
- Right: "Mark all as read" text button (text-sm font-medium text-black hover:underline)

## Filter Row

Horizontal scrollable chips:
```
[All] [Clubs] [Events] [Mentions] [System]
```
Active = bg-black text-white. Inactive = bg-white border text-gray-500.

## Notification List

Single column (max-w-[700px] mx-auto), stacked notifications (space-y-1):

### Notification Item

```
┌─────────────────────────────────────────────────────────────┐
│ [●] [Icon bg] │ Notification text                  [2h ago] │
│               │ Subtext / context                           │
└─────────────────────────────────────────────────────────────┘
```

Each item (flex items-start gap-3, px-4 py-3, rounded-lg, hover:bg-gray-50, transition):

- **Unread indicator**: small dot (w-2 h-2 bg-black rounded-full, mt-2) — hidden for read notifications
- **Icon container** (w-10 h-10 rounded-full flex items-center justify-center shrink-0):
  - Club activity: bg-blue-50, icon "groups" in text-blue-600
  - Event: bg-purple-50, icon "event" in text-purple-600
  - Mention: bg-amber-50, icon "alternate_email" in text-amber-600
  - System: bg-gray-100, icon "info" in text-gray-600
  - Like: bg-red-50, icon "favorite" in text-red-500
  - Comment: bg-emerald-50, icon "chat_bubble" in text-emerald-600
- **Content**:
  - Main text: text-sm text-black (bold the actor name, e.g., "**Alex Chen** liked your post")
  - Subtext: text-xs text-gray-500 (context, e.g., "in Coding Club")
- **Timestamp**: text-xs text-gray-400, right-aligned, shrink-0

### Unread vs Read Styling

- Unread: bg-blue-50/30 (very subtle tint) + left dot visible
- Read: bg-transparent, no dot

### Grouped by Time

Separator labels between groups:
- "Today" (text-xs font-medium text-gray-400 uppercase tracking-wider, px-4, py-2)
- "Yesterday"
- "This Week"
- "Earlier"

## Notification Types (example content)

| Type | Example |
|------|---------|
| Club join approved | "Your request to join **Robotics Guild** was approved" |
| New event | "**Coding Club** posted a new event: Winter Hackathon" |
| Like | "**Sarah** liked your post in Photography Society" |
| Comment | "**David** commented on your post" |
| Mention | "**Alex** mentioned you in Coding Club" |
| Event reminder | "**Winter Hackathon** starts tomorrow at 10:00 AM" |
| System | "Welcome to Student Hub! Complete your profile to get started" |

## Empty State

- Icon: "notifications_none" (text-6xl text-gray-200)
- "No notifications yet" (text-lg font-medium text-gray-500)
- "You'll see updates from your clubs and events here" (text-sm text-gray-400)

## Load More

At the bottom: "Load older notifications" button (secondary, border, centered, full-width max-w-sm)
