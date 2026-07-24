# Notifications

## Goal

Show all notifications for the student in a chronological list, allowing them to stay updated on activity relevant to them.

---

# User

Student, Club Admin, University Admin

---

# Route

/notifications

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

- Title: "Notifications"
- Mark All as Read button (secondary, right-aligned)
- Unread count badge

---

## Filter Tabs

- All (default)
- Unread

---

## Notification List

Vertical list of notification items.

Each item contains:

- Icon (based on type: heart for like, message for comment, calendar for event, megaphone for announcement, users for membership)
- Title (bold)
- Message (body text)
- Timestamp (relative)
- Unread indicator (blue dot on left)
- Click navigates to referenced content

### Notification Types

| Type | Icon | Example |
|------|------|---------|
| Like | Heart | "John liked your post in Tech Club" |
| Comment | Message | "Sarah commented on your post" |
| Event | Calendar | "New event: Hackathon 2026 in AI Club" |
| Announcement | Megaphone | "New announcement in Photography Club" |
| Membership | Users | "Your request to join Chess Club was approved" |

---

# Empty State

"You're all caught up! No notifications."

---

# Loading State

Skeleton notification items.

---

# Error State

Retry button.

---

# Interactions

- Click notification: PUT /api/notifications/:id/read + Navigate to reference
- Mark all read: PUT /api/notifications/read-all
- Filter toggle: Client-side filter

---

# Responsive Behaviour

Desktop: Centered list, max-width 700px

Tablet: Full width

Mobile: Full width, compact items

---

# Accessibility

Notification list is an ARIA list (role="list").

Unread notifications are distinguished for screen readers.

Mark all read button confirms action count.

---

# Components Required

- Notification Item
- Button
- Badge
- Tabs
- Skeleton

---

# Data

Consumes:

- GET /api/notifications
- GET /api/notifications/unread-count
- PUT /api/notifications/:id/read
- PUT /api/notifications/read-all

---

# Design Notes

Unread notifications have subtle background tint (Gray 50 vs white).

Blue dot indicator is small (8px) and positioned left.

Smooth transition when marking as read.

List items have hover state (subtle background).

Keep the page lightweight — no heavy visuals.
