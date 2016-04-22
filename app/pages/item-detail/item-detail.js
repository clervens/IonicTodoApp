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

    this.title = this.params.get('item').title;
    this.description = this.params.get('item').description;
    this.index = this.params.get('item').index;
  }
  
  editItem() {
    this.nav.push(AddItemPage, {listPage: this.params.get('listPage'), isEdit: true, item: this.params.get('item')});
  }
}
