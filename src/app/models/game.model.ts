import {Inject, Injectable} from 'angular2/core';
import {AsyncService} from '../async-services/base.async-service';
import {Model} from './base.model';
import {GameActions} from '../actions/action-creators/game.action-creator';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameModel extends Model {
  games$: Observable<string>;
  constructor(protected _store: Store<any>, @Inject(AsyncService) protected _services: AsyncService[]) {
    super();
    this.games$ = this._store.select('games');
  }
  completeGame(time: number, text: string) {
    const action = GameActions.completeGame(time, text);
    this._store.dispatch(action);
  }
}
