import {AsyncService} from '../async-services/async-service.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';

import {Wove} from 'aspect.js';

export interface SuccessCallback {
  (data: any): void;
}

export interface FailCallback {
  (data: any): void;
}

@Wove()
export abstract class Model {
  protected services: AsyncService[];
  protected performAsyncAction(action: Action, success?: SuccessCallback, fail?: FailCallback) {
    console.log('Async started');
    return Observable.merge.apply(Observable, this.services.map(s => s.process(action)))
      .subscribe(success, fail);
  }
}
