# Discover Clubs

## Goal

Allow students to browse and join clubs inside their university.

This page should feel modern, clean, welcoming, and community-focused.

---

# User

Student

---

# Route

/clubs

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

- Title: "Discover Clubs"
- Description: "Find communities that match your interests."

---

## Search Bar

Full width.

Placeholder: "Search clubs..."

Supports:

- Name
- Category

---

## Filters

Horizontal chips:

- Technology
- AI
- Sports
- Music
- Photography
- Debate
- Robotics

---

## Sorting

Dropdown:

- Most Popular
- Newest
- A-Z

---

## Club Grid

Responsive:

- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

---

# Club Card

Contains:

- Logo
- Cover Image
- Club Name
- Category Badge
- Short Description
- Member Count
- Privacy Badge
- Join Button

---

# Join Button

If Public: Join immediately

If Private: Request to Join

---

# Empty State

Illustration + "No clubs found."

---

# Loading State

Skeleton cards.

---

# Error State

Retry button.

---

# Interactions

- Click Card: Open Club Details
- Click Join: Join Club (POST /api/clubs/:clubId/join)
- Hover: Lift animation

---

# Responsive Behaviour

Desktop: 4-column grid

Tablet: 2-column grid

Mobile: 1-column grid

---

# Accessibility

Keyboard accessible.

ARIA labels on cards.

Visible focus states.

---

# Components Required

- Button
- Card
- Badge
- Avatar
- Search Input
- Filter Chips
- Dropdown
- Pagination

---

# Data

Consumes: GET /api/clubs

---

# Design Notes

Use plenty of white space.

Cards should have soft shadows.

Rounded corners (12-16px).

Smooth hover animations.

Primary CTA should always be Join.
