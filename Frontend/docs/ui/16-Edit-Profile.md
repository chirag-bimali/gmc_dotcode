# Edit Profile

## Goal

Allow students to update their profile information, interests, skills, and social links.

---

# User

Student (own profile only)

---

# Route

/profile/edit

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

- Title: "Edit Profile"
- Back button (← back to profile)

---

## Profile Picture Section

- Current avatar (large)
- "Change Photo" button
- "Remove Photo" option
- File picker (accepts jpg, png, max 5MB)
- Crop/preview before upload

---

## Basic Information Form

Fields:

- Bio (textarea, max 300 chars, character counter)

Read-only (displayed but not editable):

- Email
- University
- Faculty
- Department
- Batch

---

## Interests Section

- Current interests shown as selected chips
- All available interests shown as toggleable chips
- Select/deselect to update

---

## Skills Section

- Same pattern as interests
- Toggleable chip picker

---

## Social Links Section

- List of current links (platform + URL)
- Edit URL inline
- Delete link (with confirmation)
- "Add Social Link" button
- Platform dropdown + URL input for new links

---

## Password Section

Separate card:

- Current Password
- New Password
- Confirm New Password
- "Update Password" button

---

## Save Actions

- Save Changes button (primary)
- Cancel button (secondary) → back to profile

---

# Validation

Bio: Max 300 characters

Social URLs: Valid URL format

Password: Same rules as Create Password (8+ chars, strength requirements)

Confirm Password: Must match

---

# Loading State

Button spinner on save.

Skeleton while loading current data.

---

# Success State

Toast: "Profile updated successfully."

Stay on page (don't navigate away).

---

# Error States

Validation errors: Inline per field.

Server error: Toast with retry suggestion.

Upload error: "Failed to upload image."

---

# Interactions

- Upload photo: PUT /api/users/me/profile-picture
- Save bio: PUT /api/users/me
- Update interests: PUT /api/users/me/interests
- Update skills: PUT /api/users/me/skills
- Add social link: POST /api/users/me/social-links
- Edit social link: PUT /api/users/me/social-links/:id
- Delete social link: DELETE /api/users/me/social-links/:id
- Change password: PUT /api/users/me/password

---

# Responsive Behaviour

Desktop: Centered form, max-width 640px

Tablet: Full width with padding

Mobile: Full width, stacked sections

---

# Accessibility

Character counter announced on textarea focus.

Chip selections use aria-pressed.

Password visibility toggle labeled.

Form sections use fieldset/legend.

---

# Components Required

- Input
- Textarea
- Select
- Button
- Avatar
- Badge (chips)
- File Upload
- Toast
- Dialog (confirmations)

---

# Data

Consumes:

- GET /api/users/me
- PUT /api/users/me
- PUT /api/users/me/profile-picture
- GET /api/interests
- PUT /api/users/me/interests
- GET /api/skills
- PUT /api/users/me/skills
- GET /api/users/me/social-links
- POST /api/users/me/social-links
- PUT /api/users/me/social-links/:id
- DELETE /api/users/me/social-links/:id
- PUT /api/users/me/password

---

# Design Notes

Section-by-section layout — each concern is visually separated.

Save button fixed at bottom on mobile (sticky).

Password section clearly separated (distinct card with warning styling).

Edits should feel low-friction — save per section if possible.
