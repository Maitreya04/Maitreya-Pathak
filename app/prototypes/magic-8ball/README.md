# Magic 8-Ball Pool Prototype

A realistic 3D Magic 8-Ball pool game built with Three.js, React Three Fiber, and Cannon.js physics engine.

## Features

- **Realistic 3D Pool Table**: Complete with felt surface and wooden rails
- **Physics Simulation**: Realistic ball physics with friction and collision detection
- **Interactive 8-Ball**: Click to shoot the ball and trigger magic answers
- **Magic 8-Ball Answers**: 20 classic Magic 8-Ball responses
- **Smooth Animations**: Shaking animation and answer reveal effects
- **Camera Controls**: Orbit controls to view the table from different angles
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Three.js**: 3D graphics and rendering
- **React Three Fiber**: React integration for Three.js
- **React Three Drei**: Useful helpers and components
- **Cannon.js**: Physics simulation engine
- **Framer Motion**: Smooth animations and transitions
- **Next.js**: React framework

## How to Play

1. **Shoot the Ball**: Click on the 8-ball in the 3D scene to shoot it
2. **Ask Questions**: Use the "Ask the Magic 8-Ball" button to get answers
3. **Watch the Magic**: The ball will shake and reveal your answer
4. **Explore**: Use mouse/touch to rotate the camera view

## Magic 8-Ball Answers

The game includes all 20 classic Magic 8-Ball responses:

### Positive Answers
- It is certain
- It is decidedly so
- Without a doubt
- Yes definitely
- You may rely on it
- As I see it, yes
- Most likely
- Outlook good
- Yes
- Signs point to yes

### Neutral Answers
- Reply hazy, try again
- Ask again later
- Better not tell you now
- Cannot predict now
- Concentrate and ask again

### Negative Answers
- Don't count on it
- My reply is no
- My sources say no
- Outlook not so good
- Very doubtful

## Technical Implementation

### 3D Scene Setup
- Canvas with proper camera positioning
- Environment lighting for realistic shadows
- Physics world with gravity and collision detection

### Pool Table
- Box geometry for table surface with green felt material
- Wooden rails with proper collision boundaries
- Realistic materials with metalness and roughness

### Ball Physics
- Sphere geometry with physics bodies
- Friction and restitution materials
- Impulse-based shooting mechanism

### Interactive Elements
- Click handlers for ball shooting
- Shaking animation with Framer Motion
- Answer reveal with smooth transitions

## Customization Ideas

- Add more pool balls (cue ball, numbered balls)
- Implement cue stick mechanics
- Add sound effects for ball collisions
- Create different table themes
- Add multiplayer functionality
- Implement scoring system

## Performance Notes

- Uses Suspense for loading states
- Optimized physics simulation
- Efficient re-rendering with useCallback
- Responsive design for mobile devices

## Getting Started

1. Navigate to `/prototypes/magic-8ball`
2. Click the 8-ball or use the magic button
3. Watch the physics simulation and get your answer!

This prototype demonstrates advanced 3D graphics, physics simulation, and interactive animations in a web environment.




