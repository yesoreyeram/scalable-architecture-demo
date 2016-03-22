import {Command} from '../command.service';

export abstract class CommandBuilder {
  protected _method: string;
  protected _payload: any;
  setMethod(method: any): this {
    this._method = method;
    return this;
  }
  setPayload(payload: any): this {
    this._payload = payload;
    return this;
  }
  abstract build(): Command;
}
