# Login

## Goal

Allow invited students and admins to authenticate into the platform using email and password.

---

# User

Any user with an activated account (Student, Club Admin, University Admin)

---

# Route

/login

---

# Layout

Centered authentication layout.

No sidebar. No top nav.

Split layout on desktop:

- Left: Branding panel (logo, tagline, illustration)
- Right: Login form

Mobile: Form only, logo above.

---

# Page Sections

## Branding Panel (Desktop)

Contains:

- App Logo
- Tagline: "Your Campus Community, Connected."
- Abstract illustration or pattern

Background: Gray 900 or subtle dark tone.

---

## Login Form

Contains:

- Page Title: "Welcome back"
- Subtitle: "Sign in to your account"
- Email Input
- Password Input
- Show/Hide Password Toggle
- Remember Me Checkbox
- Forgot Password Link
- Submit Button: "Sign In"

---

# Validation

Email

- Required
- Must be valid email format

Password

- Required
- Minimum 8 characters

---

# Error States

Invalid credentials: "Invalid email or password."

Account disabled: "Your account has been disabled. Contact your university admin."

Network error: "Something went wrong. Please try again."

Errors display as inline alert above the form.

---

# Loading State

Button shows spinner and disables on submit.

---

# Success State

Redirect to /home (Student), /dashboard (Club Admin or University Admin).

---

# Interactions

Submit form: Authenticate via POST /api/auth/login

Forgot Password link: Navigate to /forgot-password

---

# Responsive Behaviour

Desktop: Split layout (branding left, form right)

Tablet: Form centered, branding hidden

Mobile: Form full width, logo above

---

# Accessibility

All inputs have visible labels.

Error messages are associated via aria-describedby.

Focus auto-moves to first error field.

Enter key submits form.

---

# Components Required

- Input
- Button
- Checkbox
- Alert

---

# Data

Consumes: POST /api/auth/login

Payload: { email, password }

Response: { token, refreshToken, user }

---

# Design Notes

Form card with subtle shadow on desktop.

Generous padding (32–48px inside form area).

Clean, uncluttered — no distractions.

Primary button full width within form.
