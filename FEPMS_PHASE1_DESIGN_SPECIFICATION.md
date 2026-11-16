# FEPMS Phase 1 Dashboard - Complete Design Specification

**Version**: 1.0  
**Date**: October 31, 2026  
**Status**: Active (Phase 1)  
**Source**: Analyzed from `client/src` codebase

---

## 1. COLOR PALETTE

### Brand Colors
The primary brand color used throughout the FEPMS dashboard is a professional tech blue.

| Color Name | HEX Value | RGB | Usage | Tailwind Class |
|---|---|---|---|---|
| Brand Primary | `#0ea5e9` | rgb(14, 165, 233) | Primary CTA buttons, links, active states, brand accents | `brand-500` |
| Brand Dark | `#0284c7` | rgb(2, 132, 199) | Hover state on brand buttons | `brand-600` |
| Brand Darker | `#0369a1` | rgb(3, 105, 161) | Active state on brand buttons | `brand-700` |
| Brand Light | `#7dd3fc` | rgb(125, 211, 252) | Backgrounds, light accents | `brand-300` |
| Brand Lighter | `#bae6fd` | rgb(186, 230, 253) | Light backgrounds | `brand-200` |

### Text Colors

| Element | HEX Value | RGB | Font Size | Font Weight | Usage | Tailwind Class |
|---|---|---|---|---|---|---|
| Primary Text (Headings) | `#0f172a` | rgb(15, 23, 42) | Varies | Bold (600+) | Page titles, section headings, card titles | `text-primary` |
| Secondary Text (Body) | `#475569` | rgb(71, 85, 105) | 16px | 400 | Body paragraphs, descriptions, status text | `text-secondary` |
| Tertiary Text (Labels) | `#64748b` | rgb(100, 116, 139) | 14px | 500 | Labels, captions, hints, metadata | `text-tertiary` |
| Disabled Text | `#94a3b8` | rgb(148, 163, 184) | 14px | 400 | Disabled inputs, placeholder text | `text-disabled` |
| Inverse Text (White) | `#ffffff` | rgb(255, 255, 255) | Varies | Varies | Text on dark backgrounds (sidebar, dark cards) | `text-inverse` |

### Status & Semantic Colors

#### Success (Green)
| State | HEX Value | RGB | Used For |
|---|---|---|---|
| Light Background | `#dcfce7` | rgb(220, 252, 231) | Success badge background |
| Text/Icon | `#22c55e` | rgb(34, 197, 94) | Status indicator, success badges, green icons |
| Dark Text | `#16a34a` | rgb(22, 163, 74) | Operational status text |

**Example Usage**: "Completed (30d)" card, operational equipment status

#### Warning (Amber/Orange)
| State | HEX Value | RGB | Used For |
|---|---|---|---|
| Light Background | `#fef3c7` | rgb(254, 243, 199) | Warning badge background |
| Text/Icon | `#f59e0b` | rgb(245, 158, 11) | Warning badges, maintenance due status |
| Dark Text | `#d97706` | rgb(217, 119, 6) | Amber/warning icons |

**Example Usage**: "Maintenance Due" card, "Expiring Soon" status

#### Danger (Red)
| State | HEX Value | RGB | Used For |
|---|---|---|---|
| Light Background | `#fee2e2` | rgb(254, 226, 226) | Danger badge background |
| Text/Icon | `#ef4444` | rgb(239, 68, 68) | Overdue status, critical alerts |
| Dark Text | `#dc2626` | rgb(220, 38, 38) | Danger badges |

**Example Usage**: "Overdue" card, expired warranty badge

#### Info (Brand Blue)
| State | HEX Value | RGB | Used For |
|---|---|---|---|
| Light Background | `#e0f2fe` | rgb(224, 242, 254) | Info banner, info badges |
| Text/Icon | `#0ea5e9` | rgb(14, 165, 233) | Links, info text |

**Example Usage**: Info banners, info badges

### Neutral/Gray Palette

| Shade | HEX Value | RGB | Used For |
|---|---|---|---|
| Neutral 50 | `#fafafa` | rgb(250, 250, 250) | Body background, hover states |
| Neutral 100 | `#f5f5f5` | rgb(245, 245, 245) | Card backgrounds, input backgrounds |
| Neutral 200 | `#e5e5e5` | rgb(229, 229, 229) | Borders, dividers |
| Neutral 300 | `#d4d4d4` | rgb(212, 212, 212) | Input borders |
| Neutral 400 | `#a3a3a3` | rgb(163, 163, 163) | Disabled state |
| Neutral 500 | `#737373` | rgb(115, 115, 115) | Secondary buttons |
| Neutral 700 | `#404040` | rgb(64, 64, 64) | Dark text |
| Neutral 800 | `#262626` | rgb(38, 38, 38) | Very dark text |

### Component-Specific Colors

#### Sidebar
- **Background**: `#1e293b` (Slate 800)
- **Border**: `#0f172a` (Slate 900)
- **Text (Normal)**: `#e2e8f0` (Slate 200) - light gray
- **Text (Active)**: `#0ea5e9` (Brand Blue 500)
- **Logo Text**: `#ffffff` (White)
- **Logo Subtitle**: `#94a3b8` (Slate 400)
- **Footer Text**: `#64748b` (Slate 500)

#### Topbar
- **Background**: `#ffffff` (White)
- **Border**: `#e2e8f0` (Slate 200)
- **Title Text**: `#1e293b` (Slate 800)
- **Icon Color (Normal)**: `#64748b` (Slate 500)
- **User Name**: `#475569` (Slate 600)

#### Cards
- **Background**: `#ffffff` (White)
- **Border**: `#e2e8f0` (Slate 200)
- **Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`
- **Hover Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

---

## 2. TYPOGRAPHY

### Font Family
- **Primary Font**: Inter
- **Fallback Stack**: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif

### Typography Scale

#### Page Titles & Headings

| Level | Font Size | Line Height | Font Weight | Color | Component | Example |
|---|---|---|---|---|---|---|
| Display 1 | 48px (3rem) | 1 | 700 (bold) | `#0f172a` | Extra large hero titles | N/A (not used in Phase 1) |
| Display 2 | 36px (2.25rem) | 2.5 | 700 (bold) | `#0f172a` | N/A (not used in Phase 1) | N/A |
| Display 3 | 30px (1.875rem) | 2.25 | 700 (bold) | `#0f172a` | N/A (not used in Phase 1) | N/A |
| Heading 1 | 24px (1.5rem) | 2rem | 700 (bold) | `#0f172a` | Page header | "Dashboard" in page title |
| Heading 2 | 20px (1.25rem) | 1.75rem | 600 (semibold) | `#0f172a` | Section title | Section headings |
| Heading 3 | 18px (1.125rem) | 1.75rem | 600 (semibold) | `#0f172a` | Card title | Card headers |
| Heading 4 | 16px (1rem) | 1.5rem | 600 (semibold) | `#0f172a` | Small section title | N/A |

#### Body Text

| Level | Font Size | Line Height | Font Weight | Color | Usage | Example |
|---|---|---|---|---|---|---|
| Body Large | 18px (1.125rem) | 1.75rem | 400 | `#475569` | Large body text | N/A (not used) |
| Body | 16px (1rem) | 1.5rem | 400 | `#475569` | Main body text | Paragraph descriptions |
| Body Small | 14px (0.875rem) | 1.25rem | 400 | `#475569` | Secondary text | Status labels, descriptions |
| Body XSmall | 12px (0.75rem) | 1rem | 400 | `#64748b` | Metadata | Timestamps, small labels |

#### Labels & Captions

| Type | Font Size | Font Weight | Color | Letter Spacing | Usage |
|---|---|---|---|---|---|
| Label | 14px (0.875rem) | 500 (medium) | `#64748b` | Wide (0.05em) | Form labels, table headers |
| Caption | 12px (0.75rem) | 400 | `#64748b` | Normal | Help text, captions |
| Help/Hint | 12px (0.75rem) | 400 | `#94a3b8` | Normal | Disabled text, hints |

#### Button Text

| Size | Font Size | Font Weight | Line Height |
|---|---|---|---|
| Small | 14px (0.875rem) | 500 | 1.25rem |
| Medium | 16px (1rem) | 500 | 1.5rem |
| Large | 18px (1.125rem) | 500 | 1.75rem |

#### Table Content

| Element | Font Size | Font Weight | Color |
|---|---|---|---|
| Header | 12px (0.75rem) | 500 | `#64748b` |
| Body Cell | 14px (0.875rem) | 400 | `#475569` |
| Data Value | 14px (0.875rem) | 500 | `#0f172a` |

---

## 3. UI COMPONENT SPECIFICATIONS

### Cards (StatCard & Data Cards)

**Background Color**: `#ffffff` (White)  
**Border**: 1px solid `#e2e8f0` (Slate 200)  
**Border Radius**: 12px (0.75rem)  
**Padding**: 20px (1.25rem)  
**Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`  
**Hover Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`  
**Hover Transform**: `-translate-y-0.5` (move up 2px)

**Card Title**:
- Font Size: 16px
- Font Weight: 700 (bold)
- Color: `#0f172a`
- Margin Bottom: 8px

**Card Subtitle/Label**:
- Font Size: 12px
- Font Weight: 500
- Color: `#64748b`
- Margin Bottom: 4px

**Card Value**:
- Font Size: 24px
- Font Weight: 700
- Color: `#0f172a`

### Badges & Status Indicators

#### Badge Container
- **Padding**: 6px 8px (0.375rem 0.5rem)
- **Border Radius**: 9999px (pill shape)
- **Font Size**: 12px
- **Font Weight**: 500

#### Badge Color Variants

| Variant | Background | Text Color |
|---|---|---|
| Success | `#dcfce7` (Green 100) | `#16a34a` (Green 700) |
| Warning | `#fef3c7` (Amber 100) | `#d97706` (Amber 600) |
| Danger | `#fee2e2` (Red 100) | `#dc2626` (Red 600) |
| Info | `#e0f2fe` (Blue 100) | `#0284c7` (Blue 600) |
| Neutral | `#f5f5f5` (Neutral 100) | `#404040` (Neutral 800) |

### Buttons

#### Base Button Properties
- **Font Weight**: 500 (medium)
- **Border Radius**: 8px (0.5rem)
- **Transition**: All 150ms ease-out
- **Focus**: Ring-2 offset-2

#### Button Variants

| Variant | Background | Text Color | Hover | Active | Focus Ring |
|---|---|---|---|---|---|
| Primary | `#0ea5e9` | White | `#0284c7` | `#0369a1` | `#0ea5e9` |
| Secondary | `#f5f5f5` | `#262626` | `#e5e5e5` | `#d4d4d4` | `#a3a3a3` |
| Success | `#22c55e` | White | `#16a34a` | `#15803d` | `#22c55e` |
| Danger | `#ef4444` | White | `#dc2626` | `#b91c1c` | `#ef4444` |
| Outline | Transparent | `#404040` | `#f5f5f5` | `#e5e5e5` | `#a3a3a3` |
| Ghost | Transparent | `#404040` | `#f5f5f5` | `#e5e5e5` | `#d4d4d4` |

#### Button Sizes

| Size | Padding | Font Size |
|---|---|---|
| Small | 12px 12px (0.75rem 0.75rem) | 14px |
| Medium | 16px 16px (1rem 1rem) | 16px |
| Large | 24px 24px (1.5rem 1.5rem) | 18px |

### Input Fields & Forms

**Border**: 1px solid `#d4d4d4`  
**Background**: `#ffffff` (White)  
**Border Radius**: 6px (0.375rem)  
**Padding**: 8px 12px (0.5rem 0.75rem)  
**Font Size**: 14px  
**Color**: `#0f172a`  
**Placeholder**: `#94a3b8`  

**Focus State**:
- Ring-2: `#0ea5e9` (Brand Blue)
- Ring Offset-2
- Border: Transparent

**Disabled State**:
- Opacity: 50%
- Cursor: not-allowed

### Navigation (Sidebar)

**Sidebar Background**: `#1e293b` (Slate 800)  
**Sidebar Width**: 256px (w-64)

**Navigation Link (Default)**:
- Display: flex, items-center, gap-3
- Padding: 8px 12px (0.5rem 0.75rem)
- Border Radius: 6px
- Color: `#cbd5e1` (Slate 300)
- Font Size: 14px
- Font Weight: 500

**Navigation Link (Active)**:
- Background: `#f0f9ff` (Brand 50) / `#0ea5e9` Light
- Color: `#0ea5e9` (Brand 500)
- Font Weight: 500

**Navigation Link (Hover)**:
- Background: `#f0f9ff` (Brand 50)
- Color: `#0284c7` (Brand 600)

**Navigation Icon**: 16px size, emoji or lucide-react icon

### Tables

**Container Background**: `#ffffff`  
**Border**: 1px solid `#e2e8f0`  
**Border Radius**: 12px

**Header Row**:
- Background: `#f9fafb` (Neutral 50)
- Border Bottom: 1px solid `#e2e8f0`
- Font Size: 12px
- Font Weight: 500
- Color: `#64748b`
- Letter Spacing: 0.05em (uppercase)

**Body Row**:
- Border Bottom: 1px solid `#e2e8f0`
- Hover Background: `#f9fafb`
- Font Size: 14px
- Color: `#475569`

**Cell Padding**: 12px 16px (0.75rem 1rem)

---

## 4. LAYOUT & SPACING

### Grid System
- **Container Max Width**: 1280px (max-w-7xl)
- **Padding**: 16px (1rem) on mobile, 24px (1.5rem) on desktop
- **Gap**: 16px (1rem) for grid items

### Dashboard Layout

**Overall Layout**:
- Sidebar: 256px fixed width (hidden on mobile)
- Main Content: Flex-1, scrollable
- Topbar: 64px height (h-16)
- Main Content Padding: 16px (1rem) mobile, 24px (1.5rem) desktop

**Grid Layouts**:
- KPI Cards: 1 col mobile, 2 cols tablet, 4 cols desktop
- Section Cards: 1 col mobile, 2 cols desktop
- Gap between items: 16px (1rem)

### Card Spacing

**Card Padding**: 20px (1.25rem)  
**Card Header Padding**: 20px (1.25rem)  
**Card Border Bottom**: 1px solid `#e2e8f0`  
**Card Body Padding**: 20px (1.25rem)

### Typography Spacing

**Page Title + Description Gap**: 4px (0.25rem)  
**Section Title + Content Gap**: 16px (1rem)  
**Card Title + Value Gap**: 8px (0.5rem)  
**Label + Input Gap**: 8px (0.5rem)

---

## 5. COMPLETE DESIGN REFERENCE TABLE

| UI Element | Text Color (HEX) | Background Color | Font Family | Font Size | Font Weight | Border Radius | Shadow | Source Component |
|---|---|---|---|---|---|---|---|---|
| Page Title | `#0f172a` | N/A | Inter | 24px | 700 | N/A | 0 1px 3px | Dashboard.jsx |
| Section Description | `#64748b` | N/A | Inter | 14px | 400 | N/A | None | Dashboard.jsx |
| StatCard Label | `#64748b` | `#ffffff` | Inter | 12px | 500 | 12px | 0 1px 3px | StatCard component |
| StatCard Value | `#0f172a` | `#ffffff` | Inter | 24px | 700 | 12px | 0 1px 3px | StatCard component |
| StatCard Trend | `#22c55e` / `#64748b` | `#ffffff` | Inter | 12px | 400 | 12px | 0 1px 3px | StatCard component |
| Badge (Success) | `#16a34a` | `#dcfce7` | Inter | 12px | 500 | 9999px | None | design-system.css |
| Badge (Warning) | `#d97706` | `#fef3c7` | Inter | 12px | 500 | 9999px | None | design-system.css |
| Badge (Danger) | `#dc2626` | `#fee2e2` | Inter | 12px | 500 | 9999px | None | design-system.css |
| Badge (Info) | `#0284c7` | `#e0f2fe` | Inter | 12px | 500 | 9999px | None | design-system.css |
| Button Primary | `#ffffff` | `#0ea5e9` | Inter | 16px | 500 | 8px | None | Button.jsx |
| Button Hover | `#ffffff` | `#0284c7` | Inter | 16px | 500 | 8px | None | Button.jsx |
| Button Active | `#ffffff` | `#0369a1` | Inter | 16px | 500 | 8px | None | Button.jsx |
| Card Title | `#0f172a` | `#ffffff` | Inter | 16px | 600 | 12px | 0 1px 3px | Card.jsx |
| Card Description | `#475569` | `#ffffff` | Inter | 14px | 400 | 12px | 0 1px 3px | Card.jsx |
| Input Field | `#0f172a` | `#ffffff` | Inter | 14px | 400 | 6px | None | Input.jsx |
| Input Placeholder | `#94a3b8` | `#ffffff` | Inter | 14px | 400 | 6px | None | Input.jsx |
| Sidebar Text (Normal) | `#cbd5e1` | `#1e293b` | Inter | 14px | 500 | 6px | None | Sidebar.jsx |
| Sidebar Text (Active) | `#0ea5e9` | `#f0f9ff` | Inter | 14px | 500 | 6px | None | Sidebar.jsx |
| Topbar Title | `#1e293b` | `#ffffff` | Inter | 18px | 600 | N/A | None | Topbar.jsx |
| Table Header | `#64748b` | `#f9fafb` | Inter | 12px | 500 | N/A | None | design-system.css |
| Table Body | `#475569` | `#ffffff` | Inter | 14px | 400 | N/A | None | design-system.css |
| Info Banner Text | `#0369a1` | `#f0f9ff` | Inter | 14px | 400 | 12px | None | Dashboard.jsx |
| Info Banner BG | N/A | `#f0f9ff` | N/A | N/A | N/A | 12px | None | Dashboard.jsx |

---

## 6. SHADOW SYSTEM

### Elevation Levels

| Level | CSS Value | Usage |
|---|---|---|
| None | none | Flat elements |
| XS | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle elevation |
| Small | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)` | Default card shadow |
| Default | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | Card hover state |
| Medium | `0 6px 8px -2px rgba(0, 0, 0, 0.1)` | Elevated cards |
| Large | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Card hover + info banners |
| Dialog | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | Modals, overlays |

---

## 7. RESPONSIVE BREAKPOINTS

Using Tailwind CSS default breakpoints:

| Prefix | Breakpoint | Usage |
|---|---|---|
| None | 0px | Mobile (default) |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large desktops |

---

## 8. ANIMATIONS & TRANSITIONS

| Animation | Duration | Easing | Usage |
|---|---|---|---|
| Fade In | 200ms | ease-out | Overlays, modals |
| Fade Out | 200ms | ease-out | Removing elements |
| Slide In | 300ms | ease-out | Sidebar on mobile |
| Slide Out | 300ms | ease-out | Sidebar close |
| Scale In | 200ms | ease-out | Modal appear |
| Scale Out | 200ms | ease-out | Modal disappear |
| Hover | 150ms | ease-out | Button hover, card hover |

---

## 9. COMPONENT VARIANT MATRIX

### Button Variants

```
Primary:    Brand blue (#0ea5e9) → Brand dark (#0284c7) on hover → Brand darker (#0369a1) on active
Secondary:  Neutral light (#f5f5f5) → Neutral (#e5e5e5) on hover → Neutral dark (#d4d4d4) on active
Success:    Success green (#22c55e) → Success dark (#16a34a) on hover → Success darker (#15803d) on active
Danger:     Danger red (#ef4444) → Danger dark (#dc2626) on hover → Danger darker (#b91c1c) on active
Outline:    Transparent with border → Light gray (#f5f5f5) on hover → Lighter gray (#e5e5e5) on active
Ghost:      Transparent → Light gray (#f5f5f5) on hover → Lighter gray (#e5e5e5) on active
```

### Badge Variants

```
Success:    Green light background (#dcfce7) + Green dark text (#16a34a)
Warning:    Amber light background (#fef3c7) + Amber dark text (#d97706)
Danger:     Red light background (#fee2e2) + Red dark text (#dc2626)
Info:       Blue light background (#e0f2fe) + Blue dark text (#0284c7)
Neutral:    Gray light background (#f5f5f5) + Gray dark text (#404040)
```

---

## 10. ACCESSIBILITY & GUIDELINES

### Focus States
- **Focus Ring**: 2px solid `#0ea5e9` (Brand Blue)
- **Ring Offset**: 2px
- **Used On**: Buttons, inputs, links, interactive elements

### Color Contrast Requirements
- **WCAG AA**: All text meets minimum 4.5:1 contrast ratio
- **Primary Text on White**: `#0f172a` on `#ffffff` = 14.9:1
- **Secondary Text on White**: `#475569` on `#ffffff` = 8.6:1
- **Button Text on Brand**: `#ffffff` on `#0ea5e9` = 4.8:1

### Semantic HTML
- Page titles use `<h1>`, section titles use `<h2>`
- Buttons use `<button>` elements, not divs
- Form inputs use `<input>` or `<textarea>` with associated `<label>`
- Navigation uses `<nav>` with `<a>` elements

---

## 11. IMPLEMENTATION GUIDELINES

### Reusable CSS Classes (from design-system.css)

```css
/* Typography Classes */
.text-heading-1 → 24px bold #0f172a
.text-heading-2 → 20px semibold #0f172a
.text-heading-3 → 18px semibold #0f172a
.text-body → 16px regular #475569
.text-body-small → 14px regular #475569
.text-caption → 12px regular #64748b

/* Button Classes */
.btn → Base button classes
.btn-primary → Brand blue button
.btn-secondary → Neutral button
.btn-success → Green button
.btn-danger → Red button
.btn-outline → Bordered button
.btn-ghost → Transparent button

/* Card Classes */
.card → Base card (white bg, border, shadow)
.card-hover → Card with hover effects
.card-elevated → Elevated card variant
.card-dark → Dark card variant

/* Badge Classes */
.badge → Base badge
.badge-success → Green badge
.badge-warning → Amber badge
.badge-danger → Red badge
.badge-info → Blue badge
```

### Using Tailwind Classes

All colors use Tailwind's semantic naming:
- `text-primary` = `#0f172a`
- `text-secondary` = `#475569`
- `text-tertiary` = `#64748b`
- `bg-brand-500` = `#0ea5e9`
- `bg-success-500` = `#22c55e`
- `border-border` = `#e2e8f0`

---

## 12. DESIGN TOKENS SUMMARY

### Quick Reference for Developers

```javascript
// Colors
PRIMARY_TEXT = '#0f172a'
SECONDARY_TEXT = '#475569'
TERTIARY_TEXT = '#64748b'
BRAND_BLUE = '#0ea5e9'
SUCCESS_GREEN = '#22c55e'
WARNING_AMBER = '#f59e0b'
DANGER_RED = '#ef4444'
NEUTRAL_WHITE = '#ffffff'
NEUTRAL_LIGHT = '#f5f5f5'
BORDER_COLOR = '#e2e8f0'

// Typography
FONT_FAMILY = 'Inter, system-ui, sans-serif'
FONT_SIZE_TITLE = '24px'
FONT_SIZE_BODY = '16px'
FONT_SIZE_LABEL = '14px'
FONT_SIZE_CAPTION = '12px'
FONT_WEIGHT_NORMAL = 400
FONT_WEIGHT_MEDIUM = 500
FONT_WEIGHT_SEMIBOLD = 600
FONT_WEIGHT_BOLD = 700

// Spacing
SPACING_XS = '4px'
SPACING_SM = '8px'
SPACING_MD = '12px'
SPACING_LG = '16px'
SPACING_XL = '24px'

// Border Radius
BORDER_RADIUS_SM = '4px'
BORDER_RADIUS_MD = '6px'
BORDER_RADIUS_LG = '12px'
BORDER_RADIUS_PILL = '9999px'

// Shadows
SHADOW_CARD = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
SHADOW_HOVER = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
SHADOW_DIALOG = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
```

---

## 13. FILES REFERENCED

| File Path | Purpose |
|---|---|
| `client/src/styles/design-system.css` | Core design tokens and reusable classes |
| `client/src/styles/index.css` | Global styles and Tailwind imports |
| `client/tailwind.config.js` | Tailwind configuration with extended colors |
| `client/src/pages/Dashboard.jsx` | Dashboard page implementation |
| `client/src/components/Topbar.jsx` | Top navigation bar |
| `client/src/components/Sidebar.jsx` | Side navigation |
| `client/src/components/ui/Button.jsx` | Button component |
| `client/src/components/ui/Badge.jsx` | Badge component |
| `client/src/components/ui/Card.jsx` | Card component |
| `client/src/components/ui/Input.jsx` | Input component |
| `client/src/layouts/DashboardLayout.jsx` | Main dashboard layout |

---

## 14. VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | Oct 31, 2026 | Initial specification for Phase 1 |

---

## CONCLUSION

This specification document captures the exact design system used in FEPMS Phase 1 dashboard. All HEX values, typography, spacing, and component styles are extracted directly from the implemented codebase and can be consistently applied across all future development phases.

**For questions or updates**, refer to the source files listed in Section 13.

---

*Document prepared for: FEPMS Development Team*  
*Status: Active | Phase 1 Complete*  
*Last Updated: October 31, 2026*
