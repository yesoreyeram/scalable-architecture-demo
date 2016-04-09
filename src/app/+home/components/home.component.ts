import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {GameModel} from '../../models/game.model';

import 'rxjs/add/operator/scan';
import {AppComponent} from '../../components/app.component';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {RoomConfig} from '../../config/config';

@Component({
  selector: 'home',
  styles: [`
    strong {
      cursor: pointer;
    } 
  `],
  template: `
  <h1>Hello there!</h1>
  
  <h3>Single player</h3>
  
  You can either play <strong (click)="navigateTo('SinglePlayer')">single player</strong>.
  
  <h3>Multi-player</h3>
  
  Enter your name for a new game: <input type="text" [(ngModel)]="name"><button (click)="startGame()">Start!</button><br><br>
  
  Enter name of the partner: <input type="text" [(ngModel)]="parent"><button (click)="joinGame()">Join!</button>
  
  <div *ngIf="hasGames() | async">
    <h2>Your statistics:</h2>
    <ul *ngFor="var game of _game.games$ | async">
      <li>{{game.get('text')}} - {{game.get('time')}}</li>
    </ul>
  </div>
  
  `,
  providers: [FORM_PROVIDERS, ROUTER_PROVIDERS],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent {
  private parent: string;
  private name: string;
  constructor(private _game: GameModel, private _roomConfig: RoomConfig, private _parent: AppComponent) {}
  startGame() {
    this._roomConfig.name = this.name;
    this._roomConfig.isInitiator = true;
    this.navigateTo('MultiPlayer');
  }
  joinGame() {
    this._roomConfig.name = this.parent;
    this._roomConfig.isInitiator = false;
    this.navigateTo('MultiPlayer');
  }
  hasGames() {
    return this._game.games$.scan((accum: boolean, game: any) => (accum || !!game.size), false);
  }
  navigateTo(page: string) {
    this._parent.navigateTo(page);
  }
}
