import type { IGroup } from "../types/sprite.type";
import type { Group, GroupSingle } from "./group";
import type { Rect } from "../geometry/rect";

export class Sprite {
  protected image!: HTMLImageElement;
  public rect!: Rect;

  protected _groups: (Group<Sprite> | GroupSingle<Sprite> | IGroup<Sprite>)[] =
    [];

  constructor(
    ...groups: (Group<Sprite> | GroupSingle<Sprite> | IGroup<Sprite>)[]
  ) {
    this._groups = groups;
  }

  _addGroup(group: IGroup<Sprite>) {
    if (!this._groups.includes(group)) this._groups.push(group);
  }

  _removeGroup(group: IGroup<Sprite>) {
    this._groups = this._groups.filter((g) => g !== group);
  }

  kill() {
    for (let group of this._groups) {
      group.remove(this);
    }
  }

  alive() {
    return this._groups.length > 0;
  }

  remove(groups: (Group<Sprite> | GroupSingle<Sprite> | IGroup<Sprite>)[]) {
    for (let group of groups) {
      group.remove(this);
    }
  }

  updateGroup(group: IGroup<Sprite>) {
    this._groups.push(group);
  }

  groups() {
    return [...this._groups];
  }

  colliderect(sprite: Sprite) {
    return this.rect.colliderect(sprite.rect);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.rect.x, this.rect.y);
  }

  update(_?: Record<string, any>) {}
}
