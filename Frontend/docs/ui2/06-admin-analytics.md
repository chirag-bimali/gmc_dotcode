# Admin — Analytics Dashboard

## Context

This page is at `/admin/analytics`. Only visible to `UserRole.UniversityAdmin`. Uses the standard app shell. Page title in topbar: "Analytics". Provides an overview of platform health and engagement metrics.

## Page Header

- "Analytics" (text-3xl font-semibold)
- Subtitle: "Platform overview and engagement metrics" (text-base text-gray-500)
- Right: date range selector — pill-shaped buttons: "7D" | "30D" | "90D" | "All", active = bg-black text-white

## Section 1: Overview Stat Cards

Grid: 4 columns desktop, 2 tablet, 1 mobile. Gap-4.

Each card (bg-white, border, rounded-xl, p-5):

| Stat | Icon | Value | Subtext |
|------|------|-------|---------|
| Total Students | "school" | 1,240 | +12 this week (text-emerald-600) |
| Active Clubs | "groups" | 24 | 3 pending verification |
| Events This Month | "calendar_month" | 12 | 450 total RSVPs |
| Engagement Rate | "trending_up" | 78% | +5% from last month (text-emerald-600) |

Card structure:
- Top row: icon (w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center) + label (text-[13px] text-gray-500)
- Value: text-[32px] font-bold text-black, mt-2
- Subtext: text-xs text-gray-500, flex with trend arrow if applicable (text-emerald-600 or text-red-500)

## Section 2: Charts Row

Grid: 2 columns desktop, 1 mobile. Gap-6.

### Chart Card 1: Student Signups

Card (bg-white, border, rounded-xl, p-6):
- Header: "Student Signups" (text-base font-semibold) + "Last 30 days" (text-xs text-gray-400)
- Chart area: h-[200px], placeholder for a line/area chart
  - X-axis: dates (daily ticks)
  - Y-axis: count
  - Line color: black, area fill: black/5
  - Show a simple smooth curve trending upward
- Below chart: "Total: 48 new students this month" (text-xs text-gray-500)

### Chart Card 2: Club Activity

Card (bg-white, border, rounded-xl, p-6):
- Header: "Club Activity" (text-base font-semibold) + "Posts per week" (text-xs text-gray-400)
- Chart area: h-[200px], placeholder for a bar chart
  - X-axis: weeks (W1, W2, W3, W4)
  - Y-axis: post count
  - Bar color: black, with rounded-t corners
- Below chart: "Average: 34 posts/week" (text-xs text-gray-500)

## Section 3: Top Lists

Grid: 2 columns desktop, 1 mobile. Gap-6.

### Top Clubs by Members

Card (bg-white, border, rounded-xl, p-5):
- Header: "Top Clubs" (text-base font-semibold) + "by members" (text-xs text-gray-400)
- List (space-y-3):
  - Each row: rank number (text-sm font-bold text-gray-300, w-6) + club icon (w-8 h-8 bg-black rounded-lg, white icon) + club name (text-sm font-medium) + member count right-aligned (text-sm text-gray-500)
  - Top 5 clubs
  - #1 row slightly emphasized (bg-gray-50 rounded-lg p-2)

### Upcoming Events

Card (bg-white, border, rounded-xl, p-5):
- Header: "Upcoming Events" (text-base font-semibold) + "Next 7 days" (text-xs text-gray-400)
- List (space-y-3):
  - Each row: date block (w-10 h-10 bg-gray-50 rounded, flex-col center, month text-[9px] uppercase + day text-base font-bold) + event title (text-sm font-medium) + attendees (text-xs text-gray-500)
  - 4-5 items

## Section 4: Recent Activity Feed (optional bottom section)

Card (bg-white, border, rounded-xl, p-5):
- Header: "Recent Activity" (text-base font-semibold)
- Timeline list (space-y-3, border-l-2 border-gray-100, pl-4):
  - Each item: dot (w-2 h-2 bg-black rounded-full, absolute left) + description (text-sm) + time (text-xs text-gray-400)
  - Examples: "New student Alex joined", "Coding Club verified", "Report #45 resolved"
  - Show 5-6 items

## Chart Placeholder Style

Since Stitch generates static HTML, represent charts as:
- A rounded container (bg-gray-50, border border-gray-100, h-[200px], rounded-lg)
- Inside: a simple SVG path or gradient bar pattern suggesting data visualization
- Or use a clean placeholder text: centered icon "insert_chart" + "Chart visualization" in text-gray-300
