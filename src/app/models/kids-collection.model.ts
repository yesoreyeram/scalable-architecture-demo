import {Model} from './base.model';
import {Store, Action} from '@ngrx/store';
import {Kid} from '../store/bp.store';
import {AsyncService} from '../async-services/base.async-service';
import {Inject, Injectable} from 'angular2/core';
import {KidActions} from '../actions/action-creators/kid.action-creator';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class KidsCollectionModel extends Model {
  kids$: Observable<Kid>;
  constructor(private store: Store<Kid>, @Inject(AsyncService) protected services: AsyncService[]) {
    super();
    this.kids$ = store.select('kids');
    this.kids$.subscribe((foo: any) => {
      console.log(foo);
    });
  }
  // No need for parameters because the BE
  // gets the parent from the current token
  loadKids() {
    const action = KidActions.getKids();
    this.performAsyncAction(action)
      .subscribe((kids: any) => {
        const internalAction: Action = {
          type: action.type,
          payload: JSON.parse(JSON.stringify(kids))
        };
        this.store.dispatch(internalAction);
      }, (error: any) => console.log('Fail', error));
  }
  createKid(kid: Kid) {
    const action = KidActions.createKid(kid);
    this.performAsyncAction(action)
      .subscribe((kid: any) => {
        action.payload = JSON.parse(JSON.stringify(action.payload));
        this.store.dispatch(action);
      }, (error: any) => console.log('Fail', error));
  }
}
