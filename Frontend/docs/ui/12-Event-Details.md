# Event Details

## Goal

Show full information about a single event, including details, organizer, capacity, and RSVP actions.

---

# User

Student

---

# Route

/events/:id

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Hero Banner

Full-width cover image.

Height: 240px (desktop), 160px (mobile).

Overlay gradient for text readability.

---

## Date Card

Floating card overlapping hero bottom-right:

- Day (large number)
- Month (abbreviated)
- Time

---

## Event Header

Below hero:

- Event Title
- Club Name + Logo (clickable → club details)
- Status Badge (Upcoming / Ongoing / Past)

---

## Location

Contains:

- Venue icon + Venue name
- Address (if provided)

---

## Description

Full event description text.

Rendered as rich text (markdown support if available).

---

## Organizer

Contains:

- Organizer avatar
- Organizer name
- Role: "Club Admin"

---

## Capacity

Progress bar showing:

- X / Y spots filled
- "Spots remaining" text
- Full state: "This event is full" (RSVP disabled)

---

## RSVP Section

Contains:

- RSVP Status buttons: Going, Interested, Not Going
- Current user's status highlighted
- Cancel RSVP option

---

## Attendees

Stacked avatar row (first 8-10 attendees).

"+X more" text.

Click to expand full attendee list.

---

## Share Button

Copy event link to clipboard.

Toast confirmation: "Link copied!"

---

# Loading State

Skeleton for hero, details, and attendees.

---

# Error State

Full page error with retry button.

---

# Interactions

- RSVP: POST /api/events/:eventId/rsvp { status: "going" | "interested" | "not_going" }
- Change RSVP: PUT /api/events/:eventId/rsvp
- Cancel RSVP: DELETE /api/events/:eventId/rsvp
- Click club: Navigate to /clubs/:clubId
- Click organizer: Navigate to /users/:id
- Share: Copy URL to clipboard
- View attendees: Expand attendee list

---

# Responsive Behaviour

Desktop: Two-column layout (details left, sidebar info right with date/capacity/RSVP)

Tablet: Single column, all sections stacked

Mobile: Single column, compact date card

---

# Accessibility

RSVP buttons use radio group pattern (aria-radiogroup).

Capacity progress bar has aria-valuenow/max.

Date card has full date as aria-label.

Share button announces clipboard copy.

---

# Components Required

- Button
- Badge
- Avatar
- Card
- Toast
- Skeleton
- Dialog (attendee list)

---

# Data

Consumes:

- GET /api/events/:id
- GET /api/events/:eventId/rsvps
- POST /api/events/:eventId/rsvp
- PUT /api/events/:eventId/rsvp
- DELETE /api/events/:eventId/rsvp

---

# Design Notes

Hero banner adds visual impact — events are exciting, let the design reflect that.

Date card should feel like a calendar page (bold day, subtle month).

RSVP section is the primary action — give it visual prominence.

Capacity bar uses subtle green fill.

Generous white space between info sections.
