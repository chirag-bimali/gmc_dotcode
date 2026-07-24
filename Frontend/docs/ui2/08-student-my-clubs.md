# My Clubs Page

## Context

This page is at `/my-clubs`. Available to all authenticated users. Shows only the clubs the current student has joined. Uses the standard app shell. Page title in topbar: "My Clubs".

## Page Header

- "My Clubs" (text-3xl font-semibold)
- Subtitle: "Clubs you've joined and your activity" (text-base text-gray-500)

## Tabs

```
[Joined] [Pending] [Administering]
```

- Active: border-b-2 border-black font-bold
- "Pending" shows count if user has pending join requests
- "Administering" shows clubs where user is MembershipRole.Admin

## Joined Tab — Club Cards

Grid: 1 col mobile, 2 cols tablet, 3 cols desktop. Gap-6.

### My Club Card

Different from Discover cards — shows personal engagement metrics.

Card (bg-white, border, rounded-xl, overflow-hidden, hover:shadow-md transition):

- **Top section** (flex items-center gap-3, p-5, border-b border-gray-100):
  - Club icon (w-12 h-12 bg-black rounded-lg flex items-center justify-center, white icon)
  - Name (text-base font-bold) + category below (text-xs text-gray-500)
  - Right: your role badge — "Member" (bg-gray-100 text-gray-700 rounded-full text-[11px]) or "Admin" (bg-black text-white rounded-full text-[11px])

- **Stats row** (flex justify-between, px-5 py-3, bg-gray-50):
  - "12 posts" (text-xs text-gray-500)
  - "3 events" (text-xs text-gray-500)
  - "1.2k members" (text-xs text-gray-500)

- **Actions** (p-5, flex gap-2):
  - "Open" button (primary, flex-1)
  - "Leave" button (text-red-500 border border-red-200 bg-red-50, small icon "logout")

## Pending Tab

List of clubs with pending join requests:

Card per pending club:
- Club icon + name + "Requested X days ago" (text-xs text-gray-400)
- Status: "Pending Approval" badge (bg-amber-50 text-amber-700)
- Action: "Cancel Request" button (secondary, text-red-500)

## Administering Tab

Same card layout as Joined, but:
- Role badge always shows "Admin" (bg-black text-white)
- Extra action button: "Manage" (secondary, border) — navigates to club manage tab

## Empty States

**No joined clubs:**
- Icon: "group_add" (text-6xl text-gray-200)
- "You haven't joined any clubs yet" (text-lg font-medium)
- "Discover clubs" link button (primary)

**No pending requests:**
- "No pending requests" (text-sm text-gray-400, py-8)

**Not administering any clubs:**
- "You're not an admin of any clubs" (text-sm text-gray-400, py-8)
