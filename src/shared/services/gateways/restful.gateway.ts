import {RestfulCommand} from '../commands/restful.command';
import {Gateway} from './base.gateway';
import {Inject, Injectable} from 'angular2/core';
import {Http, RequestMethod, Response, RequestOptionsArgs, Headers} from 'angular2/http';
import {API_URL} from '../../config/config';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import {BP_HTTP} from '../channels/bp-http.channel';

export interface RestfulResponse {
  code: number;
  payload: string;
}

@Injectable()
export class RestfulGateway extends Gateway {
  constructor(@Inject(BP_HTTP) private http: Http, @Inject(API_URL) private API_URL: string) {
    super();
  }
  get(command: RestfulCommand): Observable<Response> {
    return this.http.get(this.getUrl(command));
  }
  post(command: RestfulCommand): Observable<Response> {
    let options: RequestOptionsArgs = {
      headers: new Headers({
        'Content-Type': command.mimeType
      })
    };
    return this.http.post(this.getUrl(command), command.serialize().toString(), options);
  }
  put(command: RestfulCommand): Observable<Response> {
    return this.http.put(this.getUrl(command), command.serialize().toString());
  }
  delete(command: RestfulCommand): Observable<Response> {
    return this.http.delete(this.getUrl(command));
  }
  send(command: RestfulCommand): Observable<RestfulResponse> {
    let result: Observable<Response>;
    switch (command.method) {
      case RequestMethod.Get:
        result = this.get(command);
      break;
      case RequestMethod.Post:
        result = this.post(command);
      break;
      case RequestMethod.Put:
        result = this.put(command);
      break;
      case RequestMethod.Delete:
        result = this.delete(command);
      break;
    }
    if (result) {
      return result.catch((response: Response) => {
          return Observable.create((observer: any) => {
            observer.next(response);
          });
        })
        .map((response: Response) => {
          return { payload: response.text(), code: response.status };
        });
    }
    throw new Error('The requested REST method is not supported');
  }
  private getUrl(command: RestfulCommand): string {
    return `${this.API_URL}${command.resource}`;
  }
}
