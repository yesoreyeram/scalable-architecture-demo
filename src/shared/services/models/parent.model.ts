import {Injectable, Inject} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp-store';
import {RemoteService} from '../remote-services/remote-service.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class ParentModel {
  parent$: Observable<Parent>;
  constructor(private store: Store<Parent>, @Inject(RemoteService) private services: RemoteService[]) {
    this.parent$ = store.select('parent');
  }
  register() {

  }
  login() {

  }
  setEmail(email: string) {
    let action = {
      type: 'set-email',
      payload: { email }
    };
    Observable.forkJoin(this.services.map(res => res.process(action)))
      .subscribe(() => this.store.next(action), (e: any) => console.error(e));
  }
}
