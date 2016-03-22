import {Command} from '../command.service';
import {denormalize} from 'data-adapter';
import {Gateway} from '../../gateways/gateway.service';

export abstract class CommandBuilder {
  protected _method: string;
  protected _payload: any;
  constructor(protected gateway: Gateway) {}
  setMethod(method: any): this {
    this._method = method;
    return this;
  }
  setPayload(payload: Object, type: Function): this {
    this._payload = denormalize(payload, type);
    return this;
  }
  abstract build(): Command;
}
