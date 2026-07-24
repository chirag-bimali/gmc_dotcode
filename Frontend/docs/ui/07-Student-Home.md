# Student Home

## Goal

Provide a personalized dashboard for students showing relevant activity from their clubs, upcoming events, and suggestions.

This is the first page students see after login.

---

# User

Student

---

# Route

/home

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Welcome Header

Contains:

- Greeting: "Good morning, [First Name]"
- Date: Today's date
- Subtitle: Quick summary or motivational text

---

## Quick Stats

Horizontal row of stat cards:

- My Clubs (count)
- Upcoming Events (count)
- Unread Notifications (count)

---

## Activity Feed

Recent activity from joined clubs:

- New posts from clubs
- New events announced
- Club announcements

Each item shows:

- Club avatar
- Club name
- Activity type
- Preview text
- Timestamp
- Click to navigate to source

---

## Upcoming Events

Horizontal scrollable cards (max 4-5 visible):

- Event title
- Date
- Club name
- Cover image thumbnail

"View All" link → /events

---

## Suggested Clubs

If student has joined fewer than 3 clubs, show suggestions:

- Club card (compact)
- Based on interests
- "Discover More" link → /clubs

---

# Empty States

No clubs joined: "You haven't joined any clubs yet. Discover communities that match your interests." + CTA "Discover Clubs"

No activity: "Nothing here yet. Join clubs to see their activity."

---

# Loading State

Skeleton loaders for each section independently.

---

# Error State

Section-level errors with retry buttons (not full page).

---

# Interactions

- Click stat card: Navigate to respective section
- Click activity item: Navigate to post/event
- Click event card: Navigate to event details
- Click club suggestion: Navigate to club details

---

# Responsive Behaviour

Desktop: 2-column layout (feed left, events/suggestions right)

Tablet: Single column, all sections stacked

Mobile: Single column, horizontal scroll for event cards

---

# Accessibility

Stat cards are focusable.

Activity feed items are links with descriptive labels.

Time displayed in relative format ("2 hours ago") with absolute tooltip.

---

# Components Required

- Stat Card
- Card
- Avatar
- Badge
- Skeleton

---

# Data

Consumes:

- GET /api/users/me
- GET /api/clubs/:clubId/posts (aggregated from joined clubs)
- GET /api/discover/upcoming-events
- GET /api/discover/suggested-clubs
- GET /api/notifications/unread-count

---

# Design Notes

Warm, personalized feel.

Activity feed is the central focus.

Generous spacing between sections.

Event cards have subtle hover lift.

Stats use large numbers with small labels below.
