import { CustomEvent } from "../../lib/events/manager";
import { Rect } from "../../lib/geometry/rect";
import { Sprite } from "../../lib/sprite/sprite";
import { Group } from "../../lib/sprite/group";

(window as any).copyToClipboard = async (
  text: string,
  btn: HTMLButtonElement
) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

function setupInputDemo() {
  const canvas = document.getElementById("input-demo") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d")!;
  const input = new CustomEvent(canvas);
  let mouseTrail: { x: number; y: number; age: number }[] = [];

  function animate() {
    const state = input.getState();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state.mouseX >= 0 && state.mouseY >= 0) {
      mouseTrail.push({ x: state.mouseX, y: state.mouseY, age: 0 });
    }

    mouseTrail = mouseTrail.filter((point) => point.age < 30);
    mouseTrail.forEach((point) => {
      const alpha = 1 - point.age / 30;
      const size = 5 * alpha;
      ctx.fillStyle = `rgba(100, 108, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
      point.age++;
    });

    if (state.mouseX >= 0 && state.mouseY >= 0) {
      ctx.fillStyle = state.leftPressed ? "#ff4757" : "#646cff";
      ctx.beginPath();
      ctx.arc(
        state.mouseX,
        state.mouseY,
        state.leftPressed ? 8 : 6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.fillStyle = "#00ff00";
    ctx.font = "14px system-ui";
    ctx.fillText(`Mouse: ${state.mouseX}, ${state.mouseY}`, 10, 20);
    ctx.fillText(
      `Left: ${state.leftPressed} | Right: ${state.rightPressed}`,
      10,
      40
    );
    ctx.fillText(
      `Keys: ${Array.from(state.keysDown).join(", ") || "none"}`,
      10,
      60
    );

    requestAnimationFrame(animate);
  }

  animate();
}

function setupCollisionDemo() {
  const canvas = document.getElementById("collision-demo") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d")!;
  const input = new CustomEvent(canvas);

  const player = new Rect(50, 50, 40, 40);
  const obstacles = [
    new Rect(200, 100, 60, 30),
    new Rect(100, 200, 80, 40),
    new Rect(300, 150, 50, 50),
    new Rect(150, 50, 40, 70),
  ];

  function animate() {
    const state = input.getState();
    const speed = 3;

    if (state.keysDown.has("arrowleft")) player.x -= speed;
    if (state.keysDown.has("arrowright")) player.x += speed;
    if (state.keysDown.has("arrowup")) player.y -= speed;
    if (state.keysDown.has("arrowdown")) player.y += speed;

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    obstacles.forEach((obstacle) => {
      const isColliding = player.colliderect(obstacle);
      ctx.fillStyle = isColliding ? "#ff4757" : "#7f8c8d";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    const hasCollision = obstacles.some((obs) => player.colliderect(obs));
    ctx.fillStyle = hasCollision ? "#ff6b7a" : "#646cff";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = "14px system-ui";
    ctx.fillText("Use arrow keys to move", 10, 20);
    ctx.fillText(
      `Collisions: ${
        obstacles.filter((obs) => player.colliderect(obs)).length
      }`,
      10,
      40
    );

    requestAnimationFrame(animate);
  }

  animate();
}

class DemoSprite extends Sprite {
  vx: number;
  vy: number;
  color: string;

  constructor(x: number, y: number) {
    super();
    this.rect = new Rect(x, y, 20, 20);
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 20;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(10, 10, 8, 0, Math.PI * 2);
    ctx.fill();

    this.image = new Image();
    this.image.src = canvas.toDataURL();
  }

  override update() {
    this.rect.x += this.vx;
    this.rect.y += this.vy;

    if (this.rect.left <= 0 || this.rect.right >= 400) {
      this.vx *= -1;
      this.rect.x = Math.max(0, Math.min(380, this.rect.x));
    }
    if (this.rect.top <= 0 || this.rect.bottom >= 300) {
      this.vy *= -1;
      this.rect.y = Math.max(0, Math.min(280, this.rect.y));
    }
  }
}

function setupSpriteDemo() {
  const canvas = document.getElementById("sprite-demo") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d")!;
  const input = new CustomEvent(canvas);
  const sprites = new Group<DemoSprite>();

  for (let i = 0; i < 5; i++) {
    sprites.add(new DemoSprite(Math.random() * 360, Math.random() * 260));
  }

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sprites.add(new DemoSprite(x, y));
  });

  function animate() {
    const state = input.getState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sprites.update();
    sprites.draw(ctx);

    ctx.fillStyle = "#00ff00";
    ctx.font = "14px system-ui";
    ctx.fillText("Click to add sprites", 10, 20);
    ctx.fillText(`Sprites: ${sprites.sprites().size}`, 10, 40);

    if (state.mouseX >= 0 && state.mouseY >= 0) {
      ctx.strokeStyle = "#646cff";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(state.mouseX, state.mouseY, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    requestAnimationFrame(animate);
  }

  animate();
}

export function example() {
  document.addEventListener("DOMContentLoaded", () => {
    setupInputDemo();
    setupCollisionDemo();
    setupSpriteDemo();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      window.addEventListener("keydown", (e) => {
        if (
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
        ) {
          e.preventDefault();
        }
      });
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(
          anchor.getAttribute("href") as string
        );
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  });
}
