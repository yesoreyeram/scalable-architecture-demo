import {CommandBuilder} from './command-builder.service';
// import {RestfulCommand} from '../decorators/restful-command.service';
import {Gateway} from '../../gateways/gateway.service';

import {RestfulResource} from '../decorators/restful-command.service';
import {Injectable} from 'angular2/core';
import {RequestMethod} from 'angular2/http';

export interface RestfulCommandData {
  resource: RestfulResource;
  method: RequestMethod;
  payload?: any;
}

@Injectable()
export abstract class RestfulCommandBuilder extends CommandBuilder {
  private _resource: RestfulResource[];
  constructor(protected gateway: Gateway) {
    super(gateway);
  }
  setResource(resource: RestfulResource[]) {
    this._resource = resource;
  }
}
