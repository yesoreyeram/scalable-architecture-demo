import {AsyncService} from './../base.async-service';
import {Injectable, Inject} from 'angular2/core';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {CommandResult} from '../../commands/base.command.ts';
import {RestfulCommand} from '../../commands/restful.command';
import {RestfulGateway} from '../../gateways/restful.gateway';
import {RestfulCommandBuilder, BP_RESTFUL_COMMAND_BUILDERS} from './command-builders/index';

@Injectable()
export class BpRestfulService extends AsyncService {
  constructor(protected gateway: RestfulGateway,
              @Inject(BP_RESTFUL_COMMAND_BUILDERS) protected builders: Map<string, RestfulCommandBuilder>) {
    super();
  }
  process(action: Action) {
    let result = new Observable<CommandResult>((observer: Observer<any>) => {
      const command = new RestfulCommand();
      command.gateway = this.gateway;
      const builder = this.builders.get(action.type);
      if (builder) {
        builder(action.payload, command)
          .invoke().subscribe((response: any) => {
          // Should be mapped to app specific data here
          observer.next(response.payload);
        }, (error: any) => {
          observer.error(error);
        }, () => observer.complete());
      } else {
        throw new Error(`No command for ${action.type}.`);
      }
    });
    return result;
  }
}

