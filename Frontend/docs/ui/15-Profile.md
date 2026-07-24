# Profile

## Goal

Display a student's public profile including their bio, interests, skills, clubs, and social links.

---

# User

Student (viewing own or another student's profile)

---

# Route

/profile (own) or /users/:id (other)

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar
- Top Navigation
- Main Content

---

# Page Sections

## Profile Header

Contains:

- Profile Picture (large avatar, 96px)
- Full Name
- Bio
- University Name
- Faculty / Department / Batch
- Edit Profile button (own profile only)

---

## Stats Row

Horizontal stats:

- Clubs Joined (count)
- Events Attended (count)
- Posts Created (count)

---

## Interests

Chip/badge list of selected interests.

If empty: "No interests added yet." (own profile: + "Add some!" link)

---

## Skills

Chip/badge list of selected skills.

If empty: "No skills added yet."

---

## Clubs

Grid of club cards (compact variant):

- Club logo
- Club name
- Role (Member / Admin)

If empty: "Not a member of any clubs yet."

---

## Social Links

List of social platform icons with links.

Each shows:

- Platform icon
- Platform name
- Clickable URL (opens in new tab)

If empty: "No social links added."

---

# Loading State

Skeleton avatar, text lines, and chip placeholders.

---

# Error State

"Could not load profile. Retry."

---

# Interactions

- Edit Profile (own): Navigate to /profile/edit
- Click club: Navigate to /clubs/:id
- Click social link: Open external URL in new tab

---

# Responsive Behaviour

Desktop: Two-column layout (profile info left, clubs/socials right)

Tablet: Single column

Mobile: Single column, compact layout

---

# Accessibility

Profile picture has alt text with user's name.

Social links have aria-label with platform name.

Stats are not interactive — use dl/dt/dd for semantics.

---

# Components Required

- Avatar
- Badge
- Card
- Button
- Skeleton

---

# Data

Consumes:

- GET /api/users/me (own profile)
- GET /api/users/:id (other's profile)
- GET /api/users/me/interests
- GET /api/users/me/skills
- GET /api/users/me/social-links

---

# Design Notes

Profile picture should be prominent — the page's visual anchor.

Use generous vertical spacing between sections.

Chips for interests/skills use pill style (rounded full).

Keep the tone personal but professional.

Own profile vs other's profile: same layout, just hide edit actions.
