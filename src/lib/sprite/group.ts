import { IGroup } from "../types/sprite.type";
import { Sprite } from "./sprite";

export class Group<T extends Sprite> implements IGroup<T> {
  private _sprites = new Set<T>();

  add(...sprites: T[]) {
    for (let sprite of sprites) {
      this._sprites.add(sprite);
      sprite._addGroup(this as IGroup<T>);
    }
  }

  remove(sprite?: T) {
    if (sprite) {
      this._sprites.delete(sprite);
      sprite._removeGroup(this);
    }
  }

  sprites() {
    return this._sprites;
  }

  has(sprite: T) {
    return this._sprites.has(sprite);
  }

  empty() {
    this._sprites = new Set();
  }

  update(kwargs = {} as Record<string, any>): void {
    for (let sprite of this._sprites) {
      sprite.update(kwargs);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let sprite of this._sprites) {
      sprite.draw(ctx);
    }
  }
}

export class GroupSingle<T extends Sprite> implements IGroup<T> {
  private _sprite: T | null;

  constructor(sprite?: T) {
    this._sprite = sprite || null;
  }

  add(sprite: T) {
    this._sprite = sprite;
    sprite._addGroup(this);
  }

  remove() {
    if (!this._sprite) return;
    this._sprite._removeGroup(this);
    this._sprite = null;
  }

  sprite() {
    return this._sprite;
  }

  has(sprite: T) {
    return this._sprite === sprite;
  }

  update(kwargs = {} as Record<string, any>): void {
    this._sprite?.update(kwargs);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this._sprite?.draw(ctx);
  }
}
