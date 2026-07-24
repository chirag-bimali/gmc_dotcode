# Reports

## Goal

Allow university admins to review and moderate content reports submitted by students.

---

# User

University Admin

---

# Route

/reports

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar (University Admin navigation)
- Top Navigation
- Main Content

---

# Page Sections

## Header

Contains:

- Title: "Reports"
- Pending reports count badge
- Filter by status

---

## Filters

Horizontal filter bar:

- All (default)
- Pending (with count badge)
- Reviewed
- Resolved
- Dismissed

---

## Reports Table

| Column | Content |
|--------|---------|
| Type | Report type badge (Spam, Harassment, Abuse, Inappropriate) |
| Target | What was reported (Post, Comment, User) + preview |
| Reported By | Avatar + name |
| Date | Reported date |
| Status | Badge (Pending, Reviewed, Resolved, Dismissed) |
| Actions | Dropdown menu |

### Actions Dropdown

- View Details
- Mark as Reviewed
- Resolve
- Dismiss

---

## Report Detail View (slide-out panel or modal)

Contains:

- Report type
- Reported content preview:
  - If post: Show post content
  - If comment: Show comment content
  - If user: Show user profile summary
- Reporter information (who reported, when)
- Reason provided by reporter
- History (status changes, who reviewed)
- Action buttons:
  - Resolve (take action — remove content / warn user)
  - Dismiss (mark as not a violation)

---

# Status Flow

```
Pending → Reviewed → Resolved
                   → Dismissed
```

---

# Empty State

"No reports to review. Your community is doing great!"

---

# Loading State

Skeleton table rows.

---

# Error State

Retry button.

---

# Interactions

- View details: GET /api/reports/:id (open detail panel)
- Review: PUT /api/reports/:id/review
- Resolve: PUT /api/reports/:id/resolve (confirmation)
- Dismiss: PUT /api/reports/:id/dismiss (optional reason)
- Filter: Re-fetch with status param

---

# Responsive Behaviour

Desktop: Table with slide-out detail panel on right

Tablet: Table, detail opens as modal

Mobile: Card-based list, detail as full page

---

# Accessibility

Report type badges have aria-label.

Detail panel is a dialog with proper focus management.

Status changes announced to screen readers.

---

# Components Required

- Table
- Badge
- Avatar
- Button
- Dropdown
- Drawer / Dialog
- Card
- Toast
- Pagination

---

# Data

Consumes:

- GET /api/reports
- GET /api/reports/:id
- PUT /api/reports/:id/review
- PUT /api/reports/:id/resolve
- PUT /api/reports/:id/dismiss

---

# Design Notes

Pending reports should feel urgent — count badge, sorted first.

Report type badges use meaningful styling (Harassment = red, Spam = orange, etc.).

Detail panel shows the actual reported content so admins can make informed decisions.

Action buttons in detail panel are clear — Resolve (green) vs Dismiss (gray).

Keep the moderation workflow efficient — minimize clicks to resolve.
