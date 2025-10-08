import type { Sprite } from "../sprite/sprite";

export interface IGroup<T extends Sprite> {
  remove(sprite?: T): void;
  add?(sprite: T): void;
  update?(kwargs?: Record<string, any>): void;
  draw?(ctx?: CanvasRenderingContext2D): void;
}
