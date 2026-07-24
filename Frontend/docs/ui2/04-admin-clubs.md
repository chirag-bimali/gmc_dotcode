# Admin — Club Management Page

## Context

This page is at `/admin/clubs`. Only visible to `UserRole.UniversityAdmin`. Uses the standard app shell. Page title in topbar: "Manage Clubs". The sidebar "Manage Clubs" item is active (left-border highlight).

## Page Header

- Left: "Manage Clubs" (text-3xl font-semibold) + count badge (e.g., "24")
- Subtitle: "Create, verify, and manage clubs across the university" (text-base text-gray-500)
- Right: "Create Club" button (primary, bg-black text-white, with "add" icon)

## Controls Row

Flex row, justify-between:

- **Left**: Search input (max-w-xs, search icon, placeholder "Search clubs...")
- **Right**: Filter buttons:
  - "Category" dropdown (border, rounded-lg)
  - "Status" dropdown (border, rounded-lg) — values: All, Active, Pending Verification, Archived

## Club Cards Grid

Grid: 1 col mobile, 2 cols tablet, 3 cols desktop. Gap-6.

### Club Admin Card (different from student discover card)

Card (bg-white, border, rounded-xl, p-5, hover:shadow-md transition):

- **Top row** (flex justify-between):
  - Left: Club icon (w-10 h-10 bg-black rounded-lg flex items-center justify-center, white icon inside) + Club name (text-base font-bold) vertically stacked with category (text-xs text-gray-500)
  - Right: Status badge:
    - Active: bg-emerald-50 text-emerald-700
    - Pending: bg-amber-50 text-amber-700
    - Archived: bg-gray-100 text-gray-500
- **Stats row** (flex gap-4, mt-3):
  - Members count (icon "group" + number, text-sm text-gray-500)
  - Privacy (icon "lock" or "public" + label, text-sm text-gray-500)
  - Events count (icon "event" + number, text-sm text-gray-500)
- **Admin row** (mt-3, flex items-center gap-2):
  - Small avatar (w-6 h-6) + "Managed by" + admin name (text-xs text-gray-500)
- **Actions row** (mt-4, flex gap-2):
  - "View" button (secondary, small)
  - "Verify" button (primary, small) — only if status is Pending
  - "Archive" button (text-red-600, small, border-red-200) — only if status is Active
  - "more_horiz" icon button for overflow menu

## Create Club Modal

Overlay modal (max-w-lg, bg-white, rounded-xl, p-6):

- **Header**: "Create New Club" (text-xl font-bold) + X close
- **Form fields** (stacked, space-y-4):
  - Club Name — text input
  - Category — select (Technology, Sports, Music, Photography, Debate, Robotics, Management, General)
  - Privacy — radio group: Public / Private
  - Description — textarea, 3 rows
  - Assign Admin — search/select input ("Search for a student to assign as club admin")
- **Actions**: "Cancel" (secondary) + "Create Club" (primary)

## Empty State

- Icon: "groups" (text-6xl text-gray-200)
- "No clubs found" (text-lg font-medium)
- "Adjust filters or create a new club" (text-sm text-gray-400)
