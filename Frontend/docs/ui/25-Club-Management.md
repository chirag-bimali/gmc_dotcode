# Club Management

## Goal

Allow university admins to oversee all clubs, create new clubs, verify clubs, assign admins, and archive clubs.

---

# User

University Admin

---

# Route

/admin/clubs

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

- Title: "Club Management"
- Total clubs count
- Create Club button (primary)

---

## Filters

Horizontal filter bar:

- All (default)
- Verified
- Unverified
- Archived

---

## Search

Search input: "Search clubs..."

---

## Clubs Table

| Column | Content |
|--------|---------|
| Logo + Name | Club name with small logo |
| Category | Category badge |
| Privacy | Public / Private badge |
| Members | Member count |
| Admin(s) | Primary admin name |
| Verified | Checkmark or dash |
| Status | Active / Archived badge |
| Actions | Dropdown menu |

### Actions Dropdown

- View Club
- Edit Club
- Verify (if unverified)
- Assign Admin
- Archive (if active)
- Unarchive (if archived)
- Delete Club

---

## Create Club Modal

Fields:

- Club Name (required)
- Description (textarea)
- Category (dropdown from club categories)
- Privacy (Public / Private toggle)
- Club Admin (user search/select — required)
- Logo (file upload, optional)
- Cover Image (file upload, optional)

---

## Assign Admin Modal

- Current admin(s) displayed
- User search input
- Select user from results
- Confirm assignment

---

# Empty State

"No clubs yet. Create the first club for your university!"

---

# Loading State

Skeleton table rows.

---

# Success States

Create: Toast "Club created successfully."

Verify: Toast "[Club Name] has been verified."

Archive: Toast "[Club Name] has been archived."

---

# Error States

Validation: Inline per field.

Server error: Toast.

---

# Interactions

- Create club: POST /api/clubs
- Verify: PUT /api/clubs/:id/verify
- Archive: PUT /api/clubs/:id/archive (confirmation)
- Unarchive: PUT /api/clubs/:id/unarchive
- Delete: DELETE /api/clubs/:id (confirmation with warning)
- Assign admin: PUT /api/clubs/:clubId/members/:userId/role { role: "admin" }
- Filter/Search: Re-fetch with params

---

# Responsive Behaviour

Desktop: Full table with all columns

Tablet: Table with horizontal scroll, hide some columns

Mobile: Card-based list view

---

# Accessibility

Verified checkmark has aria-label.

Delete confirmation has clear warning text.

Table sortable by column (keyboard accessible).

---

# Components Required

- Table
- Avatar
- Badge
- Button
- Dropdown
- Dialog
- Input
- Textarea
- Select
- Switch
- File Upload
- Search Input
- Toast
- Pagination

---

# Data

Consumes:

- GET /api/clubs
- GET /api/clubs/:id
- POST /api/clubs
- PUT /api/clubs/:id
- PUT /api/clubs/:id/verify
- PUT /api/clubs/:id/archive
- PUT /api/clubs/:id/unarchive
- DELETE /api/clubs/:id
- PUT /api/clubs/:clubId/members/:userId/role
- GET /api/club-categories
- GET /api/users (for admin search)

---

# Design Notes

Table should be information-rich but not cluttered.

Verified clubs have a subtle checkmark badge (not a full badge, just an icon).

Archived clubs visually muted (lower opacity or gray text).

Create club modal should be clean — one step, not multi-page.

Admin assignment uses user search with autocomplete.
