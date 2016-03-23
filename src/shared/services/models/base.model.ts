import {AsyncService} from '../async-services/async-service.service';
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
  protected services: AsyncService[];
  protected performAsyncAction(action: Action, success?: SuccessCallback, fail?: FailCallback) {
    console.log('Async started');
    return Observable.forkJoin(this.services.map(s => s.process(action)))
      .subscribe(() => {
        debugger;
        (<Function>success)();
      }, () => {
        debugger;
        (<Function>fail)();
      });
  }
}
