/* tslint:disable:no-unused-variable */

import {Component, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {GameComponent} from '../../components/game/game.component';

@Component({
  selector: 'sd-home',
  templateUrl: './app/+single-player/components/single-player.component.html',
  styleUrls: ['./app/+single-player/components/single-player.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, GameComponent]
})
export class SinglePlayerComponent {
  private text = `Lorem Ipsum is simply dummy text of the printing.`;
  private gameEnabled: boolean = false;
  private time: number;
  private gamePlayed: boolean = false;
  @ViewChild(GameComponent) private game: GameComponent;

  gameCompleted(time: number) {
    this.time = time;
    this.gameEnabled = false;
    this.game.reset();
  }
  start() {
    this.gamePlayed = true;
    this.time = 0;
    this.gameEnabled = true;
  }
}
