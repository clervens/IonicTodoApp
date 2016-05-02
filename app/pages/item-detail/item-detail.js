import {Page, NavController, NavParams} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';

@Page({
  templateUrl: 'build/pages/item-detail/item-detail.html'
})
export class ItemDetailPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }
  constructor(nav, params) {
    this.nav = nav;
    this.params = params;

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
