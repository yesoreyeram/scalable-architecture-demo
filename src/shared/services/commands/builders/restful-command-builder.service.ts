import {CommandBuilder} from './command-builder.service';
import {JsonCommand} from '../json-command.service';

export class RestfulCommandBuilder extends CommandBuilder {
  build() {
    let command = new JsonCommand();
    command.
  }
}
