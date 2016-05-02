import {Page, NavController, NavParams} from 'ionic-angular';
import {Todo} from '../../models/todo';

@Page({
  templateUrl: 'build/pages/add-item/add-item.html'
})
export class AddItemPage {
  private item: Todo;
  constructor(private nav: NavController, private params: NavParams) {
    if (typeof this.params.get('item') == 'undefined' || this.params.get('item') == null) {
      this.item = new Todo();
    } else {
      this.item = this.params.get('item');
    }
  }

  saveItem() {
    this.params.get('listPage').saveItem(this.item, this.params.get('isEdit'));
    this.nav.pop();
  }
}
