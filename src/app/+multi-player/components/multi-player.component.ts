import {Component, provide, ViewChild, NgZone} from 'angular2/core';
import {Gateway} from '../../gateways/base.gateway';
import {WebRTCGateway} from '../gateways/webrtc.gateway';
import {WebSocketGateway, WebSocketGatewayConfig, WS_CONFIG} from '../gateways/websocket.gateway';
import {WS_PORT, WS_SECURE, WS_HOST, GAME_TEXT} from '../../config/config';
import {GameComponent} from '../../components/game/game.component';
import {AsyncService} from '../../async-services/base.async-service';
import {GameModel} from '../../models/game.model';
import {GameServer} from '../../async-services/game-server/game-server.async-service';
import {GameP2PService} from '../async-services/p2p-service/game-p2p.async-service';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {P2PGameModel} from '../models/p2p-game.model';

const WSConfig: WebSocketGatewayConfig = {
  port: WS_PORT,
  secure: WS_SECURE,
  host: WS_HOST
};

const providers = [
  provide(Gateway, { useClass: WebRTCGateway }),
  provide(WebRTCGateway, { useExisting: Gateway }),
  provide(WS_CONFIG, { useValue: WSConfig }),
  WebSocketGateway,
  provide(AsyncService, { multi: true, useClass: GameServer }),
  provide(AsyncService, { multi: true, useClass: GameP2PService }),
  GameModel, P2PGameModel
];

@Component({
  selector: 'sd-about',
  templateUrl: './app/+multi-player/components/multi-player.component.html',
  styleUrls: ['./app/+multi-player/components/multi-player.component.css'],
  directives: [GameComponent],
  providers
})
export class MultiPlayerComponent {
  public timeLeft: number = 5;
  public playerJoined: boolean = false;
  private _timer: any;
  constructor(private _gateway: WebRTCGateway, private _zone: NgZone, private _p2pModel: P2PGameModel) {
    this._gateway.connectionEvents.filter((e: boolean) => e)
      .subscribe(() => {
        this.playerJoined = true;
        this._start();
      });
  }
  private text = GAME_TEXT;
  private gameEnabled: boolean = false;
  private time: number;
  private gamePlayed: boolean = false;
  @ViewChild(GameComponent) private game: GameComponent;

  gameCompleted(time: number) {
    this.time = time;
    this.gameEnabled = false;
    this.game.reset();
  }

  partnerText() {
    return this._p2pModel.p2pGame$
      .filter((game: any) => game && typeof game.get === 'function')
      .map((game: any) => game.get('partnerProgress'));
  }

  private _start() {
    this._zone.run(() => {
      this._timer = Observable
        .interval(1000)
        .take(6)
        .map((num: number) => 5 - num)
        .subscribe((time: number) => {
          this.timeLeft = time;
        }, null, () => {
          console.log('Started!');
          this.gameEnabled = true;
        });
    });
    this.gamePlayed = true;
    this.time = 0;
  }
}
