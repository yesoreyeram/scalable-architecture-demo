import {RestfulCommand} from '../commands/decorators/restful-command.service';
import {Observable} from 'rxjs/Observable';
import {Gateway} from './gateway.service';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';
import {API_URL} from '../../config/config';
import {RequestMethod} from 'angular2/http';

export class RestfulGateway extends Gateway {
  constructor(private http: Http, @Inject(API_URL) private API_URL: string) {
    super();
  }
  get(command: RestfulCommand): Observable<any> {
    return this.http.get(this.getUrl(command));
  }
  post(command: RestfulCommand): Observable<any> {
    return this.http.post(this.getUrl(command), command.serialize().toString());
  }
  put(command: RestfulCommand): Observable<any> {
    return this.http.put(this.getUrl(command), command.serialize().toString());
  }
  delete(command: RestfulCommand): Observable<any> {
    return this.http.delete(this.getUrl(command));
  }
  send(command: RestfulCommand): Observable<any> {
    switch (command.method) {
      case RequestMethod.Get:
      return this.get(command);
      case RequestMethod.Post:
      return this.post(command);
      case RequestMethod.Put:
      return this.put(command);
      case RequestMethod.Delete:
      return this.delete(command);
    }
    throw new Error('The requested REST method is not supported');
  }
  private getUrl(command: RestfulCommand): string {
    return `${this.API_URL}${command.resource}`;
  }
}
