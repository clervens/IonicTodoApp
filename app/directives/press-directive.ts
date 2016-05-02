import {Directive, ElementRef, EventEmitter, Output} from 'angular2/core';
import {Gesture} from 'ionic-angular/gestures/gesture';

@Directive({
  selector: '[longPress]'
})
export class PressDirective {
  private el: any;
  private pressGesture: Gesture;

  @Output('longPress') callback = new EventEmitter();

  constructor(private elm: ElementRef) {
    this.el = elm.nativeElement;
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
