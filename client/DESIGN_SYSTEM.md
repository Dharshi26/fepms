# FEPMS Design System

## Overview
Professional design system for the Franchise Equipment Preventative Maintenance System. Built with Tailwind CSS and React.

## Color System

### Brand Colors
- **Brand Blue (#0ea5e9)**: Primary brand color representing reliability and technology
- **Success Green (#22c55e)**: Completed tasks, healthy equipment
- **Warning Orange (#f59e0b)**: Upcoming maintenance, expiring warranties  
- **Danger Red (#ef4444)**: Overdue maintenance, critical alerts
- **Neutral Grays**: Text, backgrounds, borders

### Usage Tokens
```js
// Text Colors
text-primary    // #0f172a - Main text
text-secondary  // #475569 - Secondary text
text-tertiary   // #64748b - Tertiary text
text-disabled   // #94a3b8 - Disabled text
text-inverse    // #ffffff - Text on dark backgrounds

// Surface Colors
surface-DEFAULT // #ffffff - Default background
surface-dark    // #0f172a - Dark backgrounds
surface-card    // #f8fafc - Card backgrounds
surface-elevated // #ffffff - Elevated surfaces

// Border Colors
border-DEFAULT  // #e2e8f0 - Default borders
border-dark     // #334155 - Dark borders
border-light    // #f1f5f9 - Light borders

// Status Colors
status-operational // #22c55e - Equipment operational
status-maintenance // #f59e0b - Under maintenance
status-critical    // #ef4444 - Critical status
status-standby     // #8b5cf6 - On standby
status-archived    // #94a3b8 - Archived
```

## Typography Scale

### Display Text
- `.text-display-1`: 48px, bold
- `.text-display-2`: 36px, bold  
- `.text-display-3`: 30px, bold

### Headings
- `.text-heading-1`: 24px, bold
- `.text-heading-2`: 20px, semibold
- `.text-heading-3`: 18px, semibold
- `.text-heading-4`: 16px, semibold

### Body Text
- `.text-body-large`: 18px, regular
- `.text-body`: 16px, regular
- `.text-body-small`: 14px, regular
- `.text-body-xsmall`: 12px, regular

### Utility Text
- `.text-label`: 14px, medium, uppercase, tracking-wide
- `.text-caption`: 12px, regular
- `.text-help`: 12px, disabled

## Spacing System
Based on 4px (0.25rem) increments:

```css
/* Common Spacing Values */
.space-1   /* 4px */
.space-2   /* 8px */
.space-3   /* 12px */
.space-4   /* 16px */
.space-5   /* 20px */
.space-6   /* 24px */
.space-8   /* 32px */
.space-10  /* 40px */
.space-12  /* 48px */
```

## Border Radius
```css
.rounded-sm     /* 4px */
.rounded        /* 8px */
.rounded-md     /* 10px */
.rounded-lg     /* 12px */
.rounded-xl     /* 16px */
.rounded-2xl    /* 24px */
.rounded-full   /* 9999px */
```

## Shadows
```css
.shadow-xs      /* Subtle shadow */
.shadow-sm      /* Small shadow */
.shadow         /* Default shadow */
.shadow-md      /* Medium shadow */
.shadow-lg      /* Large shadow */
.shadow-xl      /* Extra large shadow */
.shadow-2xl     /* 2XL shadow */
.shadow-card    /* Card specific shadow */
.shadow-card-hover /* Card hover state */
.shadow-dialog  /* Dialog/modal shadow */
```

## Components

### Cards
```jsx
<div className="card card-hover">
  {/* Card content */}
</div>

<div className="card card-elevated">
  {/* Elevated card */}
</div>

<div className="card card-dark">
  {/* Dark theme card */}
</div>
```

### Buttons
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-success">Success Button</button>
<button className="btn btn-danger">Danger Button</button>
<button className="btn btn-outline">Outline Button</button>
<button className="btn btn-ghost">Ghost Button</button>

{/* Sizes */}
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Medium</button>
<button className="btn btn-primary btn-lg">Large</button>
```

### Status Badges
```jsx
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Critical</span>
<span className="badge badge-info">Info</span>
<span className="badge badge-neutral">Neutral</span>

{/* Status Dots */}
<span className="status-dot status-dot-success"></span>
<span className="status-dot status-dot-warning"></span>
<span className="status-dot status-dot-danger"></span>
```

### Forms
```jsx
<label className="form-label">Email Address</label>
<input className="form-input" type="email" placeholder="you@example.com" />
<p className="form-hint">We'll never share your email.</p>
<p className="form-error">This field is required.</p>
```

### Tables
```jsx
<div className="table-container">
  <table>
    <thead className="table-header">
      <tr>
        <th className="table-cell-header">Name</th>
        <th className="table-cell-header">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className="table-row">
        <td className="table-cell">Equipment 1</td>
        <td className="table-cell">Operational</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Empty States
```jsx
<div className="empty-state">
  <div className="empty-state-icon">
    {/* Icon component */}
  </div>
  <h3 className="empty-state-title">No Equipment Found</h3>
  <p className="empty-state-description">
    There are no equipment records matching your current filters.
  </p>
</div>
```

### Loading States
```jsx
<div className="skeleton h-8 w-48"></div>
<div className="skeleton-text w-full"></div>
<div className="skeleton-circle w-10 h-10"></div>
```

## Animations
```css
.animate-fade-in      /* Fade in animation */
.animate-fade-out     /* Fade out animation */
.animate-slide-in     /* Slide in from right */
.animate-slide-out    /* Slide out to right */
.animate-scale-in     /* Scale in animation */
.animate-scale-out    /* Scale out animation */
.animate-pulse        /* Subtle pulsing */
.animate-spin-slow    /* Slow spinning */
.animate-bounce-subtle /* Subtle bounce */
```

## Layout Components
```css
.section         /* Max width section with padding */
.section-sm      /* Smaller max width section */
.container-tight /* Tight container for forms */
```

## Best Practices

### Color Usage
1. **Always use design tokens** - Never hardcode hex values
2. **Maintain contrast** - Ensure text is readable
3. **Use semantic colors** - success/warning/danger for appropriate states

### Typography
1. **Use heading classes** - Never apply font size/weight directly
2. **Maintain hierarchy** - Use appropriate heading levels
3. **Limit font variations** - Use only the defined scale

### Spacing
1. **Use spacing scale** - Stick to 4px increments
2. **Be consistent** - Use the same spacing for similar elements
3. **Consider vertical rhythm** - Maintain consistent spacing between sections

### Responsive Design
1. **Mobile-first** - Design for mobile first, then enhance for desktop
2. **Breakpoints** - Use Tailwind's responsive prefixes
3. **Fluid layouts** - Use percentages and max-widths

## Implementation Examples

### Card with Badge
```jsx
<div className="card card-hover p-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-heading-3">Equipment Name</h3>
    <span className="badge badge-success">Operational</span>
  </div>
  <p className="text-body-small text-text-tertiary mb-4">
    Description of the equipment
  </p>
  <button className="btn btn-primary btn-sm">
    View Details
  </button>
</div>
```

### Form with Validation
```jsx
<div className="space-y-4">
  <div>
    <label className="form-label" htmlFor="email">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      className="form-input"
      placeholder="you@example.com"
    />
    <p className="form-hint">Enter your work email address</p>
  </div>
  
  <div>
    <label className="form-label" htmlFor="password">
      Password
    </label>
    <input
      id="password"
      type="password"
      className="form-input"
      placeholder="••••••••"
    />
    <p className="form-error">Password must be at least 8 characters</p>
  </div>
</div>
```

## Theme Customization
To extend the design system, modify `tailwind.config.js` and `design-system.css`.

### Adding New Colors
```js
// In tailwind.config.js
colors: {
  newColor: {
    50: '#f0f9ff',
    // ... other shades
    900: '#0c4a6e',
  },
}
```

### Adding New Components
```css
/* In design-system.css */
@layer components {
  .new-component {
    @apply /* Tailwind classes */;
  }
}
```

## Accessibility Guidelines
1. **Color contrast** - Minimum 4.5:1 for normal text
2. **Focus states** - Always provide visible focus indicators
3. **Semantic HTML** - Use appropriate HTML elements
4. **ARIA labels** - Add labels for interactive elements
5. **Keyboard navigation** - Ensure all functionality is keyboard accessible

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome for Android (Android 8+)
