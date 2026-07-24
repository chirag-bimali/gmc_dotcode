# Club Manage Tab

## Context

This is the 5th tab ("Manage") inside the Club Detail page. It is only visible to users who are admins of this specific club. The page uses the standard app shell (black sidebar + white topbar). The club detail header with banner, logo, name, badges, and tab navigation is already rendered above this content.

## Active Tab State

```
About | Feed | Events | Members | [Manage] ← active (border-b-2 border-black, font-bold)
```

## Page Content

### Section 1: Club Settings

A card (bg-white, border, rounded-xl, p-6) containing an edit form:

- **Header**: "Club Settings" (text-lg font-bold) + "Save Changes" button (primary, top-right)
- **Form fields** (grid 2 columns on desktop, 1 on mobile):
  - Club Name — text input, pre-filled
  - Category — select dropdown (Technology, Sports, Music, etc.)
  - Privacy — toggle/select (Public / Private)
  - Description — textarea, 3 rows, pre-filled
- **Cover Image**: upload area (dashed border, gray-100 bg, h-32, "Click to upload or drag" with upload icon)
- Save button at form bottom (primary, full-width on mobile)

### Section 2: Pending Join Requests

A card (bg-white, border, rounded-xl) with:

- **Header row**: "Pending Requests" (text-lg font-bold) + count badge (bg-black text-white rounded-full px-2 text-[11px])
- **Empty state**: "No pending requests" (centered, text-gray-400, py-8)
- **With requests — list**:
  - Each row: avatar (w-10 h-10 rounded-full bg-gray-100) + name (font-bold text-[13px]) + email (text-xs text-gray-500) + "Approve" button (primary, small) + "Reject" button (secondary, small)
  - Rows separated by border-b border-gray-100
  - Hover: bg-gray-50

### Section 3: Danger Zone

A card with red-tinted border (border-red-200):

- **Header**: "Danger Zone" (text-lg font-bold text-red-600)
- **Row**: "Archive this club" description text (text-sm text-gray-500) + "Archive Club" button (bg-red-50 text-red-600 border border-red-200 rounded-lg)

## Layout

```
Full-width, single column, space-y-6 between sections.
No sidebar column on this tab — full content width.
```

## Interaction Notes

- "Save Changes" should appear disabled (opacity-50) until form is dirty
- Approve/Reject buttons show loading spinner on click
- Archive button should trigger a confirmation modal
