# Student Hub - Phase 1 MVP

> **Goal:** Build the smallest useful version of Student Hub that allows students to discover clubs, join communities, communicate, and participate in events.

---

# 1. Vision

Student Hub is a platform where students from a university can:

- Discover clubs and communities
- Join clubs
- Meet like-minded people
- Participate in events
- Share knowledge and updates

---

# 2. MVP Goals

The MVP should answer these questions:

- Can students easily discover clubs?
- Will students actively join communities?
- Will clubs use the platform instead of existing tools?
- Can universities manage student clubs digitally?

---

# 3. User Roles

## 3.1 Student

### Permissions

- Register/Login
- Create profile
- Browse universities
- Join clubs
- Leave clubs
- View club feeds
- Create posts
- Comment on posts
- Like posts
- RSVP to events
- Receive notifications
- Report inappropriate content

---

## 3.2 Club Admin

Everything a Student can do plus:

- Create club
- Edit club
- Delete club
- Approve join requests (Private Clubs)
- Remove members
- Create events
- Edit events
- Delete events
- Pin important posts
- Moderate club content

---

## 3.3 University Admin

Everything a Club Admin can do plus:

- Verify clubs
- Manage users
- Suspend clubs
- Remove inappropriate content
- View analytics
- Review reports

---

# 4. Authentication

## Features

- Email Registration
- Email Login
- Password Reset
- Email Verification

Future

- Google Login
- University SSO

---

# 5. User Profile

## Fields

- Full Name
- Avatar
- Bio
- University
- Faculty
- Department
- Batch
- Skills
- Interests
- Social Links

---

# 6. University

## Fields

- Name
- Logo
- Description
- Total Students
- Total Clubs

Each student belongs to one university.

---

# 7. Clubs

## Fields

- Name
- Logo
- Cover Image
- Description
- Category
- Privacy
- Created By
- Created Date

---

## Club Categories

- Technology
- AI
- Programming
- Football
- Basketball
- Swimming
- Book Club
- Robotics
- Entrepreneurship
- Photography
- Gaming
- Music
- Dance
- Hiking
- Debate

---

## Privacy Types

- Public
- Private

---

# 8. Membership

Student can

- Join Club
- Leave Club

Private Club

- Send Join Request
- Club Admin Approves

---

# 9. Feed

Every club has its own feed.

Students can:

- Create Post
- Edit Post
- Delete Own Post
- Like Posts
- Comment
- Share Link

---

# 10. Posts

## Types

- Text
- Image
- Poll
- Announcement

## Fields

- Title
- Description
- Attachments
- Created By
- Created Date

---

# 11. Comments

Support

- Comment
- Reply

Future

- Unlimited Nested Replies

---

# 12. Reactions

Only one reaction for MVP.

- 👍 Like

---

# 13. Events

Club Admins can create events.

## Fields

- Title
- Description
- Date
- Time
- Venue
- Capacity
- Cover Image

---

# 14. RSVP

Students can respond

- Going
- Interested
- Not Going

---

# 15. Notifications

Notify when

- Someone liked your post
- Someone commented
- New club event
- Join request approved
- Club announcement

---

# 16. Search

Search

- Clubs
- Students
- Events

---

# 17. Discover

Sections

- Popular Clubs
- New Clubs
- Trending Clubs
- Upcoming Events

---

# 18. Reporting

Students can report

- Spam
- Harassment
- Abuse
- Fake Content

University Admin reviews reports.

---

# 19. Analytics

## Club Dashboard

- Members
- Posts
- Events
- Engagement
- Growth

## University Dashboard

- Total Students
- Total Clubs
- Active Users
- Total Posts
- Total Events

---

# 20. Database Design

## User

```text
Id
Name
Email
PasswordHash
Avatar
Bio
UniversityId
Faculty
Department
Batch
```

## University

```text
Id
Name
Logo
Description
```

## Club

```text
Id
UniversityId
Name
Description
Category
Privacy
Logo
CoverImage
CreatedBy
CreatedAt
```

## Membership

```text
Id
ClubId
UserId
Role
Status
JoinedAt
```

## Post

```text
Id
ClubId
UserId
Title
Content
CreatedAt
UpdatedAt
```

## Comment

```text
Id
PostId
UserId
ParentCommentId
Content
CreatedAt
```

## Event

```text
Id
ClubId
Title
Description
Venue
StartTime
EndTime
Capacity
```

## RSVP

```text
Id
EventId
UserId
Status
```

## Notification

```text
Id
UserId
Type
ReferenceId
IsRead
CreatedAt
```

## Report

```text
Id
ReporterId
TargetType
TargetId
Reason
Status
CreatedAt
```

---

# 21. REST API Structure

```text
/api/auth

/api/users

/api/universities

/api/clubs

/api/memberships

/api/posts

/api/comments

/api/events

/api/rsvps

/api/notifications

/api/reports
```

---

# 22. Pages

## Public

- Landing Page
- Login
- Register
- Forgot Password

---

## Student

- Home Feed
- Discover
- Club Details
- Club Feed
- Events
- Notifications
- Search
- Profile
- Edit Profile

---

## Club Admin

- Dashboard
- Manage Members
- Manage Posts
- Manage Events
- Club Settings

---

## University Admin

- Dashboard
- Manage Users
- Manage Clubs
- Reports
- Analytics

---

# 23. Non-Functional Requirements

## Performance

- Fast page load
- Responsive UI
- Lazy image loading

## Security

- JWT Authentication
- Password Hashing
- Authorization
- Rate Limiting
- Input Validation

## Accessibility

- Mobile Responsive
- Keyboard Navigation
- Screen Reader Friendly

---

# 24. Success Metrics

Track

- Registered Students
- Active Users
- Clubs Created
- Club Memberships
- Posts Created
- Comments
- Event RSVPs
- Weekly Active Users
- Student Retention

---

# 25. Out of Scope (Phase 2)

Do **not** build these yet.

- Direct Messaging
- Real-time Chat
- AI Assistant
- AI Recommendations
- Marketplace
- Internship Portal
- Alumni Network
- Course Marketplace
- Attendance QR
- Club Finance
- Payment Gateway
- Mobile App
- Live Streaming
- Video Posts
- File Collaboration

---

# 26. Development Milestones

## Phase 1.1 — Foundation

- Authentication
- User Profiles
- Universities

---

## Phase 1.2 — Communities

- Clubs
- Memberships
- Discovery

---

## Phase 1.3 — Engagement

- Posts
- Comments
- Likes

---

## Phase 1.4 — Events

- Event Creation
- RSVP

---

## Phase 1.5 — Administration

- Moderation
- Reports
- Notifications
- Analytics

---

# 27. MVP Definition of Done

The MVP is complete when a student can:

- Register an account
- Join their university
- Discover clubs
- Join a club
- View club feed
- Create a post
- Comment on a post
- Like a post
- RSVP to an event
- Receive notifications

A Club Admin can:

- Create a club
- Manage members
- Create events
- Moderate posts

A University Admin can:

- Manage clubs
- Manage users
- Review reports
- View platform analytics

At this point, Student Hub is ready for pilot testing with one university and a small group of student clubs.