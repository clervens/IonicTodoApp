export class Todo {
  private _id;
  private _title;
  private _description;
  private _isChecked;
  private _createdAt;
  private _updatedAt;

  constructor(data?: any) {
    if (typeof data === 'undefined' || data === null) {
      this._createdAt = Date.now();
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
      isChecked: this._isChecked,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}
