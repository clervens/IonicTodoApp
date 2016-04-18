import {Page, NavController, ActionSheet, Alert} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';
import {TodosService} from '../../services/todos-service';
import {PressDirective} from '../../directives/press-directive';

@Page({
  templateUrl: 'build/pages/list/list.html',
  directives: [PressDirective]
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
  
  clear() {
    this.todosService.data = [];
    this.todosService.save({title: 'Hello', description: `It's me`});
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
                      return el.title !== item.title && el.description !== item.description;
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
