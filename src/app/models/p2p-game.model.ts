import {Injectable} from 'angular2/core';
import {Model} from './base.model';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class P2PGameModel extends Model {
  p2pGame$: Observable<string>;
  constructor(protected _store: Store<any>) {
    super([]);
    this.p2pGame$ = this._store.select('p2pGame');
  }
}
