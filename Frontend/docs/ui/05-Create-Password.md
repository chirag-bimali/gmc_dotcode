# Create Password

## Goal

Allow a newly invited student to set their account password after accepting an invitation.

---

# User

Student who just accepted an invitation (status: invited → pending_profile)

---

# Route

/create-password

---

# Layout

Centered authentication layout.

No sidebar. No top nav.

---

# Page Sections

## Form

Contains:

- App Logo
- Title: "Create your password"
- Subtitle: "Set a secure password for your account."
- Password Input
- Confirm Password Input
- Password Strength Indicator
- Submit Button: "Create Password"

---

## Password Requirements

Displayed below password field:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

Requirements show check/cross icons as user types.

---

# Validation

Password

- Required
- Minimum 8 characters
- Must meet strength requirements

Confirm Password

- Required
- Must match password

---

# Error States

Passwords don't match: "Passwords do not match."

Password too weak: "Password does not meet requirements."

Server error: "Something went wrong. Please try again."

---

# Loading State

Button shows spinner and disables on submit.

---

# Success State

Redirect to /complete-profile.

---

# Interactions

Submit: POST (password creation endpoint) → Navigate to /complete-profile

Show/Hide toggle on both password fields.

---

# Responsive Behaviour

Desktop: Centered card, max-width 480px

Mobile: Full width with padding

---

# Accessibility

Password requirements update live (aria-live region).

Error messages linked via aria-describedby.

Enter key submits form.

---

# Components Required

- Input
- Button
- Alert

---

# Design Notes

Keep it simple — one focused task per screen.

Password strength indicator uses subtle color coding (gray → green as strength increases).

Form card centered with generous internal padding.
