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

    this.title = "";
    this.description = "";
  }

  saveItem() {
    let newItem = {
      title: this.title,
      description: this.description
    }

    this.params.get('listPage').saveItem(newItem);

    this.nav.pop();
  }
}
