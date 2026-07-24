# Club Settings

## Goal

Allow club admins to edit club information, change privacy settings, and manage the club's appearance.

---

# User

Club Admin

---

# Route

/clubs/:id/settings

---

# Layout

Uses the authenticated application layout.

Contains:

- Sidebar (Club Admin navigation)
- Top Navigation
- Main Content

---

# Page Sections

## Header

Contains:

- Title: "Club Settings"
- Club name context

---

## Club Information Form

### Logo

- Current logo displayed
- "Change Logo" button
- File picker (square image, max 2MB)

### Cover Image

- Current cover displayed (or placeholder)
- "Change Cover" button
- File picker (landscape image, max 5MB)

### Details

- Club Name (required)
- Description (textarea, rich text)
- Category (dropdown from GET /api/club-categories)

---

## Privacy Settings

Card:

- Toggle: Public / Private
- Description explaining the difference:
  - Public: "Anyone can join immediately."
  - Private: "Members must request to join and be approved."
- Warning when switching from Public to Private: "Existing members will remain. New members will need approval."

---

## Danger Zone

Red-bordered card at bottom:

- Archive Club
  - Description: "Archiving hides the club from discovery. Members retain access to existing content."
  - Button: "Archive Club" (danger style)
  - Confirmation dialog required

---

# Validation

Club Name: Required, max 100 characters.

Description: Max 1000 characters.

Images: Valid format (jpg, png), within size limits.

---

# Loading State

Skeleton form fields while loading current data.

Button spinner on save.

---

# Success State

Toast: "Club settings updated."

---

# Error States

Validation: Inline per field.

Upload failure: "Failed to upload image."

Server error: Toast with error message.

---

# Interactions

- Save settings: PUT /api/clubs/:id
- Upload logo: Part of PUT (or separate endpoint)
- Upload cover: Part of PUT (or separate endpoint)
- Change privacy: PUT /api/clubs/:id { privacy: "public" | "private" }
- Archive: PUT /api/clubs/:id/archive (confirmation dialog)

---

# Responsive Behaviour

Desktop: Centered form, max-width 640px

Tablet: Full width with padding

Mobile: Full width, stacked sections

---

# Accessibility

Privacy toggle has descriptive label.

Danger zone has aria-label="Destructive actions".

File uploads have accessible labels.

Confirmation dialogs trap focus.

---

# Components Required

- Input
- Textarea
- Select
- Switch
- Button
- File Upload
- Card
- Dialog
- Toast

---

# Data

Consumes:

- GET /api/clubs/:id
- PUT /api/clubs/:id
- GET /api/club-categories
- PUT /api/clubs/:id/archive

---

# Design Notes

Settings page should feel safe and straightforward.

Danger zone clearly separated with red border and warning styling.

Privacy toggle should be prominent — it's a significant choice.

Image uploads show live preview after selection.

Generous spacing between form sections.
