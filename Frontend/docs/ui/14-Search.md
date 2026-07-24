# Search

## Goal

Provide a unified search experience for students to find clubs, other students, and events.

---

# User

Student

---

# Route

/search?q=

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Search Input

Large, prominent search input at top.

- Auto-focus on page load
- Placeholder: "Search clubs, students, events..."
- Search icon left
- Clear button right (when has value)
- Debounced (300ms) live search

---

## Category Tabs

Below search input:

- All (default)
- Clubs
- Students
- Events

Each tab shows result count.

---

## Results

### Club Results

Card list showing:

- Club logo
- Club name
- Category badge
- Member count
- Join button

### Student Results

List showing:

- Avatar
- Full name
- Faculty / Department
- Batch

### Event Results

Card list showing:

- Cover image thumbnail
- Event title
- Date
- Club name
- Venue

---

# Empty State

Before search: "Start typing to search..."

No results: "No results found for '[query]'. Try a different search term."

---

# Loading State

Inline spinner below search input while fetching.

Skeleton results.

---

# Error State

"Search failed. Please try again."

---

# Interactions

- Type in search: Debounced GET /api/search/clubs?q= + /users?q= + /events?q=
- Click club: Navigate to /clubs/:id
- Click student: Navigate to /users/:id (profile)
- Click event: Navigate to /events/:id
- Switch tab: Filter displayed results (client-side or separate requests)
- Clear search: Reset to empty state

---

# Responsive Behaviour

Desktop: Centered content, max-width 800px

Tablet: Full width

Mobile: Full width, tabs horizontally scrollable

---

# Accessibility

Search input has role="searchbox".

Results are announced to screen readers (aria-live region for count).

Tab navigation follows ARIA tabs pattern.

---

# Components Required

- Search Input
- Tabs
- Card
- Avatar
- Badge
- Button
- Skeleton

---

# Data

Consumes:

- GET /api/search/clubs?q=
- GET /api/search/users?q=
- GET /api/search/events?q=

---

# Design Notes

Search should feel instant and responsive.

Large search input is the hero element — give it visual emphasis.

Results appear smoothly (fade in).

Compact result cards — prioritize scanability over detail.

Keep it minimal — this is a utility page, not a destination.
