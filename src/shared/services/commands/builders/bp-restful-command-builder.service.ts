import {RestfulCommandBuilder, RestfulCommandData} from './restful-command-builder.service';
import {Injectable} from 'angular2/core';
import {RestfulCommand} from '../decorators/restful-command.service';
import {RequestMethod} from 'angular2/http';

const BP_REST_MAPPER = {
  'set-email'(payload: any): RestfulCommandData {
    return {
      method: RequestMethod.Put,
      resource: { name: 'parent', value: payload.id },
      payload: {
        email: payload.email
      }
    };
  }
};

@Injectable()
export class RestfulBpCommandBulider extends RestfulCommandBuilder {
  build(): RestfulCommand {
    const mapper = BP_REST_MAPPER[this._method];
    if (mapper) {
      return mapper(this._payload);
    } else {
      throw new Error('Unknown method for handling');
    }
  }
}
