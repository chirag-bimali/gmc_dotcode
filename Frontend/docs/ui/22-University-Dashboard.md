# University Dashboard

## Goal

Provide university admins with a high-level overview of platform health, student activity, and quick access to management functions.

---

# User

University Admin

---

# Route

/dashboard

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

- Title: "Dashboard"
- University name
- Date range selector (This Week / This Month / All Time)

---

## Key Metrics Row

Horizontal row of stat cards:

- Total Students
- Active Students (period)
- Total Clubs
- Total Posts
- Total Events
- Weekly Active Users

Each card:

- Large number
- Label
- Trend indicator (arrow up/down + percentage)
- Subtle sparkline (optional)

---

## Activity Chart

Area or bar chart showing:

- New students over time
- Posts created over time

Toggle between metrics.

Time range: Last 7 days / 30 days.

---

## Recent Students

Compact table:

- Avatar + Name
- Email
- Status badge (Active, Pending, Disabled)
- Joined date

"View All" link → Student Management

---

## Recent Clubs

Compact table:

- Logo + Club Name
- Category
- Members count
- Verified badge
- Created date

"View All" link → Club Management

---

## Quick Actions

Grid:

- Invite Students
- Create Club
- View Reports
- View Analytics

---

# Empty States

New university (no students): "Welcome! Start by inviting your first students."

---

# Loading State

Skeleton stat cards and table rows.

---

# Error State

Section-level retry buttons.

---

# Interactions

- Click stat card: Navigate to detailed view
- Click student row: Navigate to student profile
- Click club row: Navigate to club management
- Quick actions: Navigate to respective pages
- Date range: Re-fetch analytics data

---

# Responsive Behaviour

Desktop: Stats (6 columns → 3x2), two-column layout below

Tablet: Stats (3x2), single column below

Mobile: Stats horizontal scroll, everything stacked

---

# Accessibility

Charts have text alternative (summary table).

Stat cards use semantic markup (not just styled divs).

Trend indicators have aria-label ("up 12% from last week").

---

# Components Required

- Stat Card
- Metric Card
- Card
- Table
- Avatar
- Badge
- Button
- Skeleton
- Chart (optional for MVP)

---

# Data

Consumes:

- GET /api/analytics/university
- GET /api/users (recent, limited)
- GET /api/clubs (recent, limited)

---

# Design Notes

Dashboard should feel authoritative and clear.

Stat cards are the visual hero — big numbers, clean labels.

Trend indicators use green for up, red for down (semantic color exception).

Keep tables compact — this is an overview, not a full management view.

White space between sections maintains readability.
