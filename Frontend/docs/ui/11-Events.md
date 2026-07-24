# Events

## Goal

Show all upcoming events across the student's joined clubs and university, allowing them to browse and RSVP.

---

# User

Student

---

# Route

/events

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Header

Contains:

- Title: "Events"
- Description: "Upcoming events from your clubs and campus."

---

## Filters

Horizontal filter bar:

- All Events (default)
- My RSVPs
- This Week
- This Month

---

## Sorting

Dropdown:

- Soonest First (default)
- Latest First
- Most Popular

---

## Event List / Grid

Toggle between list view and grid view.

### Grid View (default)

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

### List View

Full-width cards stacked vertically.

---

# Event Card

Contains:

- Cover Image
- Date Badge (overlay on cover, shows day + month)
- Title
- Club Name + Logo
- Venue
- Time
- RSVP Count
- RSVP Button (Going / Interested)

---

# Empty State

"No upcoming events. Check back soon!"

If filtered by "My RSVPs" with none: "You haven't RSVP'd to any events yet."

---

# Loading State

Skeleton event cards.

---

# Error State

Retry button.

---

# Interactions

- Click card: Navigate to /events/:id
- RSVP button: Quick RSVP (Going) via POST /api/events/:eventId/rsvp
- Filter change: Re-fetch with query params
- View toggle: Switch between grid/list (client-side)

---

# Responsive Behaviour

Desktop: 3-column grid, filters inline

Tablet: 2-column grid

Mobile: 1-column stack, filters in horizontal scroll

---

# Accessibility

Date badge has aria-label with full date.

Event cards are focusable links.

Filter buttons use aria-pressed.

---

# Components Required

- Card
- Badge
- Button
- Avatar
- Dropdown
- Filter Chips
- Skeleton
- Pagination

---

# Data

Consumes:

- GET /api/events
- POST /api/events/:eventId/rsvp

---

# Design Notes

Date badge on event cards adds visual interest — use bold day number, smaller month.

Cover images add color to the grayscale palette.

Cards should have generous padding and soft shadows.

RSVP button should feel lightweight — not a heavy commitment.
