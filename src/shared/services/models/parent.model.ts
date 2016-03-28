import {Injectable, Inject} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp-store';
import {AsyncService} from '../async-services/async-service.service';
import {Model} from './base.model';

import {Observable} from 'rxjs/Observable';

import {ParentActions} from '../actions/actions';
import {AuthConfig} from 'angular2-jwt/angular2-jwt';
import {persistToken} from '../auth/token.store';

@Injectable()
export class ParentModel extends Model {
  parent$: Observable<Parent>;
  constructor(private store: Store<Parent>, @Inject(AsyncService) protected services: AsyncService[], private authConfig: AuthConfig) {
    super();
    this.parent$ = store.select('parent');
  }
  getGuestToken() {
    const action = ParentActions.getGuestToken();
    this.performAsyncAction(action)
      .subscribe((data: any) => {
        persistToken(this.authConfig.getConfig().tokenName, data.jwt);
      }, (error: any) => {
        console.log(error);
      });
  }
  signUp(email: string, password: string) {
    const action = ParentActions.signUp(email, password);
    this.performAsyncAction(action)
      .subscribe(() => this.store.dispatch(action),
        (error: any) => {
          this.store.dispatch(action);
          console.log('ERROR', error);
        });
  }
  signIn(email: string, password: string) {
    const action = ParentActions.signIn(email, password);
    this.performAsyncAction(action)
      .subscribe(() => console.log('AWESOME!'),
        (error: any) => {
          console.log('ERROR', error);
        });
  }
}
