import {BaseComponent} from './base-component';
import {ComponentTypes} from './component-types';

export class Sprite extends BaseComponent {
  private readonly imagePath: string;
  static imageMap: { [key: string]: ImageBitmap } = {}
  ready = false;

  constructor(imgPath: string) {
    super(ComponentTypes.SPRITE);
    this.imagePath = imgPath;
    if (!Boolean(Sprite.imageMap[imgPath])) {
      let img = new Image();
      img.src = imgPath;
      img.onload = () => {
        createImageBitmap(img).then(ready => {
          Sprite.imageMap[imgPath] = ready;
          this.ready = true;
        })
      }
    } else {
      this.ready = true;
    }
  }

  get image() {
    return Sprite.imageMap[this.imagePath];
  }

}
