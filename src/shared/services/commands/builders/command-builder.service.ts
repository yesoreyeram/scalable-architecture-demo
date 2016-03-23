import {Action} from '@ngrx/store';
import {Command} from '../command.service';

export abstract class CommandBuilder {
  abstract build(action: Action): Command;
}
