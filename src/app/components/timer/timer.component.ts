import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
@Component({
  selector: 'timer',
  template: '<div>{{ timer | async }} sec.</div>'
})
export class TimerComponent {
  public time: number = 0;
  private timer: Observable<number>;
  private interval: any;
  reset() {
    this.time = 0;
    clearInterval(this.interval);
  }
  start() {
    this.timer = new Observable<number>((observer: Observer<number>) => {
      observer.next(this.time);
      this.interval = setInterval(() => {
        this.time += 10;
        observer.next(this.time);
      }, 10);
    });
  }
}
