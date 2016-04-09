import {RestfulCommand} from '../commands/restful.command';
import {Gateway} from './base.gateway';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import {Observer} from 'rxjs/Observer';
import {Injectable} from 'angular2/core';
import {Response, ResponseOptions} from 'angular2/http';

@Injectable()
export class RestfulGateway extends Gateway {
  constructor() {
    super();
  }
  send(command: RestfulCommand): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const ok = Math.random() <= 0.9;
      const body = null;
      const status = ok ? 200 : 500;
      const headers = null;
      const statusText = null;
      const type = null;
      const url = null
      const response = new Response(new ResponseOptions({
        body,
        status,
        headers,
        statusText,
        type,
        url
      }));
      return ok ? observer.next(response) : observer.error(response);
    });
  }
}
