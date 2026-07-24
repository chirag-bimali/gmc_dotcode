# Accept Invitation

## Goal

Allow a student to verify and accept their university invitation via a unique token link sent to their email.

---

# User

Uninvited student (no account yet)

---

# Route

/invitations/:token/accept

---

# Layout

Centered authentication layout (same as Login).

No sidebar. No top nav.

---

# Page Sections

## Token Verification (automatic)

On page load, verify the token via GET /api/invitations/:token/verify.

States:

- Loading: Spinner with "Verifying your invitation..."
- Valid: Show invitation details
- Expired: Show expired state
- Invalid: Show invalid state

---

## Invitation Details (valid token)

Contains:

- App Logo
- Title: "You've been invited!"
- University Name
- Invited Email
- Subtitle: "You've been invited to join [University Name] on Student Hub."
- Accept Button: "Accept Invitation"
- Decline text: "Not interested? You can ignore this invitation."

---

## Expired State

Contains:

- Icon (clock or warning)
- Title: "Invitation Expired"
- Message: "This invitation has expired. Please contact your university admin for a new one."

---

## Invalid State

Contains:

- Icon (warning)
- Title: "Invalid Invitation"
- Message: "This invitation link is invalid or has already been used."
- Link: "Go to Login"

---

# Interactions

Accept: POST /api/invitations/:token/accept → Redirect to /create-password

Decline: No action needed, informational only.

---

# Loading State

Full page spinner during token verification.

Button spinner on accept.

---

# Error State

Network error: "Something went wrong. Please try again." with Retry button.

---

# Responsive Behaviour

Desktop: Centered card with max-width 480px

Mobile: Full width with padding

---

# Accessibility

Focus on Accept button when invitation loads.

Status messages announced to screen readers.

---

# Components Required

- Button
- Alert
- Skeleton/Spinner

---

# Data

Consumes:

- GET /api/invitations/:token/verify
- POST /api/invitations/:token/accept

---

# Design Notes

Warm, welcoming tone in copy.

Invitation card centered with medium shadow.

University name prominently displayed.

Clear visual hierarchy — action button is primary focus.
