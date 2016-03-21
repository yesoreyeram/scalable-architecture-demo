import {RestfulCommand} from '../commands/decorators/restful-command.service';
import {Observable} from 'rxjs/Observable';
import {Gateway} from './gateway.service';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';
import {API_URL} from '../../config/config';

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
  private getUrl(command: RestfulCommand): string {
    return `${this.API_URL}${command.resource}`;
  }
}
