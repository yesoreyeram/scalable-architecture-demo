import {Command} from '../commands/command.service';
import {Observable} from 'rxjs/Observable';

export abstract class Gateway<T> {
  abstract send(command: Command): Observable<T>;
}
