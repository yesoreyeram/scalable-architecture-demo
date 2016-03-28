import {Injectable, Inject} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp-store';
import {AsyncService} from '../async-services/async-service.service';
import {Model} from './base.model';

import {Observable} from 'rxjs/Observable';

import {ParentActions} from '../actions/actions';

@Injectable()
export class ParentModel extends Model {
  parent$: Observable<Parent>;
  constructor(private store: Store<Parent>, @Inject(AsyncService) protected services: AsyncService[]) {
    super();
    this.parent$ = store.select('parent');
  }
  signUp(email: string, password: string) {
    const action = ParentActions.signup(email, password);
    this.performAsyncAction(action, () => {
      this.store.dispatch(action);
    }, (error: any) => {
      this.store.dispatch(action);
      console.log('ERROR', error);
    });
  }
  signIn(email: string, password: string) {
    const action = ParentActions.signup(email, password);
    this.performAsyncAction(action, () => {
      console.log('AWESOME!');
    }, (error: any) => {
      console.log('ERROR', error);
    });
  }
}
