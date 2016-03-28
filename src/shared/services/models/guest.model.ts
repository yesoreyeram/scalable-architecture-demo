import {Store} from '@ngrx/store';
import {Model} from './base.model';
import {CommandBuilder} from '../commands/builders/command-builder.service';
// import {Observable} from 'rxjs/Observable';
// import {RequestMethod} from 'angular2/http';

export class GuestModel extends Model {
  constructor(private ngRxStore: Store<any>, private builder: CommandBuilder) {
    super();
  }
  // getToken(): Observable<any> {
  //   return this.builder
  //     .setMethod(RequestMethod.Get)
  //     .setPayload({

  //     }, Guest)
  //     .build()
  //     .invoke();
  // }
}
