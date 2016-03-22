import {CommandBuilder} from './command-builder.service';
// import {RestfulCommand} from '../decorators/restful-command.service';
import {RestfulGateway} from '../../gateways/restful-gateway.service';

import {RestfulResource} from '../decorators/restful-command.service';
import {RequestMethod} from 'angular2/http';
import {Injectable} from 'angular2/core';


export interface RestfulCommandData {
  resource: RestfulResource;
  method: RequestMethod;
  payload?: any;
}

@Injectable()
export abstract class RestfulCommandBuilder extends CommandBuilder {
  private _resource: RestfulResource[];
  constructor(protected gateway: RestfulGateway) {
    super();
    debugger;
  }
  setResource(resource: RestfulResource[]) {
    this._resource = resource;
  }
}
