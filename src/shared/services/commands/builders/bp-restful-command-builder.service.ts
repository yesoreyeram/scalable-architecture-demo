import {RestfulCommandBuilder} from './restful-command-builder.service';
import {RestfulCommand} from '../decorators/restful-command.service';
import {JsonCommand} from '../json-command.service';
import {RequestMethod} from 'angular2/http';

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

export class RestfulBpCommandBulider extends RestfulCommandBuilder {
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
