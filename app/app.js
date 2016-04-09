import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {TodosService} from './services/todos-service';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [TodosService]
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = ListPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
