import {Command} from '../commands/base.command.ts';
import {Observable} from 'rxjs/Observable';

export abstract class Gateway {
  abstract send(command: Command): Observable<any>;
}
