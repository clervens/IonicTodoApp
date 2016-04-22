import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add-item/add-item.html'
})
export class AddItemPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }
  constructor(nav, params) {
    this.nav = nav;
    this.params = params;
    if (typeof this.params.get('item') == 'undefined' || this.params.get('item') == null) {
      this.title = "";
      this.description = "";
      this.index = "";
    } else {
      this.title = this.params.get('item').title;
      this.description = this.params.get('item').description;
      this.index = this.params.get('item').index;
    }
  }

  saveItem() {
    let newItem = {
      title: this.title,
      description: this.description,
      index: this.index
    }

    this.params.get('listPage').saveItem(newItem, this.params.get('isEdit'));

    this.nav.pop();
  }
}
