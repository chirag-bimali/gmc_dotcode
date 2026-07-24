# Student Management

## Goal

Allow university admins to view, search, manage, and moderate all students in their university.

---

# User

University Admin

---

# Route

/students

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

- Title: "Student Management"
- Total students count
- Invite Students button (primary)
- Bulk Import button (secondary)

---

## Filters

Horizontal filter bar:

- All (default)
- Active
- Pending Profile
- Invited
- Disabled

---

## Search

Search input: "Search by name or email..."

---

## Students Table

| Column | Content |
|--------|---------|
| Avatar + Name | Full name |
| Email | University email |
| Faculty | Faculty name |
| Batch | Batch name |
| Status | Badge (Active, Pending, Invited, Disabled) |
| Joined | Date |
| Actions | Dropdown menu |

### Actions Dropdown

- View Profile
- Reset Password
- Disable Account (if active)
- Enable Account (if disabled)
- Remove Student

---

## Bulk Import Modal

Triggered by "Bulk Import" button:

- File upload (CSV)
- Template download link
- Preview of parsed data (first 5 rows)
- Column mapping verification
- Import button
- Error report (if any rows fail)

CSV format: email, faculty, department, batch

---

# Status Badges

| Status | Style |
|---------|--------------|
| Active | Green badge |
| Pending | Yellow badge |
| Invited | Blue badge |
| Disabled | Gray badge |

---

# Empty State

"No students yet. Invite your first students to get started."

---

# Loading State

Skeleton table rows.

---

# Error State

Table: Retry button.

Bulk import: Error list per failed row.

---

# Interactions

- Disable: PUT /api/users/:id/disable (confirmation dialog)
- Enable: PUT /api/users/:id/enable
- Remove: DELETE /api/users/:id (confirmation dialog with warning)
- Reset Password: PUT /api/users/:id/reset-password (confirmation)
- Filter: Re-fetch with query params
- Search: Debounced server-side search
- Bulk import: POST /api/invitations/bulk

---

# Responsive Behaviour

Desktop: Full table with all columns

Tablet: Table with horizontal scroll, hide faculty/batch columns

Mobile: Card-based list view

---

# Accessibility

Table has proper scope and headers.

Status badges have aria-label.

Destructive actions require confirmation with clear messaging.

Bulk import modal traps focus.

---

# Components Required

- Table
- Avatar
- Badge
- Button
- Dropdown
- Dialog
- Search Input
- Filter Chips
- File Upload
- Pagination
- Toast

---

# Data

Consumes:

- GET /api/users
- PUT /api/users/:id/disable
- PUT /api/users/:id/enable
- DELETE /api/users/:id
- PUT /api/users/:id/reset-password
- POST /api/invitations/bulk

---

# Design Notes

Table is the hero element — clean, scannable, information-dense.

Status badges provide at-a-glance understanding.

Destructive actions use danger styling and require confirmation.

Bulk import should guide the user — show template, validate before submitting.

Pagination at bottom with page size selector.
