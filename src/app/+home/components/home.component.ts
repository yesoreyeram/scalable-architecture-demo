import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {GameModel} from '../../models/game.model';

import 'rxjs/add/operator/scan';

@Component({
  selector: 'home',
  template: `
  <h1>Hello there!</h1>
  
  You can either play <a [routerLink]="['SinglePlayer']">single player</a> or
  <a [routerLink]="['MultiPlayer']">multi-player</a> game!<br><br>
  
  Enter a game name here: <input type="text" [(ngModel)]="gameId"><button (click)="startGame()">Go</button>
  
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
  private gameId: string;
  constructor(private _game: GameModel, private _router: Router) {}
  startGame() {
    this._router.navigate(['MultiPlayer', { id: this.gameId }]);
  }
  hasGames() {
    return this._game.games$.scan((accum: boolean, game: any) => (accum || !!game.size), false);
  }
}
