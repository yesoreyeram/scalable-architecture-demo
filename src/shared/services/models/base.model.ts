import {RemoteService} from '../remote-services/remote-service.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/observable/forkJoin';

import {Wove} from 'aspect.js';

export interface SuccessCallback {
  (data: any): void;
}

export interface FailCallback {
  (data: any): void;
}

@Wove()
export abstract class Model {
  protected services: RemoteService[];
  protected performAsyncAction(action: Action, success?: SuccessCallback, fail?: FailCallback) {
    console.log('Async started');
    return Observable.forkJoin(this.services.map(s => s.process(action)))
      .subscribe(success, fail);
  }
}
