import {AsyncService} from '../async-services/base.async-service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';

export abstract class Model {
  constructor(private _services: AsyncService[]) {}
  protected performAsyncAction(action: Action) {
    return Observable.merge.apply(Observable, (this._services || []).map(s => s.process(action)));
  }
}
