import {Page, NavController, NavParams} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';
import {Todo} from '../../models/todo';

@Page({
  templateUrl: 'build/pages/item-detail/item-detail.html'
})
export class ItemDetailPage {
  private item: Todo;
  constructor(private nav: NavController, private params: NavParams) {
    this.item = this.params.get('item');
  }

  editItem() {
    this.nav.push(AddItemPage, {
      listPage: this.params.get('listPage'),
      isEdit: true,
      item: this.item
    });
  }
}
