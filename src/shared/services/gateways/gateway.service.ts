import {Command} from '../commands/command.service';
import {Observable} from 'rxjs/Observable';

export abstract class Gateway {
  abstract send(command: Command): Observable<any>;
}
