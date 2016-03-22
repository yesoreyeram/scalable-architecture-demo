import {Command} from '../command.service';
import {Gateway} from '../../gateways/gateway.service';
import {Injectable} from 'angular2/core';

@Injectable()
export abstract class CommandBuilder {
  protected _method: string;
  protected _payload: any;
  constructor(protected gateway: Gateway) {}
  setMethod(method: any): this {
    this._method = method;
    return this;
  }
  setPayload(payload: Object): this {
    return this;
  }
  abstract build(): Command;
}
