import {Page, NavController, ActionSheet, Alert, Loading} from 'ionic-angular';
import {ChangeDetectorRef} from 'angular2/core';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';
import {TodosService} from '../../services/todos-service';
import {Todo} from "../../models/todo";

@Page({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  static get parameters() {
    return [[NavController], [TodosService]];
  }
  constructor(nav, todosService) {
    this.nav = nav;
    this.todosService = todosService;
    this.items = [];
  }

  ngOnInit() {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.nav.present(loading);
    this.todosService.getData().then(
      (todos) => {
        let dataLst = JSON.parse(todos) || [];
        this.items = dataLst.map((data) => {
          return data;
        });
        loading.dismiss();
      }
    );
  }

  addItem() {
    this.nav.push(AddItemPage, {listPage: this});
  }

  saveItem(item, isEdit) {
    if (isEdit) {
      this.items[item.index] = item;
      this.todosService.saveData(this.items);
    } else {
      this.items.push(item);
      this.todosService.save(item);
    }
  }

  viewItem(item) {
    this.nav.push(ItemDetailPage, {listPage: this, item: item});
  }

  editItem(item) {
    this.nav.push(AddItemPage, {listPage: this, item: item, isEdit: true});
  }

  showAction(item) {
    /*
     * Show ActionSheet
     *  |- Archive-|
     *  |- Delete -|
     *  |----------|
     *  |- Cancel -|
     */
    let actionSheet = ActionSheet.create({
      title: 'Modify your todo',
      buttons: [
        {
          text: 'Archive',
          handler: () => {
            console.log('Show clicked');
            let alert = Alert.create({
              title: 'Archive',
              subTitle: `The todo "${item.title}" as just been archived!`,
              buttons: ['OK']
            });
            this.nav.present(alert);
          }
        },{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            let confirm = Alert.create({
              title: 'Delete',
              message: `Are you sure sure you want to delete the todo "${item.title}" ?`,
              buttons: [
                {
                  text: 'Disagree',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Agree',
                  handler: () => {
                    this.items = this.items.filter(function (el) {
                      return el.id !== item.id;
                    });
                    this.todosService.saveData(this.items);
                  }
                }
              ]
            });
            this.nav.present(confirm);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.nav.present(actionSheet);
  }
}
