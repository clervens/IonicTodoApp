export class Todo {
  private _id: string;
  private _title: string;
  private _description: string;
  private _status: TodoState;
  private _isChecked: boolean;
  private _createdAt: number;
  private _updatedAt: number;

  constructor(data?: any) {
    if (typeof data === 'undefined' || data === null) {
      this._createdAt = Date.now();
      this._status = TodoState.ACTIVE;
    } else {
      Object.assign(this, data);
    }
    this._id = btoa(this._createdAt.toString());
    this.removeSetters("id", "createdAt", "updatedAt");
  }

  get id() { return this._id; }
  set id(val) { this._id = val; } // Only available in constructor
  get title() { return this._title; }
  set title(val) { this.update(); this._title = val; this.update(); }
  get description() { return this._description; }
  set description(val) { this._description = val; this.update(); }
  get status() { return this._status; }
  set status(val: TodoState) { this._status = val; this.update(); }
  get isChecked() { return this._isChecked; }
  set isChecked(val) { this._isChecked = val; this.update(); }

  get createdAt() { return this._createdAt; }
  set createdAt(val) { this._createdAt = val; } // Only available in constructor
  get updatedAt() { return this._updatedAt; }
  set updatedAt(val) { this._updatedAt = val; } // Only available in constructor

  update() { this._updatedAt = Date.now(); }

  removeSetters(...props: Array<string>) {
    for (let prop in props) {
      Object.defineProperty(this, prop, {set: undefined});
    }
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
      isChecked: this._isChecked,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}

export enum TodoState {
  ACTIVE,
  ARCHIVED
}
