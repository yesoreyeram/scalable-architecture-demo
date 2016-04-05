import {AsyncService} from '../async-services/base.async-service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';

export interface SuccessCallback {
  (data: any): void;
}

export interface FailCallback {
  (data: any): void;
}

export abstract class Model {
  protected _services: AsyncService[];
  protected performAsyncAction(action: Action) {
    console.log('Async started');
    return Observable.merge.apply(Observable, this._services.map(s => s.process(action)));
  }
}
