import {CommandBuilder} from './command-builder.service';
// import {RestfulCommand} from '../decorators/restful-command.service';
import {Gateway} from '../../gateways/gateway.service';

// import {RestfulResource} from '../decorators/restful-command.service';
import {Injectable} from 'angular2/core';

@Injectable()
export class RestfulCommandBuilder extends CommandBuilder {
  // private _resource: RestfulResource[];
  constructor(protected gateway: Gateway) {
    super(gateway);
  }
  // setResource(resource: RestfulResource[]) {
  //   this._resource = resource;
  // }
  build(): any {
    // let basecmd = new this.baseCommandType();
    // basecmd.gateway = this.gateway;
    // basecmd.method = this._payload;
    // basecmd.method = this._method;
    // let command = new RestfulCommand(basecmd);
    // command.setResource(this._resource);
    // return command;
    return null;
  }
}
