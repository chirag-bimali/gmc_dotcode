# Club Dashboard

## Goal

Provide club admins with an overview of their club's health, activity, and quick actions.

---

# User

Club Admin

---

# Route

/clubs/:id/dashboard

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

- Club Name
- Club Logo
- "Manage Club" context indicator

---

## Stat Cards Row

Horizontal row of metric cards:

- Total Members
- Active Members (this week)
- Total Posts
- Total Events
- Pending Requests (if private club)

Each card shows:

- Metric value (large number)
- Label
- Trend indicator (optional, e.g., +5 this week)

---

## Recent Activity

Feed of recent actions in the club:

- New members joined
- Posts created
- Events created
- Members left

Each item: icon + description + timestamp

---

## Pending Join Requests (if private club)

Card listing pending requests:

- User avatar + name
- Request date
- Approve / Reject buttons

"View All" link → Manage Members

---

## Quick Actions

Grid of action buttons:

- Create Post
- Create Event
- Invite Members
- Club Settings

---

## Upcoming Events

Compact list of next 3 events:

- Title
- Date
- RSVP count

---

# Empty States

No activity: "Your club is just getting started!"

No pending requests: Section hidden.

No events: "No upcoming events. Create one!"

---

# Loading State

Skeleton stat cards and activity list.

---

# Error State

Section-level retry buttons.

---

# Interactions

- Approve request: PUT /api/clubs/:clubId/members/:userId/approve
- Reject request: PUT /api/clubs/:clubId/members/:userId/reject
- Click quick action: Navigate to respective page
- Click event: Navigate to event details

---

# Responsive Behaviour

Desktop: Stats row (4 columns), two-column layout below (activity left, actions right)

Tablet: Stats row (2x2 grid), single column below

Mobile: Stats scrollable horizontal, everything stacked

---

# Accessibility

Stat cards are not interactive — use semantic markup.

Approve/Reject buttons have aria-label with user's name.

Activity feed is a list landmark.

---

# Components Required

- Stat Card
- Card
- Avatar
- Button
- Badge
- Skeleton

---

# Data

Consumes:

- GET /api/analytics/clubs/:clubId
- GET /api/clubs/:clubId/members (pending filter)
- GET /api/clubs/:clubId/events (upcoming)
- GET /api/clubs/:clubId/posts (recent)

---

# Design Notes

Dashboard should feel actionable — not just informational.

Stat cards use large bold numbers.

Pending requests section has a subtle urgency indicator (count badge).

Quick actions use icon + label in compact cards.

Clean grid layout with consistent card heights.
