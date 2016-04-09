import {Inject, Injectable, Optional} from 'angular2/core';
import {AsyncService} from '../async-services/base.async-service';
import {Model} from './base.model';
import {GameActions} from '../actions/action-creators/game.action-creator';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameModel extends Model {
  games$: Observable<string>;
  game$: Observable<string>;
  private _prevText: string = '';
  constructor(protected _store: Store<any>,
              @Optional() @Inject(AsyncService) _services: AsyncService[]) {
    super(_services || []);
    this.games$ = this._store.select('games');
    this.game$ = this._store.select('game');
  }
  startGame() {
    this._store.dispatch(GameActions.startGame());
  }
  onProgress(text: string) {
    this.performAsyncAction(GameActions.gameProgress(this._prevText, text, new Date()))
      .subscribe(() => {
        // Do nothing, we're all good
      }, () => {
        this._store.dispatch(GameActions.invalidateGame());
      });
    this._prevText = text;
  }
  completeGame(time: number, text: string) {
    this._store.dispatch(GameActions.completeGame(time, text));
  }
}
