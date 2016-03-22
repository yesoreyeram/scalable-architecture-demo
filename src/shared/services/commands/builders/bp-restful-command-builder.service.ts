import {RestfulGateway} from '../../gateways/restful-gateway.service';
import {RestfulCommandBuilder} from './restful-command-builder.service';
import {RestfulCommand} from '../decorators/restful-command.service';
import {JsonCommand} from '../json-command.service';
import {RequestMethod} from 'angular2/http';
import {Injectable} from 'angular2/core';

interface BpCommandBuilderCommand {
  (payload: any, cmd: RestfulCommand): RestfulCommand;
}

const BP_REST_MAPPER: { [id: string] : BpCommandBuilderCommand; } = {
  'set-email'(payload: any, cmd: RestfulCommand): RestfulCommand {
    cmd.method = RequestMethod.Put;
    cmd.setResource([{ name: 'parent', value: payload.id }]);
    return cmd;
  }
};

@Injectable()
export class RestfulBpCommandBulider extends RestfulCommandBuilder {
  constructor(private gateway: RestfulGateway) {
    super();
  }
  build(): RestfulCommand {
    const mapper = BP_REST_MAPPER[this._method];
    if (mapper) {
      const jsonCmd = new JsonCommand();
      jsonCmd.gateway = this.gateway;
      return mapper(this._payload, new RestfulCommand(jsonCmd));
    } else {
      throw new Error('Unknown method for handling');
    }
  }
}
