# Mentor App Design System

## Color Palette

### Primary Colors
- **Primary Blue**: #4F46E5 (Indigo 600)
  - Hover: #4338CA (Indigo 700)
  - Light: #E0E7FF (Indigo 100)
- **Secondary Teal**: #0D9488 (Teal 600)
  - Hover: #0F766E (Teal 700)
  - Light: #CCFBF1 (Teal 100)

### Neutral Colors
- **Dark Gray**: #1F2937 (Gray 800)
- **Medium Gray**: #6B7280 (Gray 500)
- **Light Gray**: #F3F4F6 (Gray 100)
- **White**: #FFFFFF

### Accent Colors
- **Success Green**: #10B981 (Emerald 500)
- **Warning Yellow**: #F59E0B (Amber 500)
- **Error Red**: #EF4444 (Red 500)
- **Info Blue**: #3B82F6 (Blue 500)

### Dark Mode Colors
- **Dark Background**: #111827 (Gray 900)
- **Dark Surface**: #1F2937 (Gray 800)
- **Dark Border**: #374151 (Gray 700)
- **Dark Text Primary**: #F9FAFB (Gray 50)
- **Dark Text Secondary**: #9CA3AF (Gray 400)

## Typography

### Font Families
- **Primary Font**: 'Inter', sans-serif
- **Secondary Font**: 'Poppins', sans-serif
- **Monospace Font**: 'Roboto Mono', monospace (for code snippets)

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Line Heights
- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75
- **Loose**: 2

## Spacing

### Scale
- **0**: 0px
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

## Border Radius
- **None**: 0px
- **Small**: 0.125rem (2px)
- **Default**: 0.25rem (4px)
- **Medium**: 0.375rem (6px)
- **Large**: 0.5rem (8px)
- **XL**: 0.75rem (12px)
- **2XL**: 1rem (16px)
- **Full**: 9999px (for pills and circles)

## Shadows
- **Small**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **Medium**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- **Large**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- **XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- **2XL**: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

## UI Components

### Buttons
- **Primary Button**: Blue background, white text
- **Secondary Button**: White background, blue border, blue text
- **Tertiary Button**: No background, blue text
- **Danger Button**: Red background, white text
- **Success Button**: Green background, white text
- **Disabled Button**: Light gray background, medium gray text

### Form Elements
- **Text Input**: White background, gray border, dark text
- **Dropdown**: White background, gray border, with chevron icon
- **Checkbox**: Custom styled with brand colors
- **Radio Button**: Custom styled with brand colors
- **Toggle Switch**: Sliding toggle with brand colors

### Cards
- **Default Card**: White background, light shadow, rounded corners
- **Interactive Card**: Hover effects, cursor pointer
- **Featured Card**: Highlighted border or background

### Navigation
- **Top Navigation Bar**: White background, shadow
- **Side Navigation**: White or brand color background
- **Bottom Navigation (Mobile)**: White background, icons with labels
- **Tabs**: Underline style, with active indicator

### Feedback & Alerts
- **Success Alert**: Green background, dark green text
- **Warning Alert**: Yellow background, dark yellow text
- **Error Alert**: Red background, white text
- **Info Alert**: Blue background, white text
- **Toast Notifications**: Slide in from top or bottom

### Loaders & Progress
- **Spinner**: Animated circular loader
- **Progress Bar**: Linear progress indicator
- **Skeleton Loader**: Placeholder for loading content

## Responsive Breakpoints
- **sm**: 640px (Small devices)
- **md**: 768px (Medium devices)
- **lg**: 1024px (Large devices)
- **xl**: 1280px (Extra large devices)
- **2xl**: 1536px (2X large devices)

## Accessibility
- All interactive elements must have appropriate focus states
- Color contrast ratios must meet WCAG 2.1 AA standards
- Text should be resizable without breaking layouts
- All interactive elements must be keyboard navigable

## Animation & Transitions
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

## Icons
- Use consistent icon set (Heroicons or Material Icons)
- Standard sizes: 16px, 20px, 24px, 32px
- Maintain consistent stroke width
- Use semantic colors based on context
