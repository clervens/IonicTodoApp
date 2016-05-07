import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class TodosService {
  private storage: Storage;
  private data: Array<any>;

  constructor() {
    this.storage = new Storage(SqlStorage, { name: 'todos' });

    this.storage.get('todos').then(
      todos => this.data = JSON.parse(todos)
    );
  }

  getData() {
    return this.storage.get("todos");
  }

  save(item) {
    if (!this.data) {
      this.data = [item];
    } else {
      this.data.push(item);
    }
    let newData = JSON.stringify(this.data);
    this.storage.set('todos', newData);
  }

  saveData(data) {
    this.data = data;
    let newData = JSON.stringify(this.data);
    this.storage.set('todos', newData);
  }
}
