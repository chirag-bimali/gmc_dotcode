# Invitations

## Goal

Allow university admins to invite individual students or bulk-import invitations, and track invitation status.

---

# User

University Admin

---

# Route

/invitations

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

- Title: "Invitations"
- Total invitations count
- Invite Student button (primary)
- Bulk Invite button (secondary)

---

## Filters

Horizontal filter bar:

- All (default)
- Pending
- Accepted
- Expired

---

## Search

Search input: "Search by email..."

---

## Invitations Table

| Column | Content |
|--------|---------|
| Email | Invited email address |
| Status | Badge (Pending, Accepted, Expired) |
| Invited By | Admin name |
| Sent Date | When invitation was created |
| Expires | Expiration date |
| Actions | Dropdown menu |

### Actions Dropdown

- Resend Invitation (if pending or expired)
- Copy Invite Link (if pending)
- Revoke (if pending)

---

## Invite Student Modal

Triggered by "Invite Student" button:

- Email input (required, must be valid email)
- Faculty dropdown (optional)
- Department dropdown (optional, depends on faculty)
- Batch dropdown (optional)
- Send Invitation button

---

## Bulk Invite Modal

Triggered by "Bulk Invite" button:

- File upload (CSV)
- Template download link ("Download template")
- Preview parsed rows
- Column: email (required), faculty, department, batch
- Send All button
- Progress indicator during send
- Results summary (sent, failed, duplicates)

---

# Status Badges

| Status | Style |
|----------|--------------|
| Pending | Blue badge |
| Accepted | Green badge |
| Expired | Gray badge |

---

# Empty State

"No invitations sent yet. Invite your first students!"

---

# Loading State

Skeleton table rows.

---

# Success States

Single invite: Toast "Invitation sent to [email]"

Bulk invite: Summary card "X sent, Y failed, Z duplicates"

Resend: Toast "Invitation resent to [email]"

---

# Error States

Invalid email: Inline validation.

Duplicate email: "This email has already been invited."

Server error: Toast with error.

Bulk errors: Per-row error list.

---

# Interactions

- Send invitation: POST /api/invitations
- Bulk invite: POST /api/invitations/bulk
- Resend: POST /api/invitations/:id/resend
- Filter: Re-fetch with query params
- Search: Debounced filter

---

# Responsive Behaviour

Desktop: Full table with all columns

Tablet: Table with horizontal scroll

Mobile: Card-based list, modals become full-page

---

# Accessibility

Table has proper headers.

Modals trap focus.

Status badges have aria-label.

Progress indicators announced to screen readers.

---

# Components Required

- Table
- Badge
- Button
- Dropdown
- Dialog
- Input
- Select
- File Upload
- Toast
- Pagination

---

# Data

Consumes:

- GET /api/invitations
- POST /api/invitations
- POST /api/invitations/bulk
- POST /api/invitations/:id/resend
- GET /api/universities/:universityId/faculties
- GET /api/faculties/:facultyId/departments
- GET /api/universities/:universityId/batches

---

# Design Notes

Table should clearly show invitation lifecycle.

Expired invitations should look visually muted.

Resend action should be easy to find — students often miss emails.

Bulk import flow should be guided — template + preview + confirm pattern.

Success/failure counts after bulk send help admins understand what happened.
