# Settings Page

## Context

This page is at `/settings`. Available to all authenticated users. Uses the standard app shell. Page title in topbar: "Settings".

## Page Layout

Single column, max-w-[700px] mx-auto, space-y-6.

## Section 1: Account

Card (bg-white, border, rounded-xl, p-6):

- Header: "Account" (text-lg font-semibold)
- **Email row** (flex justify-between items-center, py-3, border-b border-gray-100):
  - Left: "Email" label (text-sm text-gray-500) + email value (text-sm font-medium)
  - Right: "Change" text button (text-sm text-black font-medium hover:underline)
- **Password row** (flex justify-between items-center, py-3, border-b border-gray-100):
  - Left: "Password" label + "Last changed 2 months ago" (text-xs text-gray-400)
  - Right: "Change Password" text button
- **Two-Factor row** (flex justify-between items-center, py-3):
  - Left: "Two-Factor Auth" label + "Not enabled" status (text-xs text-gray-400)
  - Right: "Enable" button (secondary, small)

## Section 2: Notifications Preferences

Card (bg-white, border, rounded-xl, p-6):

- Header: "Notification Preferences" (text-lg font-semibold)
- Toggle rows (space-y-4):
  - Each row (flex justify-between items-center):
    - Left: title (text-sm font-medium) + description below (text-xs text-gray-500)
    - Right: toggle switch (w-10 h-6, rounded-full, bg-black when on, bg-gray-200 when off)
  - Items:
    - "Club Activity" / "Posts, events, and updates from your clubs"
    - "Event Reminders" / "Get notified before events you RSVP'd to"
    - "Mentions" / "When someone mentions you in a post or comment"
    - "System Updates" / "Platform announcements and maintenance"
    - "Email Notifications" / "Receive a daily digest via email"

## Section 3: Appearance

Card (bg-white, border, rounded-xl, p-6):

- Header: "Appearance" (text-lg font-semibold)
- **Theme selector** (flex gap-3, mt-3):
  - Three option cards (w-20, border, rounded-lg, p-3, text-center, cursor-pointer):
    - "Light" — active (border-black, ring-1 ring-black) — small sun icon + label
    - "Dark" — inactive (border-gray-200) — moon icon + label
    - "System" — inactive — laptop icon + label

## Section 4: Danger Zone

Card (border border-red-200, rounded-xl, p-6):

- Header: "Danger Zone" (text-lg font-semibold text-red-600)
- **Delete account row** (flex justify-between items-center):
  - Left: "Delete Account" (text-sm font-medium) + "Permanently delete your account and all data" (text-xs text-gray-500)
  - Right: "Delete Account" button (bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium px-4 py-2)

## Interaction Notes

- Toggles animate smoothly (transition-all duration-200)
- Theme cards have a checkmark icon overlay when active
- Delete account triggers a confirmation modal with password input
- All changes auto-save with a subtle toast "Settings saved" (bottom-right)
