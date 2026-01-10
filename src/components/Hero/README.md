# Hero Component

A modern, animated hero section component with configurable content and reusable sub-components.

## Structure

```
src/components/Hero/
├── Hero.jsx              # Main Hero component
├── TechStackItem.jsx     # Reusable tech stack item component
├── ScrollIndicator.jsx   # Reusable scroll indicator component
├── constants.js          # Configuration constants
├── index.js             # Export file
└── README.md            # This file
```

## Components

### Hero
The main hero section component with animated content and background.

**Props:** None (uses constants for configuration)

**Features:**
- Animated text typing effect
- Staggered animations using Framer Motion
- Configurable content via constants
- Responsive design
- Sparkles background

### TechStackItem
A reusable component for displaying technology stack items.

**Props:**
- `icon` (string): Path to icon or emoji
- `name` (string): Technology name
- `alt` (string): Alt text for image (optional)
- `isEmoji` (boolean): Whether the icon is an emoji

### ScrollIndicator
An animated scroll indicator component.

**Props:** None

## Configuration

All content is configurable through the `constants.js` file:

```javascript
export const HERO_CONFIG = {
  title: {
    main: "Knowledge",
    animated: "Vault"
  },
  subtitle: "Build amazing projects...",
  buttons: {
    primary: {
      text: "Get Started",
      href: "https://github.com"
    },
    secondary: {
      text: "Try now"
    }
  },
  techStack: {
    title: "Built with modern technologies",
    items: [...]
  }
};
```

## Usage

```jsx
import { Hero } from '@/components/Hero';

function App() {
  return (
    <div>
      <Hero />
    </div>
  );
}
```

## Dependencies

- React
- Framer Motion
- Tailwind CSS
- Custom hooks: `useTypingAnimation`
- UI Components: `SparklesBackground`, `TypingAnimation`, `AnimatedGradientButton`, `AnimatedHoverLinkButton`

## Customization

To customize the hero section:

1. Edit the `HERO_CONFIG` in `constants.js`
2. Modify animation variants in `ANIMATION_CONFIG`
3. Update styling classes in the component files
4. Add new props to components for additional flexibility
