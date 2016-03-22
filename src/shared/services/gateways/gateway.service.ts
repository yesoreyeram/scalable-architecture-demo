import {Command} from '../commands/command.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

@Injectable()
export abstract class Gateway {
  abstract send(command: Command): Observable<any>;
}
