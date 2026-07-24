# Shared Components

## Goal

Define the reusable component library used across all pages. Each component follows the design system and uses CVA for variants.

---

# Form Components

## Button

Variants: Primary, Secondary, Ghost, Danger

Sizes: sm, md, lg

States: Default, Hover, Active, Disabled, Loading

Loading state shows spinner and disables interaction.

Full-width option available.

---

## Input

Types: text, email, password, number, url

States: Default, Focus, Error, Disabled

Includes: Label (above), Helper text (below), Error message

Password variant includes show/hide toggle.

Height: 44px.

---

## Select

Native-styled dropdown with custom chevron.

States: Default, Focus, Error, Disabled

Supports: Placeholder, Label, Helper text.

---

## Textarea

Resizable (vertical only).

Character counter (optional).

States: Default, Focus, Error, Disabled.

---

## Checkbox

Label to the right.

States: Unchecked, Checked, Indeterminate, Disabled.

---

## Switch

Toggle between two states.

Label to the left.

States: Off, On, Disabled.

---

## File Upload

Click-to-upload zone with drag-and-drop support.

Shows file name and size after selection.

Preview for images.

Remove button.

Accepts format and size constraints.

---

## Rich Text Editor

Basic formatting: Bold, Italic, Lists, Links.

Used for post content and event descriptions.

Toolbar above editor area.

---

# Display Components

## Avatar

Sizes: xs (24px), sm (32px), md (40px), lg (64px), xl (96px)

Shape: Circle.

Fallback: Initials on gray background.

Supports: Online indicator dot, Badge overlay.

---

## Badge

Variants: Default (gray), Success (green), Warning (amber), Error (red), Info (blue)

Sizes: sm, md

Used for: Status indicators, category labels, counts.

---

## Card

Variants: Default (with border), Elevated (with shadow)

Padding: 24px (adjustable).

Radius: 10px.

Supports: Header, Body, Footer slots.

---

## Stat Card

Large number display.

Label below.

Optional: Trend indicator, Icon, Sparkline.

---

## Metric Card

Similar to Stat Card but with more detail.

Includes: Title, Value, Change percentage, Period label.

---

## Skeleton

Placeholder for loading states.

Shapes: Text line, Circle, Rectangle, Card.

Animated shimmer effect.

---

## Empty State

Contains: Icon/Illustration, Title, Description, Action button (optional).

Centered within its container.

---

# Navigation Components

## Sidebar

Fixed left navigation.

Sections with icon + label links.

Active state: Left border accent + background highlight.

Collapsible (icons only mode).

User info at bottom.

---

## Navbar

Fixed top bar.

Contains: Page title, Search, Notification bell, User dropdown.

Height: 64px.

Bottom border.

---

## Tabs

Horizontal tab navigation.

Variants: Underline (default), Pill.

Supports: Badge on tab (for counts).

ARIA: tablist, tab, tabpanel roles.

---

## Pagination

Page numbers with prev/next arrows.

Shows: Current page, Total pages.

Supports: Page size selector.

---

## Dropdown

Trigger + floating menu.

Menu items with: Icon (optional), Label, Description (optional).

Supports: Dividers, Danger items.

Keyboard navigable.

---

# Overlay Components

## Dialog

Centered modal overlay.

Sizes: sm (400px), md (480px), lg (720px).

Contains: Title, Body, Footer (actions).

Backdrop click closes (configurable).

Focus trapped inside.

---

## Drawer

Slide-in panel from right (or left for mobile nav).

Sizes: sm (320px), md (480px), lg (640px).

Used for: Detail panels, mobile navigation.

---

## Toast

Notification popup at bottom-right.

Variants: Success, Error, Info, Warning.

Auto-dismiss after 5 seconds.

Supports: Action button, Dismiss X.

---

## Alert

Inline notification bar.

Variants: Success, Error, Info, Warning.

Contains: Icon, Message, Action (optional), Dismiss (optional).

---

# Data Components

## Table

Responsive data table.

Features: Sortable columns, Sticky header, Hover rows, Pagination.

Padding: 16px per cell.

Mobile: Converts to card-based list.

---

## Data Grid

Extended table with: Filtering, Column toggling, Bulk actions.

Used in admin management pages.

---

## Search Input

Input with search icon.

Debounced onChange (300ms).

Clear button when has value.

Variants: Inline (in tables), Full (standalone hero).

---

# Content Components

## Comment

Contains: Avatar, Author name, Content, Timestamp, Like button, Reply button.

Nested replies indented.

---

## Post Card

Contains: Author info, Post type badge, Content, Image (optional), Engagement bar (likes, comments), Actions menu.

---

## Club Card

Contains: Cover image, Logo, Name, Category badge, Description, Member count, Privacy badge, Join button.

Hover: Lift animation.

---

## Event Card

Contains: Cover image, Date badge overlay, Title, Club name, Venue, Time, RSVP button.

---

## Notification Item

Contains: Type icon, Title, Message, Timestamp, Unread indicator.

Clickable — navigates to referenced content.

---

# Utility Components

## Calendar

Date picker component.

Supports: Single date, Date range.

Keyboard navigable.

---

# Component Guidelines

- All components accept className prop for extension
- Use cn() helper for conditional class merging
- CVA for variant definitions
- Forwardref for DOM access where needed
- All interactive components are keyboard accessible
- All form components integrate with React Hook Form
- All components support dark mode (future, via CSS variables)
