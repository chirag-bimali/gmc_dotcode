# Admin — Student Management Page

## Context

This page is at `/admin/students`. Only visible to users with `UserRole.UniversityAdmin`. Uses the standard app shell with the "Admin" sidebar section active (the sidebar shows a separator labeled "Admin" above these nav items). Page title in topbar: "Students".

## Page Header

- Left: "Students" (text-3xl font-semibold) + total count badge (bg-black text-white rounded-full px-2.5 py-0.5 text-[11px] font-bold, e.g., "1,240")
- Subtitle: "Manage student accounts for Tribhuvan University" (text-base text-gray-500)
- Right: "Invite Students" button (primary, bg-black text-white, with "person_add" icon left)

## Controls Row (below header, mb-6)

Flex row, justify-between, items-center:

- **Left**: Search input (w-full sm:max-w-xs, with search icon left, placeholder "Search by name or email...")
- **Right**: Filter buttons row:
  - "Status" dropdown button (border, rounded-lg, with chevron_down icon)
  - "Faculty" dropdown button (border, rounded-lg, with chevron_down icon)
  - "Export" button (secondary, with download icon)

## Tabs (below controls)

```
[All Students] [Invited] [Active] [Disabled]
```

Active tab: border-b-2 border-black, text-black font-bold. Others: text-gray-500. Counts shown in each tab as a small gray badge.

## Student Table

Card (bg-white, border, rounded-xl, overflow-hidden, shadow-sm):

### Table Header (bg-gray-50, border-b)

| Column | Style |
|--------|-------|
| Name | th, includes avatar + name + email |
| Faculty | th |
| Status | th |
| Joined | th |
| Actions | th, text-right |

### Table Rows

Each row (hover:bg-gray-50, border-b border-gray-100):

- **Name cell**: avatar (w-10 h-10 rounded-full bg-gray-100 with initial letter) + name (text-[13px] font-bold) + email below (text-xs text-gray-500)
- **Faculty cell**: text-sm text-gray-700
- **Status cell**: badge/pill
  - Active: bg-emerald-50 text-emerald-700 border border-emerald-200
  - Invited: bg-amber-50 text-amber-700 border border-amber-200
  - Disabled: bg-red-50 text-red-700 border border-red-200
- **Joined cell**: relative time ("2 weeks ago"), text-sm text-gray-500
- **Actions cell**: "more_vert" icon button (rounded-full hover:bg-gray-200), opens dropdown:
  - View Profile
  - Resend Invite (if status Invited)
  - Disable Account (if status Active) — red text
  - Enable Account (if status Disabled)
  - Reset Password

### Table Footer (bg-gray-50, border-t, px-5 py-3)

- Left: "Showing 25 of 1,240 students" (text-xs text-gray-500)
- Right: pagination — prev/next chevron buttons (border, rounded, disabled state = opacity-50)

## Invite Modal (triggered by "Invite Students" button)

Overlay modal (centered, max-w-md, bg-white, rounded-xl, p-6, shadow-xl):

- **Header**: "Invite Students" (text-xl font-bold) + close X button (top-right)
- **Tabs inside modal**: "Single Invite" | "Bulk Import"
- **Single Invite tab**:
  - Email input (placeholder "student@university.edu")
  - Faculty select dropdown
  - "Send Invitation" button (primary, full-width)
- **Bulk Import tab**:
  - Upload area (dashed border, rounded-lg, h-32, "Upload CSV file" with upload icon)
  - Helper text: "CSV should contain columns: email, faculty" (text-xs text-gray-500)
  - "Import & Send" button (primary, full-width)

## Empty State

If no students match filters:
- Centered content (py-16)
- Icon: "group" (text-6xl text-gray-200)
- "No students found" (text-lg font-medium text-gray-500)
- "Try adjusting your search or filters" (text-sm text-gray-400)
