# Student Profile Page

## Context

This page is at `/profile`. Available to all authenticated users. Uses the standard app shell. Page title in topbar: "Profile". Shows the current user's public profile with an edit capability.

## Page Layout

Two-column on desktop (lg:grid-cols-3), single column on mobile.

### Left Column (lg:col-span-2)

#### Profile Header Card

Card (bg-white, border, rounded-xl, overflow-hidden):

- **Cover area**: h-32 bg-gradient-to-r from-gray-100 to-gray-200 (or subtle pattern)
- **Profile section** (px-6 pb-6):
  - Avatar: w-20 h-20 rounded-full border-4 border-white -mt-10 shadow-sm bg-gray-200 (with initial or image)
  - Name: text-2xl font-bold mt-3
  - Email: text-sm text-gray-500
  - Bio: text-sm text-gray-600 mt-2 max-w-[500px]
  - Tags row (mt-3, flex gap-2): faculty badge + department badge + batch badge (bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs)
  - "Edit Profile" button (secondary, small, top-right of this section)

#### Interests Section

Card (bg-white, border, rounded-xl, p-6, mt-6):

- Header: "Interests" (text-base font-semibold)
- Flex wrap gap-2: interest tags (bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-[13px])
- Example: "Web Development", "Machine Learning", "UI/UX Design", "Photography"

#### Activity / Posts Section

Card (bg-white, border, rounded-xl, p-6, mt-6):

- Header: "Recent Activity" (text-base font-semibold) + "View All" link
- List (space-y-4, divide-y divide-gray-100):
  - Each item: activity type icon (small, colored bg) + description text (text-sm) + time (text-xs text-gray-400)
  - Examples: "Posted in Coding Club", "RSVP'd to Winter Hackathon", "Joined Photography Society"

### Right Column (lg:col-span-1)

#### Stats Card

Card (bg-white, border, rounded-xl, p-5):

- "Stats" (text-base font-semibold, mb-4)
- Stat rows (space-y-3):
  - Each: label (text-sm text-gray-500) + value (text-sm font-bold text-black, right-aligned)
  - "Clubs Joined" → "4"
  - "Events Attended" → "12"
  - "Posts Created" → "28"
  - "Member Since" → "Oct 2024"

#### Social Links Card

Card (bg-white, border, rounded-xl, p-5, mt-4):

- "Social Links" (text-base font-semibold, mb-4)
- List (space-y-3):
  - Each: icon (text-gray-400) + platform name (text-sm) + link (text-sm text-blue-600 hover:underline truncate)
  - LinkedIn, GitHub, X (Twitter), Personal Website

#### Clubs Card

Card (bg-white, border, rounded-xl, p-5, mt-4):

- "Clubs" (text-base font-semibold, mb-4)
- List (space-y-2):
  - Each: small club icon (w-8 h-8 bg-black rounded-lg) + club name (text-sm font-medium) + role badge (text-[11px])
  - 3-4 clubs max, "+ X more" link at bottom

## Edit Profile Modal/Page

Triggered by "Edit Profile" button. Could be a modal (max-w-lg) or separate page.

Form fields:
- Avatar upload (circular, click to change)
- Name — text input
- Bio — textarea, 3 rows
- Faculty — select
- Department — select
- Batch — select (year)
- Interests — multi-select tag input
- Social Links — repeatable rows (platform select + URL input)

Actions: "Cancel" (secondary) + "Save Changes" (primary)
