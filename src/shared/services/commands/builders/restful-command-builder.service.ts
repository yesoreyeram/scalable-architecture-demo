import {CommandBuilder} from './command-builder.service';

import {RestfulResource} from '../decorators/restful-command.service';
import {RequestMethod} from 'angular2/http';


export interface RestfulCommandData {
  resource: RestfulResource;
  method: RequestMethod;
  payload?: any;
}

export abstract class RestfulCommandBuilder extends CommandBuilder {
  private _resource: RestfulResource[];
  setResource(resource: RestfulResource[]) {
    this._resource = resource;
  }
}
