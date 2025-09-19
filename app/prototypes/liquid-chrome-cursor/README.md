# Liquid Chrome Cursor

A stunning custom cursor effect that mimics the Daft Punk chrome logo aesthetic with liquid metal appearance and rainbow iridescence. Features smooth trailing blobs and dynamic color shifts.

## ✨ Features

- **Chrome-like Appearance**: Multi-layered gradients create a realistic metallic chrome effect
- **Rainbow Iridescence**: Dynamic color shifts using conic gradients and hue rotation
- **Smooth Trailing Effect**: Multiple trailing blobs that follow the cursor with smooth interpolation
- **Interactive Behavior**: Cursor shrinks when hovering over clickable elements
- **Accessibility First**: Automatically hides for keyboard users and respects reduced motion preferences
- **Mobile Friendly**: Gracefully degrades on touch devices

## 🎨 Visual Effects

- **Liquid Metal**: Radial and conic gradients simulate chrome reflection
- **Specular Highlights**: Subtle sparkle effects for added realism
- **Smooth Animation**: 60fps animation with lerp interpolation
- **Dynamic Colors**: Continuous hue rotation creates iridescent rainbow effects
- **Trail System**: 6 trailing blobs with decreasing opacity and scale

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Next.js project setup

### Installation

1. Navigate to the prototype directory:
   ```bash
   cd app/prototypes/liquid-chrome-cursor
   ```

2. The prototype is ready to use! No additional dependencies required.

### Running the Prototype

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/prototypes/liquid-chrome-cursor` in your browser

3. Move your mouse around to see the liquid chrome cursor effect!

## 🛠️ Technical Implementation

### React Hooks Used

- `useRef`: References to DOM elements for direct manipulation
- `useState`: Managing cursor state and visibility
- `useEffect`: Handling event listeners and animation loops

### Key Components

- **Main Cursor**: The primary chrome blob with sparkle effects
- **Trail System**: Dynamically generated trailing elements
- **Animation Loop**: Smooth interpolation using `requestAnimationFrame`
- **Event Handlers**: Mouse movement, keyboard navigation, and hover interactions

### CSS Features

- **CSS Custom Properties**: Easy customization via CSS variables
- **Mix Blend Modes**: Screen blend mode for chrome-like appearance
- **Complex Gradients**: Multi-layered radial and conic gradients
- **Responsive Design**: Adapts to different screen sizes and input methods

## 🎛️ Customization

### CSS Variables

You can customize the cursor appearance by modifying these CSS variables in `styles.module.css`:

```css
:root {
  --cursor-size: 36px;      /* Base size of the cursor blob */
  --trail-length: 6;        /* Number of trailing blobs */
  --glow: 18px;             /* Outer glow/bloom effect */
}
```

### Animation Parameters

In the React component, you can adjust:

- **Lerp Speed**: Change `0.22` for main cursor and `0.18` for trail
- **Trail Spacing**: Modify `i * 1.5` for trail element spacing
- **Hue Rotation**: Adjust `hueShift / 10` for color change speed
- **Scale Factors**: Change `0.85 - i * 0.05` for trail scaling

## ♿ Accessibility

### Keyboard Navigation

- Automatically detects when user starts tabbing
- Hides custom cursor and restores default cursor
- Maintains full keyboard accessibility

### Reduced Motion

- Respects `prefers-reduced-motion` media query
- Automatically disables animations for users who prefer reduced motion

### Mobile Devices

- Detects touch devices using `@media (hover: none)`
- Gracefully degrades to default cursor on mobile

## 🎯 Use Cases

- **Portfolio Websites**: Add visual flair to showcase creativity
- **Interactive Demos**: Enhance user engagement in prototypes
- **Gaming Interfaces**: Create immersive cursor experiences
- **Artistic Projects**: Add unique visual elements to creative sites

## 🔧 Browser Support

- **Modern Browsers**: Full support in Chrome, Firefox, Safari, Edge
- **CSS Features**: Uses modern CSS features like `mix-blend-mode` and `conic-gradient`
- **Fallbacks**: Gracefully degrades on older browsers

## 📱 Performance

- **Optimized Animation**: Uses `requestAnimationFrame` for smooth 60fps
- **Efficient Rendering**: `will-change` property optimizes GPU acceleration
- **Memory Management**: Proper cleanup of event listeners and animation loops

## 🎨 Design Philosophy

This prototype demonstrates:

- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility First**: Never compromises on usability
- **Performance Conscious**: Smooth animations without jank
- **Modern CSS**: Leverages cutting-edge CSS features responsibly

## 🤝 Contributing

Feel free to experiment with:

- Different gradient combinations
- Alternative animation easing functions
- Additional interactive behaviors
- Color scheme variations

## 📄 License

This prototype is part of the "Prototyping with Cursor" workshop and is available for educational and experimental use.

---

*Created with ❤️ for the Prototyping with Cursor workshop*


