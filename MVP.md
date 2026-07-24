# Student Hub — Phase 1 MVP

> **Version:** 1.0
>
> **Objective:** Build a university-managed community platform where verified students can discover clubs, participate in communities, and attend events.

---

# 1. Vision

Student Hub is a centralized platform for universities to digitally manage student communities, clubs, and campus events.

Unlike public social media, every student is verified through their university before gaining access.

---

# 2. MVP Goals

The Phase 1 MVP aims to validate the following:

- Universities can digitally manage students and clubs.
- Students actively participate in communities.
- Clubs use Student Hub to communicate with members.
- Students discover events and join communities.

---

# 3. Core Principles

- University-managed platform
- Verified student identities
- Community-first
- Simple and easy to use
- Mobile-friendly
- Secure by default

---

# 4. User Roles

## 4.1 Student

Students **cannot create accounts directly**.

A university must invite them before they can access the platform.

### Permissions

- Complete profile after invitation
- Login
- View and edit profile
- Discover clubs
- Join clubs
- Leave clubs
- Create posts
- Comment
- Like posts
- RSVP to events
- Receive notifications
- Report inappropriate content

---

## 4.2 Club Admin

Everything a Student can do, plus:

- Manage club
- Edit club information
- Manage club members
- Approve join requests (Private Clubs)
- Create events
- Edit events
- Delete events
- Pin important posts
- Moderate club posts

---

## 4.3 University Admin

Everything a Club Admin can do, plus:

### Student Management

- Invite students
- Bulk import students
- Resend invitations
- Disable student accounts
- Remove students
- Reset passwords

### Club Management

- Create clubs
- Verify clubs
- Archive clubs
- Assign Club Admins

### Platform Management

- Manage reports
- Moderate content
- View analytics

---

# 5. Student Onboarding

## Registration Flow

```text
Student
      │
      ▼
Provides University Email
(or University registers them)

      │
      ▼
University Admin
creates invitation

      │
      ▼
Invitation Email Sent

      │
      ▼
Student Opens Invitation

      │
      ▼
Creates Password

      │
      ▼
Completes Profile

      │
      ▼
Account Activated
```

---

# 6. Authentication

## Supported

- Email + Password

Future

- Google Login
- University SSO
- Microsoft Entra ID

---

# 7. Student Account States

| Status | Description |
|----------|-------------|
| Invited | Invitation sent |
| Pending Profile | Student has not completed profile |
| Active | Student can use the platform |
| Disabled | Login disabled |

---

# 8. User Profile

## University Managed

- University
- Student Email
- Student ID (optional)
- Faculty
- Department
- Batch

## Student Managedj

- Profile Picture
- Bio
- Interests
- Skills
- Social Links
- Password

---

# 9. University

Each Student belongs to one University.

## Fields

- Name
- Logo
- Description
- Website
- Total Students
- Total Clubs

---

# 10. Clubs

Students can discover clubs inside their university.

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
- Programming
- AI
- Robotics
- Entrepreneurship
- Football
- Basketball
- Swimming
- Photography
- Book Club
- Debate
- Music
- Dance
- Gaming
- Hiking
- Others

---

## Privacy

- Public
- Private

---

# 11. Membership

## Public Club

Student clicks **Join**.

Member immediately.

---

## Private Club

Student requests membership.

Club Admin approves.

---

# 12. Club Feed

Each club has its own feed.

Students can:

- Create posts
- Edit own posts
- Delete own posts
- Comment
- Like

---

# 13. Posts

## Supported Types

- Text
- Image
- Announcement
- Poll

---

## Fields

- Title
- Content
- Attachments
- Author
- Created Date

---

# 14. Comments

Support

- Comment
- Reply

Nested replies can be extended later.

---

# 15. Reactions

Only one reaction in MVP.

- 👍 Like

---

# 16. Events

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

# 17. RSVP

Students can respond

- Going
- Interested
- Not Going

---

# 18. Notifications

Students receive notifications for

- Likes
- Comments
- New Events
- Club Announcements
- Membership Approval

---

# 19. Search

Students can search

- Clubs
- Students
- Events

---

# 20. Discover

Display

- Popular Clubs
- New Clubs
- Upcoming Events
- Suggested Clubs

---

# 21. Reporting

Students can report

- Spam
- Harassment
- Abuse
- Inappropriate Content

University Admin reviews reports.

---

# 22. Analytics

## University Dashboard

- Total Students
- Active Students
- Total Clubs
- Total Posts
- Total Events
- Weekly Active Users

---

## Club Dashboard

- Total Members
- Active Members
- Posts
- Events
- Engagement

---

# 23. Database

## Tables

### universities

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | NOT NULL |
| logo | VARCHAR | |
| description | TEXT | |
| website | VARCHAR | |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### faculties

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| university_id | UUID | FK → universities.id, NOT NULL |
| name | VARCHAR | NOT NULL |
| created_at | TIMESTAMP | NOT NULL |

UNIQUE(university_id, name)

---

### departments

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| faculty_id | UUID | FK → faculties.id, NOT NULL |
| name | VARCHAR | NOT NULL |
| created_at | TIMESTAMP | NOT NULL |

UNIQUE(faculty_id, name)

---

### batches

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| university_id | UUID | FK → universities.id, NOT NULL |
| name | VARCHAR | NOT NULL |
| created_at | TIMESTAMP | NOT NULL |

UNIQUE(university_id, name)

---

### users

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| university_id | UUID | FK → universities.id, NOT NULL |
| email | VARCHAR | UNIQUE, NOT NULL |
| password_hash | VARCHAR | |
| role | ENUM | student, club_admin, university_admin |
| status | ENUM | invited, pending_profile, active, disabled |
| student_id | VARCHAR | |
| faculty_id | UUID | FK → faculties.id, NULLABLE |
| department_id | UUID | FK → departments.id, NULLABLE |
| batch_id | UUID | FK → batches.id, NULLABLE |
| profile_picture | VARCHAR | |
| bio | TEXT | |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### interests

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | UNIQUE, NOT NULL |

---

### user_interests

| Column | Type | Constraints |
|--------|------|-------------|
| user_id | UUID | FK → users.id, NOT NULL |
| interest_id | UUID | FK → interests.id, NOT NULL |

PK(user_id, interest_id)

---

### skills

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | UNIQUE, NOT NULL |

---

### user_skills

| Column | Type | Constraints |
|--------|------|-------------|
| user_id | UUID | FK → users.id, NOT NULL |
| skill_id | UUID | FK → skills.id, NOT NULL |

PK(user_id, skill_id)

---

### social_platforms

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | UNIQUE, NOT NULL |

---

### user_social_links

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK → users.id, NOT NULL |
| platform_id | UUID | FK → social_platforms.id, NOT NULL |
| url | VARCHAR | NOT NULL |

UNIQUE(user_id, platform_id)

---

### invitations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| university_id | UUID | FK → universities.id, NOT NULL |
| email | VARCHAR | NOT NULL |
| invited_by | UUID | FK → users.id, NOT NULL |
| token | VARCHAR | UNIQUE, NOT NULL |
| status | ENUM | pending, accepted, expired |
| created_at | TIMESTAMP | NOT NULL |
| expires_at | TIMESTAMP | NOT NULL |

---

### club_categories

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | UNIQUE, NOT NULL |

---

### clubs

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| university_id | UUID | FK → universities.id, NOT NULL |
| name | VARCHAR | NOT NULL |
| logo | VARCHAR | |
| cover_image | VARCHAR | |
| description | TEXT | |
| category_id | UUID | FK → club_categories.id, NOT NULL |
| privacy | ENUM | public, private |
| created_by | UUID | FK → users.id, NOT NULL |
| is_verified | BOOLEAN | DEFAULT false |
| is_archived | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### memberships

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| club_id | UUID | FK → clubs.id, NOT NULL |
| user_id | UUID | FK → users.id, NOT NULL |
| role | ENUM | member, admin |
| status | ENUM | pending, approved, rejected |
| joined_at | TIMESTAMP | NOT NULL |

UNIQUE(club_id, user_id)

---

### posts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| club_id | UUID | FK → clubs.id, NOT NULL |
| author_id | UUID | FK → users.id, NOT NULL |
| type | ENUM | text, image, announcement, poll |
| title | VARCHAR | |
| content | TEXT | NOT NULL |
| is_pinned | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### post_attachments

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| post_id | UUID | FK → posts.id, NOT NULL |
| file_url | VARCHAR | NOT NULL |
| file_type | VARCHAR | NOT NULL |
| file_name | VARCHAR | |
| file_size | INTEGER | |
| created_at | TIMESTAMP | NOT NULL |

---

### comments

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| post_id | UUID | FK → posts.id, NOT NULL |
| author_id | UUID | FK → users.id, NOT NULL |
| parent_id | UUID | FK → comments.id, NULLABLE |
| content | TEXT | NOT NULL |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### likes

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| post_id | UUID | FK → posts.id, NOT NULL |
| user_id | UUID | FK → users.id, NOT NULL |
| created_at | TIMESTAMP | NOT NULL |

UNIQUE(post_id, user_id)

---

### events

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| club_id | UUID | FK → clubs.id, NOT NULL |
| created_by | UUID | FK → users.id, NOT NULL |
| title | VARCHAR | NOT NULL |
| description | TEXT | |
| date | DATE | NOT NULL |
| time | TIME | NOT NULL |
| venue | VARCHAR | |
| capacity | INTEGER | |
| cover_image | VARCHAR | |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

### rsvps

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| event_id | UUID | FK → events.id, NOT NULL |
| user_id | UUID | FK → users.id, NOT NULL |
| status | ENUM | going, interested, not_going |
| created_at | TIMESTAMP | NOT NULL |

UNIQUE(event_id, user_id)

---

### notifications

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK → users.id, NOT NULL |
| type | ENUM | like, comment, event, announcement, membership |
| title | VARCHAR | NOT NULL |
| message | TEXT | NOT NULL |
| reference_type | ENUM | post, comment, event, club, membership |
| reference_id | UUID | NULLABLE |
| is_read | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | NOT NULL |

---

### report_types

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR | UNIQUE, NOT NULL |

---

### reports

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| reported_by | UUID | FK → users.id, NOT NULL |
| university_id | UUID | FK → universities.id, NOT NULL |
| report_type_id | UUID | FK → report_types.id, NOT NULL |
| target_type | ENUM | post, comment, user |
| target_id | UUID | NOT NULL |
| reason | TEXT | |
| status | ENUM | pending, reviewed, resolved, dismissed |
| reviewed_by | UUID | FK → users.id, NULLABLE |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

---

## Relationships

```text
universities   1 ──── * faculties
universities   1 ──── * batches
universities   1 ──── * users
universities   1 ──── * clubs
universities   1 ──── * invitations
faculties      1 ──── * departments
faculties      1 ──── * users
departments    1 ──── * users
batches        1 ──── * users
users          * ──── * interests (via user_interests)
users          * ──── * skills (via user_skills)
users          1 ──── * user_social_links
social_platforms 1 ── * user_social_links
club_categories 1 ── * clubs
users          1 ──── * memberships
clubs          1 ──── * memberships
users          1 ──── * posts
clubs          1 ──── * posts
posts          1 ──── * post_attachments
users          1 ──── * comments
posts          1 ──── * comments
comments       1 ──── * comments (replies)
users          1 ──── * likes
posts          1 ──── * likes
clubs          1 ──── * events
users          1 ──── * rsvps
events         1 ──── * rsvps
users          1 ──── * notifications
report_types   1 ──── * reports
users          1 ──── * reports
```

---

# 24. API Structure

```text
/api/auth

/api/invitations

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

# 25. Pages

## Authentication

- Accept Invitation
- Create Password
- Login
- Forgot Password

---

## Student

- Home
- Discover Clubs
- Club Details
- Club Feed
- Events
- Notifications
- Search
- Profile
- Edit Profile

---

## Club Admin

- Club Dashboard
- Manage Members
- Manage Posts
- Manage Events
- Club Settings

---

## University Admin

- Dashboard
- Student Management
- Invitations
- Club Management
- Reports
- Analytics

---

# 26. Non-Functional Requirements

## Performance

- Responsive Design
- Lazy Loading
- Fast API Response

---

## Security

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Input Validation
- Rate Limiting

---

## Accessibility

- Mobile Friendly
- Keyboard Accessible
- Screen Reader Support

---

# 27. Success Metrics

Track

- Registered Universities
- Invited Students
- Active Students
- Clubs Created
- Club Memberships
- Posts Created
- Comments
- Event RSVPs
- Weekly Active Users
- Student Retention

---

# 28. Out of Scope (Phase 2)

The following features are intentionally excluded from the MVP:

- Direct Messaging
- Real-time Chat
- AI Assistant
- AI Recommendations
- Marketplace
- Internship Portal
- Alumni Network
- Course Marketplace
- Attendance QR
- Payment Gateway
- Club Finance
- Mobile Applications
- Live Streaming
- Video Posts
- File Collaboration

---

# 29. Development Milestones

## Milestone 1 — Foundation

- Authentication
- Invitation System
- User Profiles
- Universities

---

## Milestone 2 — Communities

- Clubs
- Memberships
- Discovery

---

## Milestone 3 — Engagement

- Posts
- Comments
- Likes

---

## Milestone 4 — Events

- Event Management
- RSVP

---

## Milestone 5 — Administration

- Student Management
- Club Management
- Reports
- Notifications
- Analytics

---

# 30. MVP Definition of Done

## Student

- Accept invitation
- Create password
- Complete profile
- Login
- Discover clubs
- Join clubs
- Create posts
- Comment
- Like posts
- RSVP to events

---

## Club Admin

- Create and manage clubs
- Manage members
- Create and manage events
- Moderate club content

---

## University Admin

- Invite students
- Bulk import students
- Manage students
- Create and manage clubs
- Assign club admins
- Moderate reports
- View analytics

---

# Future Vision (Beyond Phase 1)

After validating the MVP, Student Hub can expand into a comprehensive campus platform with:

- Real-time messaging
- AI-powered club and event recommendations
- Alumni networking
- Internship and career opportunities
- Marketplace for students
- Digital student ID
- QR-based attendance
- Mobile applications
- University announcements
- Academic communities
- Multi-university collaboration