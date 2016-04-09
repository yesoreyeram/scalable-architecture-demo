import {RestfulGateway} from '../../gateways/restful.gateway';
import {AsyncService} from './../base.async-service';

import {Action} from '@ngrx/store';
import {Injectable} from 'angular2/core';

// For command builder take a look at
// +multi-player async-services
@Injectable()
export class GameServer extends AsyncService {
  constructor(private _restfulGateway: RestfulGateway) {
    super();
  }
  process(data: Action) {
    return this._restfulGateway.send(data.payload);
  }
}
