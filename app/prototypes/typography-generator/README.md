# Typography Generator

A generative typography composition built with p5.js featuring 800+ swirling letters in a mesmerizing radial pattern with organic movement and dynamic color cycling.

## Features

- **Generative Typography**: 800+ letters arranged in a radial swirl pattern
- **Organic Movement**: Perlin noise creates natural, flowing motion
- **Dynamic Colors**: HSL color space with position-based color cycling
- **Interactive Controls**: 
  - Click canvas to pause/play animation
  - Press 'R' key to regenerate with new random letters
  - Press 'Space' key to pause/play
- **Mathematical Precision**: Radial patterns with configurable parameters
- **High Performance**: 60fps animation with optimized rendering
- **Breathing Effect**: Gentle in/out motion for organic feel

## How to Use

1. **Watch the Animation**: The letters swirl in a mesmerizing pattern
2. **Interact**: Click anywhere on the canvas to pause/play
3. **Regenerate**: Press 'R' key to create a new random composition
4. **Control**: Press 'Space' key for additional pause/play control
5. **Explore**: Each regeneration creates a unique pattern with different letters

## Technical Details

### Dependencies
- **p5.js**: For canvas rendering and generative art
- **@types/p5**: TypeScript definitions for p5.js
- **React**: For component structure and state management
- **Next.js**: For the web framework

### Key Components
- **Generative System**: 800+ letter particles with individual properties
- **Radial Mathematics**: Swirl patterns based on angular velocity and radius
- **Perlin Noise**: Organic movement using p5.js noise functions
- **HSL Color Space**: Dynamic color generation based on position and time
- **Interactive Controls**: Mouse and keyboard event handling

### Animation Features
- **Swirl Motion**: Letters spiral inward with velocity inversely proportional to radius
- **Breathing Effect**: Gentle radial expansion/contraction using sine waves
- **Perlin Jitter**: Organic position variation using noise functions
- **Color Cycling**: HSL hue rotation based on angle and time
- **Performance**: Optimized rendering with 60fps target

## File Structure

```
typography-generator/
├── page.tsx              # Main React component
├── styles.module.css     # CSS styling
└── README.md            # This documentation
```

## Setup Instructions

1. Navigate to the prototype directory
2. The prototype is already integrated into the main Next.js application
3. No additional setup required - dependencies are installed at the project root

## Browser Compatibility

- Modern browsers with Canvas support
- WebGL not required (uses 2D canvas)
- Responsive design works on mobile devices

## Learning Objectives

This prototype demonstrates:
- Integration of p5.js with React
- Real-time canvas manipulation
- Interactive form controls
- Animation principles with sine waves
- Color theory and HSL color space
- Responsive web design
- Component state management

## Future Enhancements

Potential improvements could include:
- Font weight controls
- Text shadow effects
- Multiple text layers
- Export functionality (PNG/SVG)
- More animation presets
- Custom font upload
- Text path following
- 3D text effects

## Troubleshooting

**Canvas not displaying**: Ensure your browser supports HTML5 Canvas
**Animation not working**: Check that JavaScript is enabled
**Fonts not loading**: Verify font family names are correct
**Performance issues**: Reduce animation complexity or close other browser tabs
