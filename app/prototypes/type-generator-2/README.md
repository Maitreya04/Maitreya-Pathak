# Type Generator 2

A floating typography particle system built with p5.js featuring glowing text particles that move organically across the canvas with trail effects and interactive controls.

## Features

- **Floating Text Particles**: 25+ typography-related text particles floating across the screen
- **Multi-Layer Glow Effects**: Each particle has multiple glow layers for visual depth
- **Organic Motion**: Particles move using sine/cosine wave functions for natural floating
- **Interactive Controls**: 
  - Click mouse to add new particles
  - Press 'Space' key to pause/play animation
  - Press 'R' key to reset all particles
  - Press 'C' key to clear all particles
- **Trail Effects**: Background fading creates beautiful trail effects
- **Typography Vocabulary**: Uses design and typography terminology
- **Gradient Colors**: Blue to purple color palette with transparency

## How to Use

1. **Watch the Animation**: Typography terms float across the screen with glow effects
2. **Add Particles**: Click anywhere on the canvas to add new floating text particles
3. **Control Animation**: Press 'Space' key to pause/play the animation
4. **Reset**: Press 'R' key to reset all particles to initial state
5. **Clear**: Press 'C' key to clear all particles from the canvas

## Technical Details

### Dependencies
- **p5.js**: For canvas rendering and particle system
- **@types/p5**: TypeScript definitions for p5.js
- **React**: For component structure and state management
- **Next.js**: For the web framework

### Key Components
- **TextParticle Class**: Individual floating text particles with physics
- **Multi-Layer Rendering**: Glow effects with different sizes and opacities
- **Organic Motion**: Sine/cosine wave functions for natural movement
- **Interactive Events**: Mouse and keyboard event handling
- **Trail Effects**: Background color fading for visual trails

### Animation Features
- **Floating Motion**: Particles move with organic sine/cosine wave patterns
- **Glow Rendering**: Multiple layers with different sizes and transparency
- **Screen Wrapping**: Particles wrap around screen edges for continuous movement
- **Trail Effects**: Background fading creates flowing trail effects
- **Performance**: Optimized for smooth 60fps animation

## File Structure

```
type-generator-2/
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
- Particle systems in p5.js
- Transparency and alpha blending techniques
- Organic motion with mathematical functions
- Interactive mouse events and particle spawning
- Typography and design terminology
- Visual effects and glow rendering
- Screen wrapping and boundary handling

## Typography Terms Used

The particles display various typography and design terms:
- **Type Terms**: TYPE, TEXT, FONT, DESIGN, CREATIVE, ART, STYLE
- **Font Styles**: BOLD, ITALIC, SERIF, SANS, DISPLAY, SCRIPT, MONO
- **Typography Concepts**: SPACE, KERN, LEAD, TRACK, WEIGHT, SIZE, COLOR

## Future Enhancements

Potential improvements could include:
- Custom text input for particles
- Different particle behaviors and interactions
- Sound effects synchronized with particle movement
- Export functionality for particle animations
- More sophisticated glow and lighting effects
- Particle collision detection and interactions
- Custom color palettes and themes

## Troubleshooting

**Canvas not displaying**: Ensure your browser supports HTML5 Canvas
**Animation not working**: Check that JavaScript is enabled
**Performance issues**: Reduce particle count or close other browser tabs
**Particles not responding**: Verify mouse and keyboard events are working



