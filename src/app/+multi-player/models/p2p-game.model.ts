import {Injectable, Inject} from 'angular2/core';
import {Model} from './../../models/base.model';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {GameActions} from '../../actions/action-creators/game.action-creator';
import {AsyncService} from '../../async-services/base.async-service';

@Injectable()
export class P2PGameModel extends Model {
  p2pGame$: Observable<string>;
  constructor(protected _store: Store<any>, @Inject(AsyncService) _services: AsyncService[]) {
    super(_services || []);
    this.p2pGame$ = this._store.select('p2pGame');
  }
  completeGame(time: number, text: string) {
    const action = GameActions.completeGame(time, text);
    this.performAsyncAction(action)
      .subscribe(() => console.log('Done!'));
  }
}
