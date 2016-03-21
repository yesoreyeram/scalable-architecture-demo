import {Store} from '@ngrx/store';
import {Model} from './base.model';
import {Guest} from '../store/bp-store';
import {Gateway} from '../gateways/gateway.service';
import {Observable} from 'rxjs/Observable';

export class GuestModel extends Model<Guest> {
  constructor(private ngRxStore: Store<any>, private gateway: Gateway<any>) {
    super();
    this._store = ngRxStore.select('guest');
  }
  getToken(): Observable<any> {
    return null;
  }
}
