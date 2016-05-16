import {Page, NavController, Loading} from 'ionic-angular';
import {SettingsService, Settings} from '../../services/settings-service';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  private settings: Settings = new Settings();
  constructor(public nav: NavController, private settingsService: SettingsService) {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.nav.present(loading);
    settingsService.getSettings().then(data => {
      this.settings = new Settings(JSON.parse(data||"{}"));
      loading.dismiss();
    });
  }

  save() {
    this.settingsService.save(this.settings);
    this.nav.pop();
  }

  getAnnotation(property: string, label: string) :string {
    return this.settings.annotations[property][label];
  }

  properties() {
    return Object.keys(this.settings.toJSON());
  }
}
