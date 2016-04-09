import {Action} from '@ngrx/store';
import {Injectable} from 'angular2/core';
import {buildP2PCommand} from './command-builders/index';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {PROGRESS} from './command-builders/game-p2p.commands';

import {Store} from '@ngrx/store';
import {WebRTCGateway} from '../../gateways/webrtc.gateway';
import {AsyncService} from '../../../async-services/base.async-service';
import {GameActions} from '../../../actions/action-creators/game.action-creator';
import {RPCCommand} from '../../../commands/rpc.command';
import {JsonPayload} from '../../../commands/payloads/json.command.payload';

@Injectable()
export class GameP2PService extends AsyncService {
  constructor(private _rtcGateway: WebRTCGateway, private _store: Store<any>) {
    super();
    _rtcGateway.dataStream
      .map((data: any) => JSON.parse(data.toString()))
      .subscribe((command: any) => {
        switch (command.method) {
          case PROGRESS:
            _store.dispatch(GameActions.partnerProgress(command.payload.text));
            break;
        }
      });
  }
  process(action: Action) {
    let baseCommand = new RPCCommand();
    baseCommand.payload = new JsonPayload();
    baseCommand.gateway = this._rtcGateway;
    let commandBuilder = buildP2PCommand(action);
    if (!commandBuilder) {
      console.warn('This command is not supported');
      return Observable.create((obs: Observer<any>) => obs.complete());
    } else {
      return commandBuilder(baseCommand).invoke();
    }
  }
}
