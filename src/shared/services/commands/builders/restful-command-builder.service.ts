import {CommandBuilder} from './command-builder.service';
import {RestfulCommand} from '../decorators/restful-command.service';
import {JsonCommand} from '../json-command.service';

export class RestfulCommandBuilder extends CommandBuilder {
  build() {
    let jsonCommand = new JsonCommand();
    jsonCommand.gateway = this.gateway;
    jsonCommand.method = this._payload;
    jsonCommand.method = this._method;
    let command = new RestfulCommand(jsonCommand);
    return command;
  }
}
