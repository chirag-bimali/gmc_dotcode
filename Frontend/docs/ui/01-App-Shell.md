# App Shell

## Goal

Define the authenticated application shell that wraps all logged-in pages.

---

# User

All authenticated users (Student, Club Admin, University Admin)

---

# Layout

## Sidebar

Position: Fixed left

Width: 240px (expanded), 64px (collapsed)

Contains:

- App Logo
- Navigation Links
- Collapse Toggle
- User Avatar (bottom)

### Student Navigation

- Home
- Discover Clubs
- My Clubs
- Events
- Notifications
- Profile

### Club Admin Navigation

All Student links, plus:

- Club Dashboard
- Manage Members
- Manage Posts
- Manage Events
- Club Settings

### University Admin Navigation

- Dashboard
- Students
- Invitations
- Clubs
- Reports
- Analytics

---

## Top Navigation

Position: Fixed top (offset by sidebar width)

Height: 64px

Contains:

- Page Title (left)
- Search Bar (center)
- Notification Bell with badge (right)
- User Avatar Dropdown (right)

### User Dropdown

- Profile
- Settings
- Logout

---

## Main Content

Position: Right of sidebar, below top nav

Padding: 32px

Max Width: 1100px (centered within available space)

---

# Responsive Behaviour

Desktop: Sidebar expanded + top nav

Tablet: Sidebar collapsed (icons only) + top nav

Mobile: Sidebar hidden, hamburger menu in top nav, slide-out drawer

---

# Components Required

- Sidebar
- Navbar
- Avatar
- Badge
- Dropdown
- Drawer (mobile)

---

# Design Notes

Sidebar uses Gray 900 background with white text/icons.

Active nav item uses subtle left border accent.

Top nav has bottom border (Gray 200).

Smooth collapse animation (200ms).

No heavy shadows on shell elements.
