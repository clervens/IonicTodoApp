import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/item-detail/item-detail.html'
})
export class ItemDetailPage {
  static get parameters() {
    return [[NavParams]];
  }
  constructor(params) {
    this.params = params;

    this.title = this.params.get('item').title;
    this.description = this.params.get('item').description;
  }
}
