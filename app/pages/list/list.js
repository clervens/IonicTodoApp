import {Page, NavController} from 'ionic-angular';
import {ChangeDetectionStrategy} from 'angular2/core';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';
import {TodosService} from '../../services/todos-service';

@Page({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  static get parameters() {
    return [[NavController], [TodosService]];
  }
  constructor(nav, todosService) {
    this.nav = nav;
    this.items = [];

    this.todosService = todosService;
  }

  ngOnInit() {
    this.todosService.getData().then(
      todos => this.items = JSON.parse(todos) || []
    );
  }

  addItem() {
    this.nav.push(AddItemPage, {listPage: this});
  }

  saveItem(item) {
    this.items.push(item);
    this.todosService.save(item);
  }

  viewItem(item) {
    this.nav.push(ItemDetailPage, {item: item});
  }
}
