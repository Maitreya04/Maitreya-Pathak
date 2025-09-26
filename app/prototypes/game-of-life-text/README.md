# Game of Life Text Generator

A fascinating prototype that combines text input with Conway's Game of Life cellular automaton to create evolving patterns from your text.

## What it does

This prototype allows you to:
- Input any text (up to 20 characters)
- Convert that text into an initial cellular automaton pattern
- Watch as Conway's Game of Life rules evolve your text into mesmerizing patterns
- Control the simulation speed and cell size
- Randomize or clear the board

## How it works

### Conway's Game of Life Rules
Each cell in the grid follows these simple rules:
1. **Underpopulation**: Any live cell with fewer than 2 live neighbors dies
2. **Overpopulation**: Any live cell with more than 3 live neighbors dies  
3. **Survival**: Any live cell with 2-3 live neighbors survives to the next generation
4. **Reproduction**: Any dead cell with exactly 3 live neighbors becomes alive

### Text to Pattern Conversion
The prototype uses HTML5 Canvas to:
1. Render your text as an image
2. Sample pixels from the text to create an initial cell pattern
3. Apply Game of Life rules to evolve the pattern

## Controls

- **Text Input**: Enter up to 20 characters to generate a pattern
- **Generate Pattern**: Convert your text into the initial cellular automaton
- **Start/Stop Animation**: Control the simulation
- **Cell Size**: Adjust the size of individual cells (4-16px)
- **Speed**: Control animation speed (1-30 FPS)
- **Randomize**: Create a random initial pattern
- **Clear**: Reset the board to empty

## Technical Details

- Built with React and TypeScript
- Uses HTML5 Canvas for rendering
- Implements Conway's Game of Life algorithm
- Responsive design with modern UI
- Real-time pattern evolution

## Getting Started

1. Navigate to the prototype in your browser
2. Enter some text in the input field
3. Click "Generate Pattern" to create the initial state
4. Click "Start Animation" to begin the simulation
5. Experiment with different settings and watch the patterns evolve!

## Educational Value

This prototype demonstrates:
- Cellular automata concepts
- Algorithm implementation
- Canvas manipulation
- Real-time animation
- Interactive UI design

Perfect for understanding how simple rules can create complex, emergent behaviors!


