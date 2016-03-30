import {AsyncService} from './base.async-service';
import {Injectable} from 'angular2/core';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {CommandResult} from '../commands/base.command';
import {JsonPayload} from '../commands/payloads/json.command.payload';
import {RequestMethod} from 'angular2/http';
import {SIGNIN_PARENT, GET_GUEST_TOKEN, SIGNUP_PARENT} from '../actions/parent.actions';
import {RestfulCommand} from '../commands/restful.command';
import {RestfulGateway} from '../gateways/restful.gateway';

interface RestfulCommandBuilder {
  (payload: any, cmd: RestfulCommand): RestfulCommand;
}

const BP_REST_MAPPER: { [id: string] : RestfulCommandBuilder; } = {
  [SIGNUP_PARENT](payload: any, cmd: RestfulCommand): RestfulCommand {
    cmd.method = RequestMethod.Post;
    cmd.payload = new JsonPayload({
      name: payload.name,
      password: payload.password,
      email: payload.email
    });
    cmd.setResource([{ name: 'parents', value: '' }]);
    return cmd;
  },
  [GET_GUEST_TOKEN](payload: any, cmd: RestfulCommand): RestfulCommand {
    cmd.method = RequestMethod.Post;
    cmd.payload = new JsonPayload({
      authorizable: 'guest',
      authorizable_type: 'guest'
    });
    cmd.setResource([{ name: 'auth', value: '' }]);
    return cmd;
  },
  [SIGNIN_PARENT](payload: any, cmd: RestfulCommand): RestfulCommand {
    cmd.method = RequestMethod.Post;
    cmd.payload = new JsonPayload({
      authorizable: payload.email,
      authorizable_type: 'parent',
      password: payload.password
    });
    cmd.setResource([{ name: 'auth', value: '' }]);
    return cmd;
  }
};

@Injectable()
export class BpRestfulService extends AsyncService {
  constructor(protected gateway: RestfulGateway) {
    super();
  }
  process(action: Action) {
    let result = new Observable<CommandResult>((observer: Observer<any>) => {
      const command = new RestfulCommand();
      command.gateway = this.gateway;
      const builder = BP_REST_MAPPER[action.type];
      if (builder) {
        builder(action.payload, command)
          .invoke().subscribe(response => {
          // Should be mapped to app specific data here
          observer.next(response.payload);
        }, (error: any) => {
          observer.error(error);
        }, () => observer.complete());
      } else {
        throw new Error(`No command for ${action.type}.`);
      }
    });
    return result;
  }
}

