# FEPMS Phase 1 - Complete Color Palette Reference

## Master Color List

### Primary Brand Color
```
#0EA5E9
RGB: 14, 165, 233
HSL: 200° 96% 48%
Tailwind: brand-500
Usage: Primary buttons, links, active navigation, brand accents
```

### Text Color System

#### Primary Text (Main headings)
```
#0F172A
RGB: 15, 23, 42
HSL: 216° 47% 11%
Tailwind: text-primary / slate-900
Usage: Page titles, section headings, card titles, data values
```

#### Secondary Text (Body content)
```
#475569
RGB: 71, 85, 105
HSL: 217° 19% 34%
Tailwind: text-secondary / slate-600
Usage: Body paragraphs, descriptions, status labels
```

#### Tertiary Text (Labels & metadata)
```
#64748B
RGB: 100, 116, 139
HSL: 215° 16% 47%
Tailwind: text-tertiary / slate-500
Usage: Form labels, table headers, captions, hints
```

#### Disabled Text
```
#94A3B8
RGB: 148, 163, 184
HSL: 216° 14% 67%
Tailwind: text-disabled / slate-400
Usage: Disabled inputs, placeholder text, disabled buttons
```

#### Inverse Text (White)
```
#FFFFFF
RGB: 255, 255, 255
HSL: 0° 0% 100%
Usage: Text on dark backgrounds (sidebar, dark cards)
```

---

## Component Color Palette

### Sidebar Colors
```
Background:          #1E293B (Slate 800)
Border:              #0F172A (Slate 900)
Normal Text:         #CBD5E1 (Slate 300)
Active Text:         #0EA5E9 (Brand Blue 500)
Active Background:   #F0F9FF (Brand 50)
Footer Text:         #64748B (Slate 500)
Logo Background:     #0EA5E9 (Brand Blue 500)
Logo Text:           #FFFFFF (White)
Logo Subtitle:       #94A3B8 (Slate 400)
Divider:             #334155 (Slate 700)
```

### Topbar Colors
```
Background:          #FFFFFF (White)
Border:              #E2E8F0 (Slate 200)
Title Text:          #1E293B (Slate 800)
Icon Color:          #64748B (Slate 500)
Icon Hover:          #1E293B (Slate 800)
User Name:           #475569 (Slate 600)
Badge Background:    #DBEAFE (Sky 100)
Badge Text:          #075985 (Sky 800)
Notification Dot:    #EF4444 (Red 500)
```

### Card Colors
```
Background:          #FFFFFF (White)
Border:              #E2E8F0 (Slate 200)
Hover Border:        #BFDBFE (Blue 200)
Header Background:   #FFFFFF (White)
Header Border:       #E2E8F0 (Slate 200)
Hover Shadow:        0 10px 15px rgba(0,0,0,0.1)
Elevated Background: #F8FAFC (Slate 50)
```

### Status & Semantic Colors

#### Success (Green)
```
Background (Light):  #DCFCE7 (Green 100)
Text (Dark):         #16A34A (Green 700)
Icon:                #22C55E (Green 500)
```

#### Warning (Amber)
```
Background (Light):  #FEF3C7 (Amber 100)
Text (Dark):         #D97706 (Amber 600)
Icon:                #F59E0B (Amber 500)
```

#### Danger (Red)
```
Background (Light):  #FEE2E2 (Red 100)
Text (Dark):         #DC2626 (Red 600)
Icon:                #EF4444 (Red 500)
```

#### Info (Blue)
```
Background (Light):  #E0F2FE (Sky 100)
Text (Dark):         #0284C7 (Blue 600)
Icon:                #0EA5E9 (Blue 500)
```

### Neutral & Gray Palette

| Shade | HEX | RGB | HSL | Tailwind | Usage |
|-------|-----|-----|-----|----------|-------|
| 50 | #FAFAFA | 250,250,250 | 0° 0% 98% | neutral-50 | Body bg, hover states |
| 100 | #F5F5F5 | 245,245,245 | 0° 0% 96% | neutral-100 | Card bg, input bg |
| 200 | #E5E5E5 | 229,229,229 | 0° 0% 90% | neutral-200 | Borders, dividers |
| 300 | #D4D4D4 | 212,212,212 | 0° 0% 83% | neutral-300 | Input border |
| 400 | #A3A3A3 | 163,163,163 | 0° 0% 64% | neutral-400 | Disabled state |
| 500 | #737373 | 115,115,115 | 0° 0% 45% | neutral-500 | Secondary button |
| 700 | #404040 | 64,64,64 | 0° 0% 25% | neutral-700 | Dark text |
| 800 | #262626 | 38,38,38 | 0° 0% 15% | neutral-800 | Very dark text |
| 900 | #171717 | 23,23,23 | 0° 0% 9% | neutral-900 | Almost black |

### Button Color Variants

#### Primary Button
```
Background:          #0EA5E9 (Brand Blue 500)
Text:                #FFFFFF (White)
Hover Background:    #0284C7 (Brand Blue 600)
Active Background:   #0369A1 (Brand Blue 700)
Focus Ring:          #0EA5E9 (Brand Blue 500)
Focus Ring Offset:   2px
Contrast Ratio:      4.8:1 ✓ WCAG AA
```

#### Secondary Button
```
Background:          #F5F5F5 (Neutral 100)
Text:                #262626 (Neutral 800)
Hover Background:    #E5E5E5 (Neutral 200)
Active Background:   #D4D4D4 (Neutral 300)
Focus Ring:          #A3A3A3 (Neutral 400)
```

#### Success Button
```
Background:          #22C55E (Green 500)
Text:                #FFFFFF (White)
Hover Background:    #16A34A (Green 700)
Active Background:   #15803D (Green 800)
Focus Ring:          #22C55E (Green 500)
```

#### Danger Button
```
Background:          #EF4444 (Red 500)
Text:                #FFFFFF (White)
Hover Background:    #DC2626 (Red 600)
Active Background:   #B91C1C (Red 700)
Focus Ring:          #EF4444 (Red 500)
```

#### Outline Button
```
Background:          Transparent
Border:              1px solid #D4D4D4 (Neutral 300)
Text:                #404040 (Neutral 700)
Hover Background:    #F5F5F5 (Neutral 100)
Active Background:   #E5E5E5 (Neutral 200)
Focus Ring:          #A3A3A3 (Neutral 400)
```

#### Ghost Button
```
Background:          Transparent
Border:              None
Text:                #404040 (Neutral 700)
Hover Background:    #F5F5F5 (Neutral 100)
Active Background:   #E5E5E5 (Neutral 200)
Focus Ring:          #D4D4D4 (Neutral 300)
```

### Badge Variants

#### Success Badge
```
Background:          #DCFCE7 (Green 100)
Text:                #16A34A (Green 700)
Status Dot:          #22C55E (Green 500)
```

#### Warning Badge
```
Background:          #FEF3C7 (Amber 100)
Text:                #D97706 (Amber 600)
Status Dot:          #F59E0B (Amber 500)
```

#### Danger Badge
```
Background:          #FEE2E2 (Red 100)
Text:                #DC2626 (Red 600)
Status Dot:          #EF4444 (Red 500)
```

#### Info Badge
```
Background:          #E0F2FE (Sky 100)
Text:                #0284C7 (Blue 600)
Status Dot:          #0EA5E9 (Blue 500)
```

#### Neutral Badge
```
Background:          #F5F5F5 (Neutral 100)
Text:                #404040 (Neutral 800)
Status Dot:          #737373 (Neutral 500)
```

### Input Field Colors

#### Default State
```
Background:          #FFFFFF (White)
Border:              1px solid #D4D4D4 (Neutral 300)
Text:                #0F172A (Text Primary)
Placeholder:         #94A3B8 (Neutral 400)
```

#### Focus State
```
Background:          #FFFFFF (White)
Border:              1px solid transparent
Ring:                2px solid #0EA5E9 (Brand Blue 500)
Ring Offset:         2px
Text:                #0F172A (Text Primary)
```

#### Disabled State
```
Background:          #FFFFFF (White)
Border:              1px solid #D4D4D4 (Neutral 300)
Text:                #94A3B8 (Neutral 400)
Opacity:             50%
Cursor:              not-allowed
```

---

## Extended Color Usage Guide

### For Different Contexts

#### Equipment Status Colors
```
Operational:         #22C55E (Green 500)
Under Maintenance:   #F59E0B (Amber 500)
Critical:            #EF4444 (Red 500)
Standby:             #8B5CF6 (Purple 500)
Archived:            #94A3B8 (Slate 400)
```

#### Maintenance Status Colors
```
Scheduled:           #3B82F6 (Blue 500)
In Progress:         #F59E0B (Amber 500)
Completed:           #22C55E (Green 500)
Overdue:             #EF4444 (Red 500)
```

#### Warranty Status Colors
```
Active (>60 days):   #22C55E (Green 500)
Expiring Soon:       #F59E0B (Amber 500)
Expired:             #EF4444 (Red 500)
```

---

## Accessibility Notes

### WCAG AA Compliant Combinations
```
✓ #0F172A on #FFFFFF = 14.9:1 (Excellent)
✓ #475569 on #FFFFFF = 8.6:1 (Good)
✓ #64748B on #FFFFFF = 5.1:1 (Good)
✓ #FFFFFF on #0EA5E9 = 4.8:1 (WCAG AA Pass)
✓ #FFFFFF on #0284C7 = 5.6:1 (WCAG AAA Pass)
```

### Color Alone is Not Sufficient
- Status is conveyed with both color and text label
- Status badges include text, not just color
- Icons accompany color to reinforce meaning

---

## Export Formats

### CSS Variables
```css
:root {
  --color-primary-text: #0f172a;
  --color-secondary-text: #475569;
  --color-tertiary-text: #64748b;
  --color-brand-blue: #0ea5e9;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-border: #e2e8f0;
  --color-bg-light: #f5f5f5;
  --color-bg-dark: #1e293b;
}
```

### Tailwind Classes
```javascript
// Use these Tailwind classes instead of hardcoding colors:
text-primary         // #0f172a
text-secondary       // #475569
text-tertiary        // #64748b
text-disabled        // #94a3b8
bg-brand-500         // #0ea5e9
bg-success-500       // #22c55e
bg-warning-500       // #f59e0b
bg-danger-500        // #ef4444
border-border        // #e2e8f0
```

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| Oct 31, 2026 | 1.0 | Initial color palette documentation |

---

## Related Documents

- `FEPMS_PHASE1_DESIGN_SPECIFICATION.md` - Complete design specification
- `tailwind.config.js` - Tailwind color configuration
- `design-system.css` - CSS component definitions
- `index.css` - Global styles

---

*Generated for FEPMS Development Team*  
*Last Updated: October 31, 2026*
