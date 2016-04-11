import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {NavbarComponent} from './navbar/navbar.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

import {HTTP_PROVIDERS} from 'angular2/http';
import {provideStore} from '@ngrx/store';
import {gamesReducer, gameReducer, p2pGameReducer} from '../reducers/game.reducer';
import {RestfulGateway} from '../gateways/restful.gateway';
import {GameModel} from '../models/game.model';
import {RoomConfig} from '../config/config';

const providers = [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provideStore({ games: gamesReducer, game: gameReducer, p2pGame: p2pGameReducer }),
  RoomConfig,
  RestfulGateway
];

@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    loader: () => System.import('app/+home').then((m: any) => m.HomeComponent)
  },
  {
    path: '/single-player',
    name: 'SinglePlayer',
    loader: () => System.import('app/+single-player').then((m: any) => m.SinglePlayerComponent)
  },
  {
    path: '/multi-player',
    name: 'MultiPlayer',
    loader: () => System.import('app/+multi-player').then((m: any) => m.MultiPlayerComponent)
  }
])
export class AppComponent {
  constructor(private _router: Router) {}
  navigateTo(page: string) {
    this._router.navigate([page]);
  }
}
