import {Gateway} from '../gateways/gateway.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Command, CommandState} from './command.service';

export interface CommandResult {
  command: Command;
  payload: any;
}

export abstract class ExecutableCommand extends Command {
  private static _id: number = 0;
  protected _commands: Command[] = [];
  private _method: any;
  private _payload: any;
  private _gateway: Gateway;
  private _id: number = 0;
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
  invoke(context?: Command): Observable<CommandResult> {
    context = context || this;
    context.state = CommandState.EXECUTING;
    let result = new Observable<CommandResult>((observer: Observer<CommandResult>) => {
      this._gateway.send(context).subscribe(response => {
        context.state = CommandState.INVOKED;
        observer.next({
          command: context,
          payload: context.processResponse(response)
        });
      }, (error: any) => {
        debugger;
        observer.error(error);
      }, () => observer.complete());
    });
    return result;
  }
  abstract concat(command: Command): void;
  abstract serialize(): string | Blob | ArrayBuffer;
}
