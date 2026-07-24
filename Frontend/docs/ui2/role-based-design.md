# Role-Based UI Design

## Role Hierarchy

```
UniversityAdmin > ClubAdmin > Student
```

Each higher role inherits all permissions of the roles below it.

### Two-Level Role Model

| Level | Enum | Values | Scope |
|-------|------|--------|-------|
| Platform | `UserRole` | Student, ClubAdmin, UniversityAdmin | Per user, global |
| Club | `MembershipRole` | Member, Admin | Per user per club |

A `UserRole.Student` can still be `MembershipRole.Admin` in specific clubs — the two axes are independent.

---

## 1. Student Experience

**Role:** `UserRole.Student`

### Sidebar Navigation

```
Dashboard
Discover Clubs
My Clubs
Events
Notifications
Profile
Settings
```

### Accessible Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Personal dashboard — stats, upcoming events, activity |
| `/clubs` | Discover & browse all clubs |
| `/clubs/:id` | Club detail (About, Feed, Events, Members tabs) |
| `/my-clubs` | List of clubs the student has joined |
| `/events` | All campus events |
| `/events/:id` | Event detail with RSVP |
| `/notifications` | Personal notifications |
| `/profile` | View/edit own profile |
| `/settings` | Account settings |

### Capabilities

- Complete profile after invitation
- Discover, join, and leave clubs
- Post in club feeds, comment, like
- RSVP to events (Going / Interested / Not Going)
- Receive notifications
- Report inappropriate content
- Edit own profile and settings

### Restrictions

- Cannot create clubs
- Cannot manage other users
- Cannot see admin pages
- Cannot approve/reject join requests
- Cannot pin/delete others' posts

---

## 2. Club Admin Experience

**Role:** `MembershipRole.Admin` on a specific club

A club admin sees the same app as a student, but gets **additional controls within the clubs they administer**.

### Additional UI: "Manage" Tab in Club Detail

When the current user is an admin of the viewed club, a 5th tab appears:

```
About | Feed | Events | Members | Manage
```

### Manage Tab Sections

#### Club Settings
- Edit club name, description, category
- Upload/change cover image and club icon
- Toggle privacy (public/private)

#### Member Management
- View all members with search/filter
- Approve/reject pending join requests (private clubs)
- Promote member → admin
- Demote admin → member  
- Remove members

#### Content Moderation
- Pin/unpin posts in the feed
- Delete any post in the club feed
- Delete comments

#### Event Management
- Create new events for the club
- Edit existing events
- Cancel/delete events

### UI Indicators

| Element | Behavior |
|---------|----------|
| "Manage" tab | Only visible if `currentUser.memberships[clubId].role === "Admin"` |
| Delete button on posts | Visible on all posts (not just own) in the feed tab |
| "Pin" action on posts | Visible in post dropdown menu |
| "Create Event" button | Appears in the Events tab header |
| Member actions (promote/remove) | Visible in Members tab rows |

### Manage Tab Layout

```
┌─────────────────────────────────────────────┐
│ Manage — Coding Club                        │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─ Club Settings ────────────────────────┐  │
│ │ [Edit club info form]                  │  │
│ │ Name, description, category, privacy   │  │
│ │ Cover image upload                     │  │
│ └────────────────────────────────────────┘  │
│                                             │
│ ┌─ Pending Requests (3) ─────────────────┐  │
│ │ [Avatar] Student Name — Approve/Reject │  │
│ │ [Avatar] Student Name — Approve/Reject │  │
│ └────────────────────────────────────────┘  │
│                                             │
│ ┌─ Danger Zone ──────────────────────────┐  │
│ │ Archive Club  [Archive]                │  │
│ └────────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 3. University Admin Experience

**Role:** `UserRole.UniversityAdmin`

Gets everything a student sees **plus** a dedicated admin section in the sidebar.

### Sidebar Navigation

```
── Main ──
Dashboard
Discover Clubs
My Clubs
Events
Notifications
Profile

── Admin ──
Students
Manage Clubs
Reports
Analytics
Settings
```

The "Admin" section is **only visible** when `user.role === "UniversityAdmin"`.

### Admin Pages

#### `/admin/students` — Student Management

| Feature | Description |
|---------|-------------|
| Student list | Table: name, email, faculty, status, joined date, actions |
| Invite students | Single invite (email) or bulk CSV import |
| Resend invitation | For students with status "Invited" |
| Disable account | Block login, set status to "Disabled" |
| Re-enable account | Restore access |
| Reset password | Force password reset |

**Page Layout:**
```
┌───────────────────────────────────────────────┐
│ Students                         [Invite +]   │
├───────────────────────────────────────────────┤
│ [Search...] [Filter: Status ▾] [Faculty ▾]   │
├───────────────────────────────────────────────┤
│ ┌─ Table ──────────────────────────────────┐  │
│ │ Name       │ Email    │ Status │ Actions │  │
│ │ ─────────────────────────────────────────│  │
│ │ [Avatar] A │ a@uni    │ Active │ ⋮       │  │
│ │ [Avatar] B │ b@uni    │ Invited│ ⋮       │  │
│ └──────────────────────────────────────────┘  │
│ Showing 25 of 1,240         [< 1 2 3 ... >]  │
└───────────────────────────────────────────────┘
```

#### `/admin/clubs` — Club Management

| Feature | Description |
|---------|-------------|
| All clubs list | Table/grid: name, category, privacy, members, status |
| Create club | Form: name, description, category, privacy, assign admin |
| Verify club | Mark club as officially recognized |
| Archive club | Soft-delete, hides from discover |
| Assign club admin | Assign any student as MembershipRole.Admin |

**Page Layout:**
```
┌───────────────────────────────────────────────┐
│ Manage Clubs                  [Create Club +] │
├───────────────────────────────────────────────┤
│ [Search...] [Category ▾] [Status ▾]          │
├───────────────────────────────────────────────┤
│ ┌─ Grid/Table ─────────────────────────────┐  │
│ │ [Club Card] [Club Card] [Club Card]      │  │
│ │ [Club Card] [Club Card] [Club Card]      │  │
│ └──────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

#### `/admin/reports` — Content Reports

| Feature | Description |
|---------|-------------|
| Report queue | List of unresolved reports |
| Report detail | See reported content, reporter, reason |
| Actions | Dismiss report, warn user, remove content, disable user |

**Page Layout:**
```
┌───────────────────────────────────────────────┐
│ Reports                          [3 pending]  │
├───────────────────────────────────────────────┤
│ [Tabs: Pending | Resolved | All]              │
├───────────────────────────────────────────────┤
│ ┌─ Report Item ────────────────────────────┐  │
│ │ [Type badge] Post in Coding Club         │  │
│ │ Reported by: Student A — 2 hours ago     │  │
│ │ Reason: Inappropriate content            │  │
│ │ [View] [Dismiss] [Remove Content]        │  │
│ └──────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

#### `/admin/analytics` — Platform Analytics

| Feature | Description |
|---------|-------------|
| Overview cards | Total students, active clubs, events this month, engagement rate |
| Charts | Signups over time, club activity, event attendance trends |
| Top lists | Most active clubs, most popular events |

**Page Layout:**
```
┌───────────────────────────────────────────────┐
│ Analytics                                     │
├───────────────────────────────────────────────┤
│ [Students: 1,240] [Clubs: 24] [Events: 12]   │
├───────────────────────────────────────────────┤
│ ┌─ Signups Chart ──────────────────────────┐  │
│ │ [Line chart — last 30 days]              │  │
│ └──────────────────────────────────────────┘  │
│ ┌─ Top Clubs ──────┐ ┌─ Upcoming Events ──┐  │
│ │ 1. Coding (1.2k) │ │ Hackathon — Oct 24 │  │
│ │ 2. Esports (3.4k)│ │ Design Expo — Oct28│  │
│ └──────────────────┘ └────────────────────┘  │
└───────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Auth + Role Infrastructure

1. Add `role` field to frontend `User` type and auth store
2. Update `/auth/me` MSW mock to return role
3. Create `requireRole()` guard utility for route `beforeLoad`
4. Conditionally render admin sidebar section based on role

### Phase 2: Club Admin — Manage Tab

5. Add `Manage` tab to club detail page (conditionally)
6. Create club settings edit form
7. Create pending requests approval UI
8. Add pin/delete actions to feed posts
9. Create event form (create/edit)
10. MSW handlers for all club admin endpoints

### Phase 3: University Admin Pages

11. Create `/admin/students` page — table, invite, manage
12. Create `/admin/clubs` page — list, create, archive
13. Create `/admin/reports` page — queue, actions
14. Create `/admin/analytics` page — stats cards, charts
15. MSW handlers for all admin endpoints

### Phase 4: Role-Based Route Protection

16. Protect `/admin/*` routes with `UniversityAdmin` role check
17. Protect club manage tab with membership role check
18. Redirect unauthorized access to dashboard with toast

---

## Conditional Rendering Rules

### Sidebar

```tsx
// Always shown
<NavItem href="/dashboard" />
<NavItem href="/clubs" />
<NavItem href="/events" />
<NavItem href="/notifications" />
<NavItem href="/profile" />

// Only for UniversityAdmin
{user.role === "UniversityAdmin" && (
  <>
    <Separator label="Admin" />
    <NavItem href="/admin/students" />
    <NavItem href="/admin/clubs" />
    <NavItem href="/admin/reports" />
    <NavItem href="/admin/analytics" />
  </>
)}
```

### Club Detail Tabs

```tsx
const tabs = ["About", "Feed", "Events", "Members"];

// Add Manage tab if user is club admin
if (isClubAdmin) {
  tabs.push("Manage");
}
```

### Post Actions in Feed

```tsx
// All users see: Like, Comment
// Club admins additionally see: Pin, Delete
{isClubAdmin && (
  <>
    <DropdownItem label="Pin post" />
    <DropdownItem label="Delete post" />
  </>
)}
```

---

## Route Structure

```
/                          → Landing (public)
/login                     → Login (public)
/invite                    → Accept invitation (public)

/dashboard                 → Student dashboard (auth)
/clubs                     → Discover clubs (auth)
/clubs/:id                 → Club detail + tabs (auth)
/my-clubs                  → My clubs list (auth)
/events                    → Events listing (auth)
/events/:id                → Event detail (auth)
/notifications             → Notifications (auth)
/profile                   → Profile (auth)
/settings                  → Settings (auth)

/admin/students            → Student management (UniversityAdmin)
/admin/clubs               → Club management (UniversityAdmin)
/admin/reports             → Report queue (UniversityAdmin)
/admin/analytics           → Platform analytics (UniversityAdmin)
```

---

## API Endpoints by Role

### Student APIs (all authenticated users)

```
GET    /auth/me
GET    /clubs
GET    /clubs/:id
POST   /clubs/:id/join
DELETE  /clubs/:id/leave
GET    /events
GET    /events/:id
POST   /events/:id/rsvp
GET    /notifications
PUT    /profile
POST   /posts
POST   /posts/:id/comments
POST   /posts/:id/like
POST   /reports
```

### Club Admin APIs (MembershipRole.Admin for that club)

```
PUT    /clubs/:id                    — Edit club info
POST   /clubs/:id/events             — Create event
PUT    /clubs/:id/events/:eventId    — Edit event
DELETE /clubs/:id/events/:eventId    — Delete event
PUT    /clubs/:id/members/:userId    — Change member role
DELETE /clubs/:id/members/:userId    — Remove member
POST   /clubs/:id/members/:userId/approve  — Approve join request
POST   /clubs/:id/members/:userId/reject   — Reject join request
PUT    /clubs/:id/posts/:postId/pin  — Pin post
DELETE /clubs/:id/posts/:postId      — Delete post
```

### University Admin APIs (UserRole.UniversityAdmin)

```
GET    /admin/students               — List students
POST   /admin/students/invite        — Invite student(s)
PUT    /admin/students/:id/disable   — Disable account
PUT    /admin/students/:id/enable    — Re-enable account
POST   /admin/students/:id/reset-password

GET    /admin/clubs                  — List all clubs (with admin view)
POST   /admin/clubs                  — Create club
PUT    /admin/clubs/:id/verify       — Verify club
PUT    /admin/clubs/:id/archive      — Archive club
PUT    /admin/clubs/:id/assign-admin — Assign club admin

GET    /admin/reports                — List reports
PUT    /admin/reports/:id/dismiss    — Dismiss report
PUT    /admin/reports/:id/action     — Take action on report

GET    /admin/analytics              — Platform stats
```
