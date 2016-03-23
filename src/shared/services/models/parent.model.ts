import {Injectable, Inject} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp-store';
import {RemoteService} from '../remote-services/remote-service.service';
import {Model} from './base.model';

import {Observable} from 'rxjs/Observable';

import {ParentActions} from '../actions/actions';

@Injectable()
export class ParentModel extends Model {
  parent$: Observable<Parent>;
  constructor(private store: Store<Parent>, @Inject(RemoteService) protected services: RemoteService[]) {
    super();
    this.parent$ = store.select('parent');
  }
  signup(email: string, password: string) {
    const action = ParentActions.signup(email, password);
    this.performAsyncAction(action);
  }
  signin(email: string, password: string) {
    const action = ParentActions.signup(email, password);
    this.performAsyncAction(action);
  }
}
