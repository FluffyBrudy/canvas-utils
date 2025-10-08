export const apiRegistry = {
  CustomEvent: {
    description:
      "Unified input handling for mouse, touch, and keyboard events.",
    extends: null,
    dependsOn: ["InputState"],
    properties: [
      {
        name: "state",
        type: "InputState",
        desc: "Tracks the current input state (protected).",
      },
    ],
    methods: [
      {
        name: "constructor(canvas: HTMLCanvasElement)",
        desc: "Initializes event listeners on the provided canvas for mouse, touch, and keyboard.",
        params: [
          {
            name: "canvas",
            type: "HTMLCanvasElement",
            desc: "The canvas element to attach input listeners.",
          },
        ],
        returns: "void",
      },
      {
        name: "getState()",
        desc: "Returns a snapshot of the current input state.",
        params: [],
        returns:
          "InputState - includes mouse coordinates, pressed buttons, and keys currently down.",
      },
    ],
  },

  Rect: {
    description: "Rectangle geometry with positioning and collision detection.",
    extends: null,
    dependsOn: ["Coor"],
    properties: [
      { name: "x", type: "number", desc: "Top-left x-coordinate." },
      { name: "y", type: "number", desc: "Top-left y-coordinate." },
      { name: "width", type: "number", desc: "Rectangle width." },
      { name: "height", type: "number", desc: "Rectangle height." },
    ],
    methods: [
      {
        name: "collidepoint(x: number, y: number)",
        desc: "Checks if a point lies within the rectangle.",
        params: [
          {
            name: "x",
            type: "number",
            desc: "X position of the point to test.",
          },
          {
            name: "y",
            type: "number",
            desc: "Y position of the point to test.",
          },
        ],
        returns: "boolean - true if the point is inside the rectangle.",
      },
      {
        name: "colliderect(rect: Rect)",
        desc: "Checks if this rectangle intersects with another rectangle.",
        params: [
          {
            name: "rect",
            type: "Rect",
            desc: "Another rectangle to check collision against.",
          },
        ],
        returns: "boolean - true if rectangles overlap.",
      },
      {
        name: "scale(ratio: number)",
        desc: "Returns scaled width and height without modifying the rectangle.",
        params: [{ name: "ratio", type: "number", desc: "Scaling factor." }],
        returns: "{ w: number, h: number } - the scaled dimensions.",
      },
      {
        name: "scaleip(ratio: number)",
        desc: "Scales the rectangle in-place.",
        params: [{ name: "ratio", type: "number", desc: "Scaling factor." }],
        returns: "Rect - the modified rectangle instance.",
      },
      {
        name: "scaleAroundCenter(ratio: number)",
        desc: "Scales rectangle around its center, keeping center fixed.",
        params: [{ name: "ratio", type: "number", desc: "Scaling factor." }],
        returns: "Rect - modified rectangle instance.",
      },
      {
        name: "inflate(amountX: number, amountY: number)",
        desc: "Returns a new rectangle expanded by the given amounts.",
        params: [
          { name: "amountX", type: "number", desc: "Horizontal expansion." },
          { name: "amountY", type: "number", desc: "Vertical expansion." },
        ],
        returns: "Rect - new inflated rectangle.",
      },
    ],
  },

  Sprite: {
    description: "Base class for drawable game objects with group management.",
    extends: null,
    dependsOn: ["Rect", "Group", "GroupSingle", "IGroup"],
    properties: [
      { name: "rect", type: "Rect", desc: "Position and size rectangle." },
      {
        name: "image",
        type: "HTMLImageElement",
        desc: "The sprite image (protected).",
      },
      {
        name: "_groups",
        type: "(Group<Sprite>|GroupSingle<Sprite>|IGroup<Sprite>)[]",
        desc: "Groups this sprite belongs to (protected).",
      },
    ],
    methods: [
      {
        name: "draw(ctx: CanvasRenderingContext2D)",
        desc: "Draws the sprite on the provided context.",
        params: [
          {
            name: "ctx",
            type: "CanvasRenderingContext2D",
            desc: "Canvas rendering context.",
          },
        ],
        returns: "void",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Override to update the sprite's state.",
        params: [
          {
            name: "kwargs",
            type: "Record<string, any>",
            desc: "Optional parameters.",
          },
        ],
        returns: "void",
      },
      {
        name: "kill()",
        desc: "Removes this sprite from all groups.",
        params: [],
        returns: "void",
      },
      {
        name: "alive()",
        desc: "Checks if the sprite belongs to any group.",
        params: [],
        returns: "boolean",
      },
      {
        name: "colliderect(sprite: Sprite)",
        desc: "Checks collision with another sprite.",
        params: [
          {
            name: "sprite",
            type: "Sprite",
            desc: "Sprite to check collision against.",
          },
        ],
        returns: "boolean",
      },
    ],
  },

  Group: {
    description: "Manages collections of sprites with batch operations.",
    extends: null,
    dependsOn: ["Sprite", "IGroup"],
    properties: [
      {
        name: "_sprites",
        type: "Set<Sprite>",
        desc: "Internal storage of sprites (protected).",
      },
    ],
    methods: [
      {
        name: "add(...sprites: Sprite[])",
        desc: "Adds sprites to the group.",
        params: [
          { name: "sprites", type: "Sprite[]", desc: "Sprites to add." },
        ],
        returns: "void",
      },
      {
        name: "remove(sprite?: Sprite)",
        desc: "Removes a sprite from the group.",
        params: [
          {
            name: "sprite",
            type: "Sprite | undefined",
            desc: "Sprite to remove.",
          },
        ],
        returns: "void",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Calls update() on all sprites.",
        params: [
          {
            name: "kwargs",
            type: "Record<string, any>",
            desc: "Optional parameters.",
          },
        ],
        returns: "void",
      },
      {
        name: "draw(ctx: CanvasRenderingContext2D)",
        desc: "Draws all sprites in the group.",
        params: [
          {
            name: "ctx",
            type: "CanvasRenderingContext2D",
            desc: "Canvas context.",
          },
        ],
        returns: "void",
      },
      {
        name: "sprites()",
        desc: "Returns all sprites in the group.",
        params: [],
        returns: "Set<Sprite>",
      },
      {
        name: "has(sprite: Sprite)",
        desc: "Checks if a sprite belongs to the group.",
        params: [{ name: "sprite", type: "Sprite", desc: "Sprite to check." }],
        returns: "boolean",
      },
      {
        name: "empty()",
        desc: "Removes all sprites from the group.",
        params: [],
        returns: "void",
      },
    ],
  },

  GroupSingle: {
    description: "Manages a single sprite, useful for UI or player elements.",
    extends: null,
    dependsOn: ["Sprite", "IGroup"],
    properties: [
      {
        name: "_sprite",
        type: "Sprite | null",
        desc: "The stored sprite (protected).",
      },
    ],
    methods: [
      {
        name: "add(sprite: Sprite)",
        desc: "Assigns a sprite to this group.",
        params: [{ name: "sprite", type: "Sprite", desc: "Sprite to store." }],
        returns: "void",
      },
      {
        name: "remove()",
        desc: "Removes the stored sprite.",
        params: [],
        returns: "void",
      },
      {
        name: "sprite()",
        desc: "Returns the stored sprite.",
        params: [],
        returns: "Sprite | null",
      },
      {
        name: "has(sprite: Sprite)",
        desc: "Checks if the stored sprite matches the provided one.",
        params: [
          { name: "sprite", type: "Sprite", desc: "Sprite to compare." },
        ],
        returns: "boolean",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Updates the stored sprite.",
        params: [
          {
            name: "kwargs",
            type: "Record<string, any>",
            desc: "Optional parameters.",
          },
        ],
        returns: "void",
      },
      {
        name: "draw(ctx: CanvasRenderingContext2D)",
        desc: "Draws the stored sprite.",
        params: [
          {
            name: "ctx",
            type: "CanvasRenderingContext2D",
            desc: "Canvas context.",
          },
        ],
        returns: "void",
      },
    ],
  },

  ImageObj: {
    description: "Async image loader with scaling and caching.",
    extends: null,
    dependsOn: ["Tsize", "TSizeOrScale"],
    properties: [
      {
        name: "_image",
        type: "HTMLImageElement",
        desc: "Internal image element (protected).",
      },
      {
        name: "loaded",
        type: "boolean",
        desc: "Whether the image has finished loading (protected).",
      },
      {
        name: "size",
        type: "Tsize",
        desc: "Current size of the image (protected).",
      },
      {
        name: "sizeOrScale",
        type: "TSizeOrScale",
        desc: "User-provided size or scaling factor (protected).",
      },
    ],
    methods: [
      {
        name: "constructor(path: string, size: TSizeOrScale = 1)",
        desc: "Initializes an ImageObj with a path and optional scale.",
        params: [
          { name: "path", type: "string", desc: "Image source path." },
          {
            name: "size",
            type: "TSizeOrScale",
            desc: "Scale factor or explicit size.",
          },
        ],
        returns: "void",
      },
      {
        name: "load()",
        desc: "Loads the image asynchronously and applies scaling.",
        params: [],
        returns: "Promise<void>",
      },
      {
        name: "getSize()",
        desc: "Returns the current width and height of the image.",
        params: [],
        returns: "Tsize",
      },
      {
        name: "isLoaded()",
        desc: "Checks if the image has been loaded.",
        params: [],
        returns: "boolean",
      },
    ],
  },
};
