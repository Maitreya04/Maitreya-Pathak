# Typography Generator

An interactive typography generator built with p5.js that allows you to create beautiful text designs with real-time preview and animation effects.

## Features

- **Real-time Typography Preview**: See your text changes instantly with p5.js canvas
- **Customizable Font Properties**: 
  - Font size (12px - 120px)
  - Font family (Arial, Helvetica, Times New Roman, Georgia, Verdana, Courier New, Impact, Comic Sans MS)
  - Text alignment (Left, Center, Right)
- **Color Controls**: 
  - Text color picker
  - Background color picker
- **Animation Effects**: 
  - Animated text with wave motion
  - Color cycling animation
  - Floating particle effects
- **Interactive Controls**: Live editing with sliders, dropdowns, and color pickers
- **Reset Functionality**: Quick reset to default settings

## How to Use

1. **Enter Text**: Type your desired text in the text input field
2. **Adjust Font Size**: Use the slider to change font size from 12px to 120px
3. **Select Font Family**: Choose from 8 different font families
4. **Set Text Alignment**: Choose left, center, or right alignment
5. **Customize Colors**: Use color pickers to change text and background colors
6. **Add Animation**: Toggle the animation button to add wave motion and particle effects
7. **Reset**: Use the reset button to return to default settings

## Technical Details

### Dependencies
- **p5.js**: For canvas rendering and animation
- **@types/p5**: TypeScript definitions for p5.js
- **React**: For component structure and state management
- **Next.js**: For the web framework

### Key Components
- **Canvas Rendering**: Uses p5.js to create an 800x400px canvas
- **State Management**: React hooks manage all typography properties
- **Real-time Updates**: useEffect hook updates the p5.js sketch when properties change
- **Animation System**: Frame-based animation with sine wave calculations

### Animation Features
- **Wave Motion**: Text moves up and down using sine wave calculations
- **Color Cycling**: HSL color space animation for smooth color transitions
- **Particle System**: Floating particles that orbit around the text
- **Performance**: 60fps animation with optimized rendering

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
