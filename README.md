# canvas-utils-lib

[![Documentation](https://img.shields.io/badge/docs-Official-blue)](https://canvas-utils-lib-docs.netlify.app)
[![npm version](https://img.shields.io/npm/v/canvas-utils-lib)](https://www.npmjs.com/package/canvas-utils-lib)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript utility library for HTML5 Canvas development. Inspired by [Pygame](https://www.pygame.org/), this library provides essential tools for canvas-based games and graphics applications, including input handling, geometry utilities, and sprite management.

## Features

- **Input Management** - Unified mouse, touch, and keyboard event handling
- **Geometry Utilities** - Comprehensive rectangle class with positioning and collision detection  
- **Sprite System** - Flexible sprite and group management for game objects
- **Image Loading** - Async image loading with automatic scaling and caching
- **Mobile Ready** - Built-in touch support for mobile devices
- **Zero Dependencies** - Pure TypeScript with no external dependencies
- **Type Safe** - Full TypeScript support with complete type definitions

## Installation

```bash
npm install canvas-utils-lib
```

## Quick Start

```typescript
import { CustomEvent, Rect, Sprite, Group, ImageObj } from "canvas-utils-lib";

// Setup canvas and input handling
const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const input = new CustomEvent(canvas);

// Create a sprite group
const sprites = new Group<Sprite>();

function gameLoop() {
  const state = input.getState();
  
  // Handle input
  if (state.leftPressed) {
    console.log(`Mouse at: ${state.mouseX}, ${state.mouseY}`);
  }
  
  if (state.keysDown.has("space")) {
    console.log("Space key pressed!");
  }
  
  // Update and draw sprites
  sprites.update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sprites.draw(ctx);
  
  requestAnimationFrame(gameLoop);
}

gameLoop();
```

## API Reference

### CustomEvent

Handles mouse, touch, and keyboard input for a canvas element.

```typescript
const input = new CustomEvent(canvas);
const state = input.getState();
```

**InputState Properties:**
- `mouseX: number` - Current mouse X position (canvas coordinates)
- `mouseY: number` - Current mouse Y position (canvas coordinates)  
- `leftPressed: boolean` - Left mouse button state
- `rightPressed: boolean` - Right mouse button state
- `keysDown: Set<string>` - Set of currently pressed keys (lowercase)

**Features:**
- Touch events are mapped to mouse events for mobile compatibility
- Right-click context menu is automatically disabled
- Key names are normalized to lowercase

### Rect

A comprehensive rectangle class for positioning, collision detection, and geometry calculations.

```typescript
const rect = new Rect(x, y, width, height);
```

**Position Properties (get/set):**
```typescript
rect.x, rect.y          // Top-left coordinates
rect.left, rect.right   // Horizontal edges
rect.top, rect.bottom   // Vertical edges
rect.centerx, rect.centery // Center coordinates
rect.center             // Center as {x, y} object
rect.topleft            // Top-left as {x, y} object
rect.topright           // Top-right as {x, y} object
rect.bottomleft         // Bottom-left as {x, y} object
rect.bottomright        // Bottom-right as {x, y} object
rect.midtop, rect.midbottom // Mid-edge positions
rect.midleft, rect.midright // Mid-edge positions
```

**Methods:**
```typescript
rect.collidepoint(x, y)        // Point collision detection
rect.colliderect(otherRect)    // Rectangle collision detection
rect.scale(ratio)              // Scale dimensions (returns new size)
rect.scaleip(ratio)            // Scale in-place
rect.scaleAroundCenter(ratio)  // Scale maintaining center position
rect.inflate(x, y)             // Expand by amount (returns new Rect)
rect.coordinate()              // Get {x, y} position object
```

**Usage Examples:**
```typescript
const rect = new Rect(10, 20, 100, 50);

// Position manipulation
rect.center = { x: 200, y: 150 };
rect.bottomright = { x: 300, y: 200 };

// Collision detection
if (rect.collidepoint(mouseX, mouseY)) {
  console.log("Mouse over rectangle!");
}

if (rect.colliderect(otherRect)) {
  console.log("Rectangles colliding!");
}

// Scaling
rect.scaleAroundCenter(1.5); // 50% larger, centered
```

### Sprite

Base class for drawable game objects with group management.

```typescript
class MySprite extends Sprite {
  constructor() {
    super();
    this.rect = new Rect(x, y, width, height);
    // Load image, set properties, etc.
  }
  
  update(kwargs?: Record<string, any>) {
    // Update sprite logic
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    // Custom drawing logic (optional - default draws this.image)
    super.draw(ctx);
  }
}
```

**Properties:**
- `rect: Rect` - Position and collision bounds
- `image: HTMLImageElement` - Sprite image (protected)

**Methods:**
```typescript
sprite.kill()                    // Remove from all groups
sprite.alive()                   // Check if in any groups
sprite.groups()                  // Get list of groups
sprite.colliderect(otherSprite) // Collision with another sprite
sprite.update(kwargs?)          // Override for custom logic
sprite.draw(ctx)                // Override for custom rendering
```

### Group<T>

Manages collections of sprites with batch operations.

```typescript
const enemies = new Group<EnemySprite>();
enemies.add(enemy1, enemy2, enemy3);
```

**Methods:**
```typescript
group.add(...sprites)      // Add one or more sprites
group.remove(sprite?)      // Remove specific sprite
group.sprites()            // Get Set of all sprites
group.has(sprite)          // Check if sprite exists
group.empty()              // Remove all sprites
group.update(kwargs?)      // Update all sprites
group.draw(ctx)            // Draw all sprites
```

### GroupSingle<T>

Manages a single sprite (useful for player, UI elements, etc.).

```typescript
const player = new GroupSingle<PlayerSprite>();
player.add(playerSprite);
```

**Methods:**
```typescript
group.add(sprite)          // Set the sprite (replaces existing)
group.remove()             // Remove the sprite
group.sprite()             // Get current sprite (or null)
group.has(sprite)          // Check if this is the current sprite
group.update(kwargs?)      // Update the sprite
group.draw(ctx)            // Draw the sprite
```

### ImageObj

Handles async image loading with automatic scaling and caching.

```typescript
const imageObj = new ImageObj("path/to/image.png", scaleFactor);
await imageObj.load();
const image = imageObj.image;
```

**Constructor:**
```typescript
new ImageObj(path: string, sizeOrScale?: TSizeOrScale)
```
- `path: string` - Path to the image file
- `sizeOrScale: TSizeOrScale` - Either a scale factor (number) or specific size `{w: number, h: number}`

**Methods:**
```typescript
await imageObj.load()           // Load and process the image
imageObj.image                  // Get the HTMLImageElement
imageObj.getSize()              // Get processed image size
imageObj.isLoaded()             // Check if image is ready
```

**Usage Examples:**
```typescript
// Scale by factor
const scaledImage = new ImageObj("sprite.png", 2.0); // 2x larger
await scaledImage.load();

// Specific size
const resizedImage = new ImageObj("background.jpg", { w: 800, h: 600 });
await resizedImage.load();

// Use in sprite
class MySprite extends Sprite {
  async init() {
    const imageObj = new ImageObj("player.png", 1.5);
    await imageObj.load();
    this.image = imageObj.image;
    const size = imageObj.getSize();
    this.rect = new Rect(0, 0, size.w, size.h);
  }
}
```

**Features:**
- Automatic image scaling with canvas-based resizing
- Async/await support with proper loading states
- Maintains aspect ratio when scaling by factor
- Built-in caching after initial load
- TypeScript-friendly size handling

## 🎮 Complete Game Example

```typescript
import { CustomEvent, Rect, Sprite, Group } from "canvas-utils-lib";

class Player extends Sprite {
  speed = 5;
  
  constructor(x: number, y: number) {
    super();
    this.rect = new Rect(x, y, 32, 32);
    
    // Create a simple colored rectangle as image
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 32, 32);
    this.image = new Image();
    this.image.src = canvas.toDataURL();
  }
  
  update(kwargs: { input: any }) {
    const { input } = kwargs;
    const state = input.getState();
    
    if (state.keysDown.has('arrowleft')) this.rect.x -= this.speed;
    if (state.keysDown.has('arrowright')) this.rect.x += this.speed;
    if (state.keysDown.has('arrowup')) this.rect.y -= this.speed;
    if (state.keysDown.has('arrowdown')) this.rect.y += this.speed;
  }
}

// Game setup
const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
const input = new CustomEvent(canvas);

const player = new Player(100, 100);
const allSprites = new Group<Sprite>();
allSprites.add(player);

// Game loop
function gameLoop() {
  // Update
  allSprites.update({ input });
  
  // Draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  allSprites.draw(ctx);
  
  requestAnimationFrame(gameLoop);
}

gameLoop();
```

## 🔧 TypeScript Support

Full TypeScript definitions included. Works perfectly with modern TypeScript projects:

```typescript
// Full type safety
const sprites = new Group<MyCustomSprite>();
const input: InputState = eventManager.getState();
const collision: boolean = rect1.colliderect(rect2);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/FluffyBrudy/canvas-utils)
- [Issues & Bug Reports](https://github.com/FluffyBrudy/canvas-utils/issues)
- [NPM Package](https://www.npmjs.com/package/canvas-utils-lib)

