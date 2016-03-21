import {Command} from '../command.service';
import {denormalize} from 'data-adapter';
import {Gateway} from '../../gateways/gateway.service';

export abstract class CommandBuilder {
  protected _method: string;
  protected _payload: any;
  constructor(protected gateway: Gateway) {}
  setMethod(method: string): void {
    this._method = method;
  }
  setPayload(payload: Object, type: Function): void {
    this._payload = denormalize(payload, type);
  }
  abstract build(): Command;
}
