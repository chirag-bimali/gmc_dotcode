# Manage Events

## Goal

Allow club admins to create, edit, and manage events for their club.

---

# User

Club Admin

---

# Route

/clubs/:id/events/manage

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

- Title: "Manage Events"
- Club name context
- Create Event button (primary)

---

## Filters

Horizontal filter bar:

- Upcoming (default)
- Past
- All

---

## Events Table

| Column | Content |
|--------|---------|
| Cover | Thumbnail image |
| Title | Event name |
| Date | Event date and time |
| Venue | Location |
| RSVPs | Count of Going responses |
| Capacity | X / Y format |
| Actions | Dropdown menu |

### Actions Dropdown

- View Event
- Edit Event
- Delete Event

---

## Create / Edit Event Form (Modal or separate page)

Fields:

- Title (required)
- Description (rich textarea)
- Date (date picker, required)
- Time (time picker, required)
- Venue (text input)
- Capacity (number input, optional)
- Cover Image (file upload, optional)

Actions:

- Save / Create button
- Cancel

---

# Delete Confirmation

Dialog:

- "Are you sure you want to delete this event?"
- "All RSVPs will be removed. This cannot be undone."
- Cancel / Delete buttons

---

# Empty States

No events: "No events yet. Create your first event!"

No past events: "No past events."

---

# Loading State

Skeleton table rows.

Form: Skeleton fields while loading edit data.

---

# Error State

Table: Retry button.

Form: Inline validation errors + server error toast.

---

# Interactions

- Create: POST /api/clubs/:clubId/events
- Edit: PUT /api/events/:id
- Delete: DELETE /api/events/:id (confirmation)
- View: Navigate to /events/:id

---

# Responsive Behaviour

Desktop: Full table view, form in modal (720px)

Tablet: Table with fewer columns

Mobile: Card-based list, form as full-page

---

# Accessibility

Date/time pickers are keyboard accessible.

Table is navigable with screen readers.

Delete confirmation traps focus.

Form fields have proper labels and error associations.

---

# Components Required

- Table
- Button
- Dropdown
- Dialog
- Input
- Textarea
- Calendar (date picker)
- File Upload
- Badge
- Pagination

---

# Data

Consumes:

- GET /api/clubs/:clubId/events
- GET /api/events/:id
- POST /api/clubs/:clubId/events
- PUT /api/events/:id
- DELETE /api/events/:id

---

# Design Notes

Event table should show cover thumbnails for visual scanning.

Date column uses clean date formatting (not raw timestamp).

Create/Edit form should feel lightweight — not overwhelming.

Capacity shows as "12 / 50" with subtle progress indicator.

Past events grayed out slightly in table.
