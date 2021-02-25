export class BaseComponent {
  private readonly _type: number;
  private _ownerId!: number;

  constructor(type: number) {
    this._type = type;
  }

  get ownerId() {
    return this._ownerId;
  }

  get type() {
    return this._type;
  }

  set ownerId(ownerId: number) {
    this._ownerId = ownerId;
  }

}
