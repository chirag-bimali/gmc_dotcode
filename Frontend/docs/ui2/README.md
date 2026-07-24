# UI2 — Stitch Design Prompts

Page design prompts for generating consistent UI screens with Stitch (or any AI design tool).

## How to Use

1. Always prepend `00-design-system-context.md` content at the top of your Stitch prompt
2. Then paste the specific page prompt below it
3. This ensures consistent colors, typography, spacing, and component patterns across all screens

## Files

| # | File | Page | Role |
|---|------|------|------|
| 00 | `00-design-system-context.md` | Design tokens & component patterns | Shared reference |
| 01 | `01-club-manage-tab.md` | Club Manage tab (settings, requests, danger zone) | Club Admin |
| 02 | `02-club-create-event.md` | Create Event form | Club Admin |
| 03 | `03-admin-students.md` | Student management (table, invite, actions) | University Admin |
| 04 | `04-admin-clubs.md` | Club management (grid, create, verify, archive) | University Admin |
| 05 | `05-admin-reports.md` | Report moderation queue | University Admin |
| 06 | `06-admin-analytics.md` | Analytics dashboard (stats, charts, lists) | University Admin |
| 07 | `07-admin-sidebar-variant.md` | Sidebar with Admin section | University Admin |
| 08 | `08-student-my-clubs.md` | My Clubs (joined, pending, administering) | Student |
| 09 | `09-notifications-page.md` | Notifications list | Student |
| 10 | `10-student-profile.md` | Profile view + edit | Student |
| 11 | `11-settings-page.md` | Settings (account, notifications, appearance) | Student |

## Design Principles

- **Minimal**: grayscale palette, no color overuse — only black, white, and grays for UI chrome
- **Color for meaning**: emerald=success, amber=warning, red=error/danger, blue=info — never decorative
- **Dense but breathable**: compact data, generous whitespace between sections
- **Consistent**: every page uses the same shell, same card patterns, same button styles
- **Responsive**: mobile-first, 1-2-3-4 column grids that collapse gracefully
