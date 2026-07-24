# Analytics

## Goal

Provide university admins with detailed analytics and insights about platform usage, student engagement, and community health.

---

# User

University Admin

---

# Route

/analytics

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

- Title: "Analytics"
- Date range picker (Last 7 days, Last 30 days, Last 90 days, All Time)
- Export button (download CSV)

---

## Key Metrics Row

Stat cards (same style as University Dashboard but with more detail):

- Total Students (with trend)
- Active Students (with trend)
- Total Clubs (with trend)
- Total Posts (with trend)
- Total Events (with trend)
- Weekly Active Users (with trend)

---

## Student Growth Chart

Line chart showing:

- New students invited over time
- Students activated over time
- X-axis: dates
- Y-axis: count

---

## Engagement Chart

Bar or area chart:

- Posts created per day/week
- Comments per day/week
- Likes per day/week

Toggle between daily and weekly granularity.

---

## Club Leaderboard

Table of top clubs by engagement:

| Rank | Club | Members | Posts | Events | Engagement Score |
|------|------|---------|-------|--------|-----------------|

Shows top 10. "View All" expands.

---

## Student Activity Breakdown

Donut or pie chart:

- Active (logged in this week)
- Inactive (not logged in 7+ days)
- Never activated (pending profile)

---

## Event Metrics

- Total events this period
- Total RSVPs
- Average attendance rate
- Most popular event

---

# Empty State

New university with no data: "Analytics will appear once students start using the platform."

---

# Loading State

Skeleton stat cards and chart placeholders.

---

# Error State

Section-level retry.

---

# Interactions

- Change date range: Re-fetch all analytics
- Export: Download analytics as CSV
- Click club in leaderboard: Navigate to club details
- Toggle chart granularity: Client-side re-render

---

# Responsive Behaviour

Desktop: Stats row (3x2), charts full width, leaderboard table

Tablet: Stats (2x3), charts stack

Mobile: Stats horizontal scroll, charts full width (simplified), table as cards

---

# Accessibility

Charts have text-based data table alternative.

Trend indicators have aria-labels.

Export button clearly describes what will be downloaded.

---

# Components Required

- Stat Card
- Metric Card
- Card
- Table
- Badge
- Button
- Dropdown
- Skeleton
- Chart (line, bar, donut)

---

# Data

Consumes:

- GET /api/analytics/university

Query params: dateFrom, dateTo, granularity

---

# Design Notes

Analytics page should feel data-rich but not overwhelming.

Charts use the grayscale palette (different gray shades for series).

Stat cards remain the quick-glance hero.

Leaderboard adds competitive/gamification element for clubs.

Export button is secondary — power-user feature, not primary action.

Generous vertical spacing between chart sections.
