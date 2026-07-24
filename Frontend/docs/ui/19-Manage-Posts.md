# Manage Posts

## Goal

Allow club admins to moderate, pin, and manage all posts in their club.

---

# User

Club Admin

---

# Route

/clubs/:id/posts/manage

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

- Title: "Manage Posts"
- Club name context
- Create Post button (primary)

---

## Filters

Horizontal filter bar:

- All Posts (default)
- Pinned
- Announcements
- Reported

---

## Search

Search input to filter posts by title or content.

---

## Posts Table / List

| Column | Content |
|--------|---------|
| Type | Badge (Text, Image, Announcement, Poll) |
| Title / Preview | First line of content |
| Author | Avatar + name |
| Date | Created date |
| Engagement | Like count, Comment count |
| Pinned | Pin icon indicator |
| Actions | Dropdown menu |

### Actions Dropdown

- View Post
- Pin / Unpin
- Edit
- Delete

---

# Pin Behavior

Maximum 3 pinned posts.

If 3 already pinned and admin tries to pin another: "Maximum pinned posts reached. Unpin one first."

---

# Delete Confirmation

Dialog:

- "Are you sure you want to delete this post?"
- "This action cannot be undone."
- Cancel / Delete buttons

---

# Empty States

No posts: "No posts in this club yet. Create the first one!"

No results for filter: "No posts match your filter."

---

# Loading State

Skeleton table rows.

---

# Error State

Retry button.

---

# Interactions

- Pin: PUT /api/posts/:id/pin
- Unpin: PUT /api/posts/:id/unpin
- Delete: DELETE /api/posts/:id (confirmation)
- Edit: Opens post editor (same as create but pre-filled)
- View: Navigate to post in feed context
- Create: Opens post composer

---

# Responsive Behaviour

Desktop: Full table view

Tablet: Table with fewer columns (hide engagement)

Mobile: Card-based list view

---

# Accessibility

Table has sortable column headers (aria-sort).

Pin status announced to screen readers.

Delete confirmation traps focus.

---

# Components Required

- Table
- Badge
- Avatar
- Button
- Dropdown
- Dialog
- Search Input
- Filter Chips
- Pagination

---

# Data

Consumes:

- GET /api/clubs/:clubId/posts
- PUT /api/posts/:id/pin
- PUT /api/posts/:id/unpin
- PUT /api/posts/:id
- DELETE /api/posts/:id

---

# Design Notes

Table should prioritize scanability.

Type badges use distinct but subtle colors/icons.

Pinned indicator uses a small pin icon (gold/amber tone for emphasis).

Keep destructive actions visually separated in dropdown.

Engagement numbers in muted style — informational, not primary.
