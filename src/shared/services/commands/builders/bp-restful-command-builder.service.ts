import {CommandBuilder} from './command-builder.service';
import {JsonCommand} from '../json-command.service';
import {RestfulCommand} from '../decorators/restful-command.service';
import {RequestMethod} from 'angular2/http';
import {Action} from '@ngrx/store';
import {RestfulGateway} from '../../gateways/restful-gateway.service';

import {Injectable} from 'angular2/core';

import {
  SIGNUP_PARENT
} from '../../actions/actions';

interface BpCommandBuilderCommand {
  (payload: any, cmd: RestfulCommand): RestfulCommand;
}

const BP_REST_MAPPER: { [id: string] : BpCommandBuilderCommand; } = {
  [SIGNUP_PARENT](payload: any, cmd: RestfulCommand): RestfulCommand {
    cmd.method = RequestMethod.Post;
    cmd.payload = payload;
    cmd.setResource([{ name: 'parent', value: '' }]);
    return cmd;
  }
};

@Injectable()
export class BpRestfulCommandBuilder extends CommandBuilder {
  constructor(private gateway: RestfulGateway) {
    super();
  }
  build(action: Action): RestfulCommand {
    const command = BP_REST_MAPPER[action.type];
    if (command) {
      const jsonCmd = new JsonCommand();
      jsonCmd.gateway = this.gateway;
      const cmd = command(action.payload, new RestfulCommand(jsonCmd));
      return cmd;
    } else {
      throw new Error('Unknown method for handling');
    }
  }
}
