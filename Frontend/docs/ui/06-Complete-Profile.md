# Complete Profile

## Goal

Allow a newly registered student to fill in their profile information before activating their account.

---

# User

Student (status: pending_profile)

---

# Route

/complete-profile

---

# Layout

Centered layout, slightly wider than auth forms.

No sidebar. No top nav.

---

# Page Sections

## Progress Indicator

Step indicator showing:

1. Accept Invitation (done)
2. Create Password (done)
3. Complete Profile (current)

---

## Profile Form

Multi-section form:

### Basic Information

- Profile Picture Upload (optional)
- Bio (textarea, optional, max 300 chars)

### Academic Information (read-only, pre-filled from invitation)

- University (disabled)
- Email (disabled)
- Faculty (dropdown, optional)
- Department (dropdown, dependent on faculty)
- Batch (dropdown, optional)

### Interests

- Multi-select chip picker
- Pre-defined list from GET /api/interests
- Select at least 3 (recommended, not required)

### Skills (optional)

- Multi-select chip picker
- Pre-defined list from GET /api/skills

### Social Links (optional)

- Platform dropdown + URL input
- Add more button
- Removable rows

---

## Submit

Button: "Complete Profile"

Skip link: "Skip for now" (activates account with minimal profile)

---

# Validation

Bio: Max 300 characters

Social Links: Must be valid URL format

Faculty/Department: Department options depend on selected faculty

---

# Loading State

Skeleton for dropdown options while loading.

Button spinner on submit.

---

# Success State

Redirect to /home.

Account status changes to active.

---

# Error States

Server error: Inline alert with retry.

Upload failure: "Failed to upload image. Please try again."

---

# Interactions

- Upload profile picture: Click avatar placeholder to open file picker
- Select faculty: Loads departments dynamically
- Add interest/skill: Click chip to toggle selection
- Add social link: Click "Add" to append row
- Submit: PUT /api/users/me
- Skip: PUT /api/users/me (minimal payload, still activates)

---

# Responsive Behaviour

Desktop: Centered card, max-width 640px

Mobile: Full width, sections stacked

---

# Accessibility

File upload has accessible label.

Chip selections announced via aria-pressed.

Form sections use fieldset/legend.

---

# Components Required

- Input
- Textarea
- Select
- Button
- Avatar
- File Upload
- Badge (chips)
- Alert

---

# Data

Consumes:

- GET /api/interests
- GET /api/skills
- GET /api/social-platforms
- GET /api/universities/:universityId/faculties
- GET /api/faculties/:facultyId/departments
- GET /api/universities/:universityId/batches
- PUT /api/users/me
- PUT /api/users/me/profile-picture

---

# Design Notes

Warm, encouraging tone — "Almost there!"

Profile picture upload uses circular avatar with camera icon overlay.

Chip selectors feel tactile with smooth toggle animation.

Generous vertical spacing between form sections.

"Skip for now" is subtle — secondary text style, not a prominent button.
