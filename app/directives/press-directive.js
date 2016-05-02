import {Directive, ElementRef, EventEmitter} from 'angular2/core';
import {Gesture} from 'ionic-angular/gestures/gesture';

@Directive({
  selector: '[longPress]',
  outputs: ['callback: longPress']
})
export class PressDirective {
  
  static get parameters() {
    return [[ElementRef]];
  }

  constructor(el) {
    this.el = el.nativeElement;
    this.pressGesture = null;
    this.callback = new EventEmitter();
  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.el);
    this.pressGesture.listen();
    this.pressGesture.on('press', e => {
      this.callback.emit(this.el);
    });
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}