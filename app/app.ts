import {App, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {SettingsPage} from './pages/settings/settings';
import {TodosService} from './services/todos-service';
import {SettingsService} from './services/settings-service';

@App({
  templateUrl: 'build/pages/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [TodosService, SettingsService]
})

export class MyApp {
  public settingsPage: any = SettingsPage;
  public listPage: any = ListPage;
  rootPage: any = ListPage;

  constructor(platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  loadPage(page) {
    this.rootPage = page;
    this.menu.close();
  }
}
