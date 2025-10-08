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
        protected: true,
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
            desc: "Canvas element to attach listeners.",
          },
        ],
        returns: "void",
      },
      {
        name: "getState()",
        desc: "Returns a snapshot of the current input state.",
        params: [],
        returns: "InputState",
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
        desc: "Check if point is inside rectangle.",
        params: [
          { name: "x", type: "number" },
          { name: "y", type: "number" },
        ],
        returns: "boolean",
      },
      {
        name: "colliderect(rect: Rect)",
        desc: "Check if rectangles intersect.",
        params: [{ name: "rect", type: "Rect" }],
        returns: "boolean",
      },
      {
        name: "coordinate()",
        desc: "Return {x, y} coordinates.",
        params: [],
        returns: "Coor",
      },
      {
        name: "inflate(amountX: number, amountY: number)",
        desc: "Return a new inflated rectangle.",
        params: [
          { name: "amountX", type: "number" },
          { name: "amountY", type: "number" },
        ],
        returns: "Rect",
      },
      {
        name: "scale(ratio: number)",
        desc: "Return scaled width/height.",
        params: [{ name: "ratio", type: "number" }],
        returns: "{ w: number, h: number }",
      },
      {
        name: "scaleip(ratio: number)",
        desc: "Scale rectangle in-place.",
        params: [{ name: "ratio", type: "number" }],
        returns: "Rect",
      },
      {
        name: "scaleAroundCenter(ratio: number)",
        desc: "Scale around center.",
        params: [{ name: "ratio", type: "number" }],
        returns: "Rect",
      },

      {
        name: "get topright",
        desc: "Return top-right coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set topright(coor: Coor)",
        desc: "Set top-right coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get bottomleft",
        desc: "Return bottom-left coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set bottomleft(coor: Coor)",
        desc: "Set bottom-left coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get bottomright",
        desc: "Return bottom-right coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set bottomright(coor: Coor)",
        desc: "Set bottom-right coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get midleft",
        desc: "Return mid-left coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set midleft(coor: Coor)",
        desc: "Set mid-left coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get midright",
        desc: "Return mid-right coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set midright(coor: Coor)",
        desc: "Set mid-right coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get midtop",
        desc: "Return mid-top coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set midtop(coor: Coor)",
        desc: "Set mid-top coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get midbottom",
        desc: "Return mid-bottom coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set midbottom(coor: Coor)",
        desc: "Set mid-bottom coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get center",
        desc: "Return center coordinate.",
        params: [],
        returns: "Coor",
      },
      {
        name: "set center(coor: Coor)",
        desc: "Set center coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
      },
      {
        name: "get left",
        desc: "Return left edge.",
        params: [],
        returns: "number",
      },
      {
        name: "set left(x: number)",
        desc: "Set left edge.",
        params: [{ name: "x", type: "number" }],
        returns: "void",
      },
      {
        name: "get right",
        desc: "Return right edge.",
        params: [],
        returns: "number",
      },
      {
        name: "set right(x: number)",
        desc: "Set right edge.",
        params: [{ name: "x", type: "number" }],
        returns: "void",
      },
      {
        name: "get top",
        desc: "Return top edge.",
        params: [],
        returns: "number",
      },
      {
        name: "set top(y: number)",
        desc: "Set top edge.",
        params: [{ name: "y", type: "number" }],
        returns: "void",
      },
      {
        name: "get bottom",
        desc: "Return bottom edge.",
        params: [],
        returns: "number",
      },
      {
        name: "set bottom(y: number)",
        desc: "Set bottom edge.",
        params: [{ name: "y", type: "number" }],
        returns: "void",
      },
      {
        name: "get centerx",
        desc: "Return center x.",
        params: [],
        returns: "number",
      },
      {
        name: "set centerx(x: number)",
        desc: "Set center x.",
        params: [{ name: "x", type: "number" }],
        returns: "void",
      },
      {
        name: "get centery",
        desc: "Return center y.",
        params: [],
        returns: "number",
      },
      {
        name: "set centery(y: number)",
        desc: "Set center y.",
        params: [{ name: "y", type: "number" }],
        returns: "void",
      },
      {
        name: "set topleft(coor: Coor)",
        desc: "Set top-left coordinate.",
        params: [{ name: "coor", type: "Coor" }],
        returns: "void",
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
        protected: true,
      },
      {
        name: "_groups",
        type: "(Group<Sprite>|GroupSingle<Sprite>|IGroup<Sprite>)[]",
        desc: "Groups this sprite belongs to (protected).",
        protected: true,
      },
    ],
    methods: [
      {
        name: "draw(ctx: CanvasRenderingContext2D)",
        desc: "Draws the sprite.",
        params: [{ name: "ctx", type: "CanvasRenderingContext2D", desc: "" }],
        returns: "void",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Updates the sprite.",
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
        desc: "Removes sprite from all groups.",
        params: [],
        returns: "void",
      },
      {
        name: "alive()",
        desc: "Returns if sprite belongs to any group.",
        params: [],
        returns: "boolean",
      },
      {
        name: "colliderect(sprite: Sprite)",
        desc: "Checks collision with another sprite.",
        params: [{ name: "sprite", type: "Sprite", desc: "" }],
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
        protected: true,
      },
    ],
    methods: [
      {
        name: "add(...sprites: Sprite[])",
        desc: "Adds sprites to the group.",
        params: [{ name: "sprites", type: "Sprite[]", desc: "" }],
        returns: "void",
      },
      {
        name: "remove(sprite?: Sprite)",
        desc: "Removes a sprite.",
        params: [{ name: "sprite", type: "Sprite | undefined", desc: "" }],
        returns: "void",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Updates all sprites.",
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
        desc: "Draws all sprites.",
        params: [{ name: "ctx", type: "CanvasRenderingContext2D", desc: "" }],
        returns: "void",
      },
      {
        name: "sprites()",
        desc: "Returns all sprites.",
        params: [],
        returns: "Set<Sprite>",
      },
      {
        name: "has(sprite: Sprite)",
        desc: "Checks if sprite belongs to group.",
        params: [{ name: "sprite", type: "Sprite", desc: "" }],
        returns: "boolean",
      },
      {
        name: "empty()",
        desc: "Removes all sprites.",
        params: [],
        returns: "void",
      },
    ],
  },

  GroupSingle: {
    description: "Manages a single sprite.",
    extends: null,
    dependsOn: ["Sprite", "IGroup"],
    properties: [
      {
        name: "_sprite",
        type: "Sprite | null",
        desc: "Stored sprite (protected).",
        protected: true,
      },
    ],
    methods: [
      {
        name: "add(sprite: Sprite)",
        desc: "Assigns a sprite.",
        params: [{ name: "sprite", type: "Sprite", desc: "" }],
        returns: "void",
      },
      {
        name: "remove()",
        desc: "Removes stored sprite.",
        params: [],
        returns: "void",
      },
      {
        name: "sprite()",
        desc: "Returns stored sprite.",
        params: [],
        returns: "Sprite | null",
      },
      {
        name: "has(sprite: Sprite)",
        desc: "Checks stored sprite.",
        params: [{ name: "sprite", type: "Sprite", desc: "" }],
        returns: "boolean",
      },
      {
        name: "update(kwargs?: Record<string, any>)",
        desc: "Updates stored sprite.",
        params: [{ name: "kwargs", type: "Record<string, any>", desc: "" }],
        returns: "void",
      },
      {
        name: "draw(ctx: CanvasRenderingContext2D)",
        desc: "Draws stored sprite.",
        params: [{ name: "ctx", type: "CanvasRenderingContext2D", desc: "" }],
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
        protected: true,
      },
      {
        name: "loaded",
        type: "boolean",
        desc: "Whether image finished loading (protected).",
        protected: true,
      },
      {
        name: "size",
        type: "Tsize",
        desc: "Current image size (protected).",
        protected: true,
      },
      {
        name: "sizeOrScale",
        type: "TSizeOrScale",
        desc: "User-provided size/scale (protected).",
        protected: true,
      },
    ],
    methods: [
      {
        name: "constructor(path: string, size: TSizeOrScale = 1)",
        desc: "Initializes image.",
        params: [
          { name: "path", type: "string", desc: "" },
          { name: "size", type: "TSizeOrScale", desc: "" },
        ],
        returns: "void",
      },
      {
        name: "load()",
        desc: "Loads the image asynchronously.",
        params: [],
        returns: "Promise<void>",
      },
      {
        name: "getSize()",
        desc: "Returns current width and height.",
        params: [],
        returns: "Tsize",
      },
      {
        name: "isLoaded()",
        desc: "Checks if loaded.",
        params: [],
        returns: "boolean",
      },

      {
        name: "get image()",
        desc: "Getter for image element.",
        params: [],
        returns: "HTMLImageElement",
      },
      {
        name: "get size()",
        desc: "Getter for image size.",
        params: [],
        returns: "Tsize",
      },
      {
        name: "get loaded()",
        desc: "Getter for loaded state.",
        params: [],
        returns: "boolean",
      },
    ],
  },
};
