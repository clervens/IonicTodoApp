import {Page, NavController, ActionSheet, Alert, Loading} from 'ionic-angular';
import {ChangeDetectorRef} from 'angular2/core';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';
import {TodosService} from '../../services/todos-service';
import {SettingsService} from '../../services/settings-service';
import {Todo, TodoState} from "../../models/todo";
import {TodoStatusFilterPipe} from '../../pipes/todostatus-filter';

@Page({
  templateUrl: 'build/pages/list/list.html',
  pipes: [TodoStatusFilterPipe]
})
export class ListPage {
  private items: Array<any>;

  public stateFilter: TodoState;
  public todoState;
  public settings: any = {};

  constructor(private nav: NavController, private todosService: TodosService,
    public settingsService: SettingsService) {
    this.items = [];
    this.stateFilter = TodoState.ACTIVE;
    this.todoState = TodoState;
  }

  ngOnInit() {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.nav.present(loading);
    this.todosService.getData().then(
      (todos) => {
        let dataLst = JSON.parse(todos||"[]");
        this.items = dataLst.map((data) => {
          return new Todo(data);
        });
        this.settingsService.getSettings().then(
          (data) => {
            this.settings = JSON.parse(data||'{}');
            loading.dismiss();
          }
        );
      }
    );
  }

  addItem() {
    this.nav.push(AddItemPage, {listPage: this});
  }

  saveItem(item, isEdit: boolean) {
    if (isEdit) {
      this.items[item.index] = item;
      this.todosService.saveData(this.items);
    } else {
      this.items.push(item);
      this.todosService.save(item);
    }
  }

  viewItem(item: Todo) {
    this.nav.push(ItemDetailPage, {listPage: this, item: item});
  }

  editItem(item: Todo) {
    this.nav.push(AddItemPage, {listPage: this, item: item, isEdit: true});
  }

  showAction(item: Todo) {
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
            console.log('Archive clicked');
            item.status = TodoState.ARCHIVED;
            this.saveItem(item, true);
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
