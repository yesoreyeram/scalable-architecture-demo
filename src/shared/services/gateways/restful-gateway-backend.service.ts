import {Command} from '../commands/command.service';
import {Observable} from 'rxjs/Observable';

export abstract class RestfulGatewayBackend<T> {
  abstract get(command: Command): Observable<T>;
  abstract post(command: Command): Observable<T>;
  abstract put(command: Command): Observable<T>;
  abstract delete(command: Command): Observable<T>;
  send(command: Command): Observable<T> {
    switch (command.method.toLowerCase()) {
      case 'get':
      return this.get(command);
      case 'post':
      return this.post(command);
      case 'put':
      return this.put(command);
      case 'delete':
      return this.delete(command);
    }
    throw new Error('The requested REST method is not supported');
  }
}
