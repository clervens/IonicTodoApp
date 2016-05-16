import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService {
  private static get DBNAME(): string { return "todos"; }
  private static get DBKEY(): string { return "settings"; }

  private storage: Storage;
  private settings: Object;

  constructor() {
    this.storage = new Storage(SqlStorage, { name: SettingsService.DBNAME });

    this.storage.get(SettingsService.DBKEY).then(
      data => this.settings = JSON.parse(data||"{}")
    );
  }

  getSettings() {
    return this.storage.get(SettingsService.DBKEY);
  }

  get(key: string) {
    return this.settings[key];
  }

  set(key: string, value: any) {
    this.settings[key] = value;
    this.save();
  }

  save(data?: Object) {
    if(data == null) {
      data = this.settings;
    }
    this.storage.set(SettingsService.DBKEY, JSON.stringify(data));
    this.settings = data;
  }
}

export class Settings {
  public annotations: Object;
  private _leftHandMode: boolean;

  constructor(data?: Object) {
    Object.assign(this, data);
  }

  @annotation({
      title: "Left-hand Mode",
      label: "Enable Left hand mode",
      description: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy."
  })
  get leftHandMode() { return this._leftHandMode; }
  set leftHandMode(val: boolean) { this._leftHandMode = val; }

  toJSON(): Object {
    return {
      leftHandMode: this._leftHandMode
    };
  }
}

function annotation(annotations) {
  return function(target, name, descriptor) {
      if(target.annotations == null)
        target.annotations = {};
      target.annotations[name] = annotations;
  }
}
