# Club Details

## Goal

Show comprehensive information about a single club, allowing students to learn about it and join.

---

# User

Student (member or non-member)

---

# Route

/clubs/:id

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Cover Image

Full-width banner image at top of content area.

Height: 200px (desktop), 140px (mobile).

Fallback: Gradient or solid gray if no cover image.

---

## Club Header

Contains:

- Club Logo (overlapping cover image bottom)
- Club Name
- Category Badge
- Privacy Badge (Public / Private)
- Member Count
- Created Date
- Join / Leave / Request to Join Button

---

## Tab Navigation

Tabs:

- About (default)
- Feed (only if member)
- Events
- Members

---

## About Tab

Contains:

- Description (full text)
- Club Admin(s) listed with avatars
- Category
- Created by

---

## Feed Tab (members only)

Shows club posts feed (see 10-Club-Feed.md).

Non-members see: "Join this club to see posts."

---

## Events Tab

Upcoming events for this club.

Each event shows:

- Title
- Date
- Venue
- RSVP count

---

## Members Tab

Grid of member avatars with names.

Shows first 20, "View All" for more.

Admin badges on club admins.

---

# Join/Leave Logic

| State | Button |
|------|--------|
| Not a member, public club | "Join Club" |
| Not a member, private club | "Request to Join" |
| Pending request | "Pending..." (disabled) |
| Member | "Leave Club" |

---

# Empty States

No events: "No upcoming events."

No members visible: "Join to see members."

---

# Loading State

Skeleton for cover, header, and tab content independently.

---

# Error State

Full page error with retry.

---

# Interactions

- Join: POST /api/clubs/:clubId/join
- Leave: POST /api/clubs/:clubId/leave (confirmation dialog)
- Click event: Navigate to /events/:id
- Click member: Navigate to /users/:id
- Switch tabs: Client-side tab change

---

# Responsive Behaviour

Desktop: Full width content, tabs horizontal

Tablet: Same layout, smaller cover

Mobile: Stacked layout, tabs scrollable

---

# Accessibility

Tabs use proper ARIA roles (tablist, tab, tabpanel).

Join button has clear aria-label with club name.

Cover image has alt text.

---

# Components Required

- Button
- Badge
- Avatar
- Tabs
- Card
- Dialog (leave confirmation)
- Skeleton

---

# Data

Consumes:

- GET /api/clubs/:id
- GET /api/clubs/:clubId/members
- GET /api/clubs/:clubId/events
- GET /api/clubs/:clubId/posts (if member)
- POST /api/clubs/:clubId/join
- POST /api/clubs/:clubId/leave

---

# Design Notes

Cover image adds visual richness — use soft overlay gradient for text readability.

Club logo should be 80px circle, offset to overlap cover bottom edge.

Tabs should have clear active state with underline indicator.

Generous spacing between sections within tabs.
