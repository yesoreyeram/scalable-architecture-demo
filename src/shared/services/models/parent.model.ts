import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Parent} from '../store/bp-store';
import {Observable} from 'rxjs/Observable';
import {CommandBuilder} from '../commands/builders/command-builder.service';

@Injectable()
export class ParentModel {
  parent$: Observable<Parent>;
  constructor(private store: Store<Parent>, private builder: CommandBuilder) {
    this.parent$ = store.select('parent');
  }
  setEmail(email: string) {
    this.store.next({
      type: 'set-email',
      payload: { email }
    });
  }
}
