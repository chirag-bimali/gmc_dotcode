# Manage Members

## Goal

Allow club admins to view, approve, reject, and manage club members and their roles.

---

# User

Club Admin

---

# Route

/clubs/:id/members

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar (Club Admin navigation)
- Top Navigation
- Main Content

---

# Page Sections

## Header

Contains:

- Title: "Manage Members"
- Club name context
- Total member count badge

---

## Tabs

- Members (default)
- Pending Requests (badge with count)

---

## Members Tab

### Search

Search input to filter members by name.

### Member Table

| Column | Content |
|--------|---------|
| Avatar + Name | Clickable → profile |
| Role | Member / Admin (badge) |
| Joined Date | Relative timestamp |
| Actions | Dropdown menu |

### Actions Dropdown (per member)

- Promote to Admin
- Demote to Member
- Remove from Club

Remove triggers confirmation dialog.

---

## Pending Requests Tab (Private Clubs)

List of pending join requests:

Each item:

- User avatar
- User name
- Faculty / Department
- Request date
- Approve button (green)
- Reject button (red)

Bulk actions:

- Approve All
- Reject All

---

# Empty States

No members: "This club has no members yet."

No pending requests: "No pending join requests."

---

# Loading State

Skeleton table rows.

---

# Error State

Retry button above table.

---

# Interactions

- Approve: PUT /api/clubs/:clubId/members/:userId/approve
- Reject: PUT /api/clubs/:clubId/members/:userId/reject
- Promote: PUT /api/clubs/:clubId/members/:userId/role { role: "admin" }
- Demote: PUT /api/clubs/:clubId/members/:userId/role { role: "member" }
- Remove: DELETE /api/clubs/:clubId/members/:userId (confirmation dialog)
- Search: Client-side filter

---

# Responsive Behaviour

Desktop: Full table with all columns

Tablet: Table with horizontal scroll

Mobile: Card-based list instead of table

---

# Accessibility

Table has proper th scope attributes.

Actions dropdown has aria-label per member.

Confirmation dialogs trap focus.

Bulk action buttons announce count.

---

# Components Required

- Table
- Avatar
- Badge
- Button
- Dropdown
- Dialog
- Search Input
- Tabs
- Pagination

---

# Data

Consumes:

- GET /api/clubs/:clubId/members
- PUT /api/clubs/:clubId/members/:userId/approve
- PUT /api/clubs/:clubId/members/:userId/reject
- PUT /api/clubs/:clubId/members/:userId/role
- DELETE /api/clubs/:clubId/members/:userId

---

# Design Notes

Member table should be clean and scannable.

Role badges use subtle styling (gray for member, dark for admin).

Pending requests section has slightly elevated urgency — use count badge.

Destructive actions (remove) use red/danger styling.

Compact table rows — 16px vertical padding.
