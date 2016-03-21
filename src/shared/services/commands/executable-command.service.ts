import {Gateway} from '../gateways/gateway.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Command} from './command.service';

export interface CommandResult {
  command: Command;
  payload: any;
}

export enum CommandState {
  IDLE,
  EXECUTING,
  INVOKED
};

export abstract class ExecutableCommand extends Command {
  protected _commands: Command[];
  private _method: any;
  private _payload: any;
  private _gateway: Gateway;
  private _id: number = 0;
  private _state: CommandState = CommandState.IDLE
  private static _id: number = 0;
  constructor() {
    super();
    ExecutableCommand._id += 1;
    this._id = ExecutableCommand._id;
  }
  public get id(): number {
    return this._id;
  }
  public get payload(): any {
    return this._payload;
  }
  public set payload(value: any) {
    this._payload = value;
  }
  public get method(): any {
    return this._method;
  }
  public set method(value: any) {
    this._method = value;
  }
  public set gateway(value: Gateway) {
    this._gateway = value;
  }
  invoke(): Observable<CommandResult> {
    this._state = CommandState.EXECUTING;
    let result = new Observable<CommandResult>((result: Observer<CommandResult>) => {
      this._gateway.send(this).subscribe(response => {
        this._state = CommandState.INVOKED;
        result.next({
          command: this,
          payload: response
        });
      });
    });
    return result;
  }
  abstract concat(command: Command): void;
  abstract serialize(): string | Blob | ArrayBuffer;
}
