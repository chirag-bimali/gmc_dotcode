# Club Feed

## Goal

Display a chronological feed of posts within a club, allowing members to create posts, comment, and interact.

---

# User

Student (must be a club member)

---

# Route

/clubs/:id/feed (or tab within Club Details)

---

# Layout

Uses the authenticated application layout.

Feed is the primary content area within the club context.

---

# Page Sections

## Create Post

Sticky at top of feed.

Contains:

- User avatar
- "What's on your mind?" placeholder
- Click opens post composer

### Post Composer (expanded or modal)

- Post Type selector: Text, Image, Announcement, Poll
- Title (optional for text, required for announcements)
- Content (rich text area)
- Image Upload (for image type)
- Poll Options (for poll type, min 2, max 5 options)
- Attachment upload
- Submit Button: "Post"
- Cancel

---

## Pinned Posts

If any posts are pinned, show them first with a "Pinned" badge.

Max 3 pinned posts visible.

---

## Feed

Infinite scroll or paginated.

Sorted by newest first.

Each post card contains:

- Author Avatar
- Author Name
- Post Type Badge (if announcement or poll)
- Timestamp (relative)
- Title (if present)
- Content (truncated at 3 lines, "Read more" expander)
- Image (if image post)
- Poll UI (if poll — radio buttons, vote count after voting)
- Attachments (file links)
- Like Button + Count
- Comment Button + Count
- Actions Menu (edit/delete for own posts)

---

## Comments Section (expanded)

Below each post when "Comments" is clicked:

- List of comments (newest first or oldest first toggle)
- Comment input at bottom
- Reply support (indent replies)
- Each comment shows: avatar, name, content, timestamp, like

---

# Empty State

"No posts yet. Be the first to share something!"

---

# Loading State

Skeleton post cards.

Spinner for "Load more" at bottom.

---

# Error State

"Failed to load posts. Retry."

---

# Interactions

- Create post: POST /api/clubs/:clubId/posts
- Like post: POST /api/posts/:postId/like
- Unlike: DELETE /api/posts/:postId/like
- Comment: POST /api/posts/:postId/comments
- Edit post: PUT /api/posts/:id
- Delete post: DELETE /api/posts/:id (confirmation dialog)
- Vote on poll: (stored as reaction/custom endpoint)

---

# Responsive Behaviour

Desktop: Feed centered, max-width 700px (reading width)

Tablet: Same, full available width

Mobile: Full width, no horizontal margins

---

# Accessibility

Post composer is focusable and announces open/close.

Like buttons have aria-pressed state.

Comments are in a landmark region.

Image posts have alt text support.

---

# Components Required

- Card
- Avatar
- Button
- Textarea
- Input
- Badge
- Dialog
- File Upload
- Dropdown (actions menu)
- Comment component

---

# Data

Consumes:

- GET /api/clubs/:clubId/posts
- POST /api/clubs/:clubId/posts
- POST /api/posts/:postId/like
- DELETE /api/posts/:postId/like
- GET /api/posts/:postId/comments
- POST /api/posts/:postId/comments
- PUT /api/posts/:id
- DELETE /api/posts/:id

---

# Design Notes

Feed should feel social — similar energy to a Discord channel or Slack.

Post cards have clear visual separation (border or subtle background).

Like interaction should feel instant (optimistic update).

Comment section slides open with smooth animation.

Keep post composer minimal until expanded.
