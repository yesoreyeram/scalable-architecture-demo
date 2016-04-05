/* tslint:disable:no-unused-variable */

import {
  Component, Renderer, Input, ViewChild, ElementRef, Output, EventEmitter,
  AfterViewInit
} from 'angular2/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from 'angular2/common';
import {TimerComponent} from '../timer/timer.component';
import {GameModel} from '../../models/game.model';
@Component({
  selector: 'game',
  template: `
    <timer #timer></timer>
    <div class="game" #gameContainer>
      <div class="game-text">{{text}}</div>
      <textarea #textArea (keyup)="changeHandler($event.target.value)"></textarea>
    </div>
  `,
  styles: [`
    .game textarea {
      font-size: 14px;
      width: 400px;
      height: 250px;
    }
    .game.wrong textarea {
      background-color: red;
      color: white;
    }
  `],
  providers: [FORM_PROVIDERS],
  directives: [FORM_DIRECTIVES, TimerComponent]
})
export class GameComponent implements AfterViewInit {
  @ViewChild('gameContainer') gameContainer: ElementRef;
  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('timer') timer: TimerComponent;
  @Input() text: string;
  @Output() end: EventEmitter<number> = new EventEmitter<number>();
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _model: GameModel, private _renderer: Renderer) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.timer.start();
      this._renderer.invokeElementMethod(this.textArea.nativeElement, 'focus', []);
    }, 0);
  }

  changeHandler(data: string) {
    if (this.text === data) {
      this.end.emit(this.timer.time);
      this._model.completeGame(this.timer.time, this.text);
      this.timer.reset();
    } else {
      if (this.text.indexOf(data) !== 0) {
        this._renderer.setElementClass(this.gameContainer.nativeElement, 'wrong', true);
      } else {
        this._renderer.setElementClass(this.gameContainer.nativeElement, 'wrong', false);
      }
    }
  }

  reset() {
    this.timer.reset();
    this.text = '';
  }

}
