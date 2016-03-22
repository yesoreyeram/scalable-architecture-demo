import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CommandBuilder} from '../commands/builders/command-builder.service';

export abstract class RemoteService {
  constructor(protected builder: CommandBuilder) {}
  process(data: Action): Observable<any> {
    return this.builder
      .setMethod(data.type)
      .setPayload(data.payload)
      .build()
      .invoke();
  }
}
