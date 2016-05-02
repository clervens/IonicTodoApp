export class Todo {
    constructor(data) {
        if (typeof data === 'undefined' || data === null) {
            this._createdAt = Date.now();
        } else {
            Object.assign(data);
        }
        this._id = btoa(this._createdAt.toString());
    }

    get id() { return this._id; }
    get title() { return this._title; }
    set title(val) { this.update(); this._title = val; }
    get description() { return this._description; }
    set description(val) { this._description = val; this.update(); }
    get isChecked() { return this._isChecked; }
    set isChecked(val) { this._isChecked = val; this.update(); }

    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }

    update() { this._updatedAt = Date.now(); }

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
