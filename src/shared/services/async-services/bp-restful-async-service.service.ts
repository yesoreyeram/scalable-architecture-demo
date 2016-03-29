import {AsyncService} from './async-service.service';
import {BpRestfulCommandBuilder} from '../commands/builders/bp-restful-command-builder.service';
import {Injectable} from 'angular2/core';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {CommandResult} from '../commands/executable-command.service';

@Injectable()
export class BpRestfulService extends AsyncService {
  constructor(protected builder: BpRestfulCommandBuilder) {
    super();
  }
  process(action: Action) {
    let result = new Observable<CommandResult>((observer: Observer<any>) => {
      this.builder.build(action)
        .invoke().subscribe(response => {
          // Should be mapped to app specific data here
          const restfulPayload = response.payload;
          if (response.payload.code >= 200 && response.payload.code <= 299) {
            observer.next(restfulPayload.payload);
          } else {
            observer.error(restfulPayload.payload);
          }
        }, (error: any) => {
          observer.error(error);
        }, () => observer.complete());
    });
    return result;
  }
}

