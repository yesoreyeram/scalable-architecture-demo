import {Component, provide} from 'angular2/core';
import {Gateway} from '../../gateways/base.gateway';
import {WebRTCGateway} from '../../gateways/webrtc.gateway';
import {WebSocketGateway, WebSocketGatewayConfig, WS_CONFIG} from '../../gateways/websocket.gateway';
import {WS_PORT, WS_SECURE, WS_HOST} from '../../config/config';
import {GameComponent} from '../../components/game/game.component';

const WSConfig: WebSocketGatewayConfig = {
  port: WS_PORT,
  secure: WS_SECURE,
  host: WS_HOST
};

const providers = [
  provide(Gateway, { useClass: WebRTCGateway }),
  provide(WebRTCGateway, { useExisting: Gateway }),
  provide(WS_CONFIG, { useValue: WSConfig }),
  WebSocketGateway
];

@Component({
  selector: 'sd-about',
  templateUrl: './app/+multi-player/components/multi-player.component.html',
  styleUrls: ['./app/+multi-player/components/multi-player.component.css'],
  directives: [GameComponent],
  providers
})
export class MultiPlayerComponent {
  constructor(private _gateway: WebRTCGateway) {
    this._gateway.connectionEvents.filter((e: boolean) => e)
      .subscribe(() => {
        this.start();
      });
  }
  start() {
    console.log('AWESOME');
  }
}
