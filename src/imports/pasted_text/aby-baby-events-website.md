Use the following **Figma Make prompt**. It is structured, detailed, and optimized for generating an Instagram-inspired corporate website for **ABY Baby Events** while keeping it professional and scalable.

---

# Figma Make Prompt

Design a modern, premium, Instagram-inspired corporate website for **ABY Baby Events** ([https://abybabyevents.com/](https://abybabyevents.com/)) with a clean, responsive, social-media-style user experience.

## Overall Design Language

* Inspired by Instagram Web UI
* Premium corporate branding
* Clean white background
* Smooth micro-interactions
* Glassmorphism hover effects
* Rounded cards
* Framer Motion style animations
* Modern typography
* Minimal shadows
* Responsive-first design
* High-quality event imagery and reels
* Professional event management aesthetic

---

# DESKTOP LAYOUT (≥1160px)

Create a 3-column layout:

### Left Fixed Sidebar

Width: 72px collapsed
Width: 260px expanded on hover

Sidebar remains fixed while scrolling.

Navigation items:

* Company Logo
* Home
* Events
* Digital
* Exhibition
* Activation
* Presence
* Messages
* Profile
* More

Spacing:

* Equal spacing between Logo and all menu icons
* Equal spacing between menu items
* More section aligned near bottom
* Profile above More

Default State:

* Only icons visible

Hover State:

* Sidebar smoothly expands
* Labels appear beside icons

### More Menu Modal

Clicking More opens a floating modal containing:

* About Us
* Case Studies
* Privacy Policy
* Terms & Conditions
* Data Privacy

Instagram-style floating menu.

### Logo Behavior

Clicking Logo redirects to Home Page.

---

# HOME PAGE

## Top Stories Section

Instagram Stories inspired.

Horizontal client carousel.

Each client circle contains:

* Client logo
* Story status ring

Story Status:

* Gradient ring = unseen
* Grey ring = completed

Visible Clients:

* 6 clients at a time

Navigation:

* Next Arrow
* Previous Arrow

Behavior:

Initial load:

* Show only Next Arrow

After moving:

* Show both arrows

Smooth sliding animation.

---

## Client Story Viewer

When a client story is clicked:

Center Layout:

Display:

### Active Client Card (Center)

Largest card

Contains:

* Client logo
* Client name
* Service category

Position:

Top-left overlay

Media:

* Reels
* Videos
* Images

Instagram story viewer behavior.

### Adjacent Cards

Show:

* Previous 2 clients
* Next 2 clients

These cards:

* Smaller width
* Smaller height
* Lower opacity

Center card:

* Largest size
* Highest focus

Smooth scaling animation.

---

# MAIN FEED

Below stories section.

Instagram-style feed cards.

Each feed card contains:

### Header

* Client logo
* Client name
* Location

Hovering header opens mini profile card.

Mini Profile Card Contains:

* Logo
* Client Name
* Location
* Date

Also display:

Grid of project images.

Layout:

3-column grid.

---

### Media Section

Supports:

* Images
* Reels
* Videos
* Carousel galleries

Rounded corners.

---

### Actions Section

Icons:

* Like
* Comment
* Copy Link

Interactions:

Like:

* Heart animation
* Turns red

Copy:

* Copies project URL
* Shows toast notification

Comment:

* Opens comment modal

---

# RIGHT PANEL

Fixed right-side panel.

Contains 3 stacked sections:

## Upcoming Events

Initially show:

* 2 event cards

Card contains:

* Client logo
* Event name
* Location
* Visit button

Hover State:

Expand card.

Display:

* Event image
* Event type
* Days remaining
* Location
* Attendance count
* Highlighted event description

Smooth expand animation.

---

## Case Studies

Show:

* 2 featured case studies

Each contains:

* Thumbnail
* Client logo
* Title
* Short summary

Read More button.

---

## Awards & Recognition

Show:

* Award image
* Award title
* Year
* Description

Premium card design.

---

## Footer (Below Right Panel)

Links:

* Home
* About
* Presence
* Privacy Policy
* Data Privacy

Small muted typography.

---

# CHATBOT WIDGET

Fixed bottom-right corner.

Large rounded floating widget.

Contains:

### Message Button

Opens contact modal.

Modal fields:

* Name
* Email
* Phone
* Message

Submit button.

---

### Social Icons

Include:

* Facebook
* Instagram
* LinkedIn

Dropdown menu style.

Use company social links.

Widget remains fixed on all pages.

---

# RESPONSIVE BEHAVIOR

## Tablet (<1160px)

Hide:

* Right Panel

Keep:

* Sidebar
* Feed
* Stories

Feed expands.

---

## Mobile (<770px)

Hide:

* Left Sidebar
* Right Panel

Replace with:

---

### Top Header

Left:

* Company Logo

Right:

* Message Button
* Social Dropdown

Contains:

* Facebook
* Instagram
* LinkedIn

Fixed header.

---

### Bottom Navigation

Fixed bottom bar.

Icons:

* Home
* Events
* Digital
* Exhibition
* Activation
* Profile

Instagram-style mobile navigation.

---

### Mobile Stories

Use infinite horizontal scrolling.

No arrows.

Swipe gestures.

Snap scrolling.

---

### Mobile Feed

Single-column layout.

Full-width cards.

Optimized touch interactions.

---

# ANIMATIONS

Use smooth modern transitions:

* Sidebar expand/collapse
* Story scaling
* Card hover lift
* Event card expansion
* Like heart animation
* Modal fade + slide
* Carousel transitions
* Floating chatbot hover effect

Duration:

200ms–400ms

Easing:

ease-in-out

---

# VISUAL STYLE

Inspired by:

* Instagram Web
* Behance
* Dribbble
* Modern SaaS dashboards

Color Palette:

* White background
* Dark text
* Gradient story rings
* Corporate accent color from ABY Baby Events branding

Components:

* Rounded corners (16px–24px)
* Soft shadows
* Smooth animations
* Premium event photography
* Modern corporate feel

Generate complete desktop, tablet, and mobile wireframes with component hierarchy, interactions, hover states, animations, and responsive behavior.