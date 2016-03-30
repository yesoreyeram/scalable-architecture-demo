import {Injectable, Inject} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp.store';
import {AsyncService} from '../async-services/base.async-service';
import {Model} from './base.model';

import {Observable} from 'rxjs/Observable';

import {ParentActions} from '../actions/index';
import {AuthConfig} from 'angular2-jwt/angular2-jwt';
import {persistToken} from '../auth/token-store.auth';

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
        action.payload = data;
        this.store.dispatch(action);
        persistToken(this.authConfig.getConfig().tokenName, data.jwt);
      }, (error: any) => {
        console.log('ERROR', error);
      });
  }
  signUp(name: string, email: string, password: string) {
    const action = ParentActions.signUp(name, email, password);
    this.performAsyncAction(action)
      .subscribe(() => this.store.dispatch(action),
        (error: any) => {
          console.log('ERROR', error);
        });
  }
  signIn(email: string, password: string) {
    const action = ParentActions.signIn(email, password);
    this.performAsyncAction(action)
      .subscribe((data: any) => {
          action.payload = {
            email, jwt: data.jwt
          };
          this.store.dispatch(action);
          persistToken(this.authConfig.getConfig().tokenName, data.jwt);
        }, (error: any) => console.log('ERROR', error));
  }
}
