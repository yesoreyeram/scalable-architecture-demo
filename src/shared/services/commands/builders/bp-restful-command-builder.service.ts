import {RestfulGateway} from '../../gateways/restful-gateway.service';
import {RestfulCommandBuilder} from './restful-command-builder.service';
import {RestfulCommand} from '../decorators/restful-command.service';
import {JsonCommand} from '../json-command.service';
import {RequestMethod} from 'angular2/http';
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
export class RestfulBpCommandBulider extends RestfulCommandBuilder {
  constructor(private gateway: RestfulGateway) {
    super();
  }
  build(): RestfulCommand {
    const command = BP_REST_MAPPER[this._method];
    if (command) {
      const jsonCmd = new JsonCommand();
      jsonCmd.gateway = this.gateway;
      const cmd = command(this._payload, new RestfulCommand(jsonCmd));
      return cmd;
    } else {
      throw new Error('Unknown method for handling');
    }
  }
}
