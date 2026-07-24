# Club Create Event Page

## Context

This is a modal or full-page form accessible from the club's Events tab (via a "+ Create Event" button visible only to club admins). Uses the standard app shell. The page title in the topbar reads "Create Event".

## Page Layout

Single centered card (max-w-[700px] mx-auto, bg-white, border, rounded-xl, p-6/p-8).

### Header

- Title: "Create New Event" (text-2xl font-bold)
- Subtitle: "for Coding Club" (text-sm text-gray-500, club name dynamic)

### Form Fields (stacked, space-y-5)

1. **Event Title** — text input, placeholder "e.g., Winter Hackathon 2024"
2. **Cover Image** — upload area (dashed border, rounded-lg, h-40, bg-gray-50, centered upload icon + "Drag & drop or click to upload" text)
3. **Date & Time** (grid 2 columns):
   - Start Date — date input
   - End Date — date input
   - Start Time — time input
   - End Time — time input
4. **Location** — text input, placeholder "e.g., Main Hall, Building A"
5. **Capacity** — number input, placeholder "e.g., 150"
6. **Description** — textarea, 5 rows, placeholder "Describe what this event is about..."

### Actions (bottom of form, flex justify-between)

- Left: "Cancel" button (secondary, border)
- Right: "Create Event" button (primary, bg-black text-white)

## Visual Style

- Consistent with the rest of the app: Inter font, gray-200 borders on inputs, rounded-lg, focus:ring-black
- Labels: text-sm font-medium text-black, mb-1.5 above each input
- Error state: border-red-500 on input, text-xs text-red-600 below

## States

- **Default**: empty form, Create button enabled
- **Validation errors**: inline errors below fields, red borders
- **Submitting**: Create button shows spinner + "Creating..." text, disabled
- **Success**: redirect back to club's Events tab
