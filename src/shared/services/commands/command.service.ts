import {Observable} from 'rxjs/Observable';

export enum CommandState {
  IDLE,
  EXECUTING,
  INVOKED
};

export interface CommandResult {
  command: Command;
  payload: any;
}

export abstract class Command {
  protected _state: CommandState;
  set state(value: CommandState) {
    this._state = value;
  }
  get state(): CommandState {
    return this._state;
  }
  abstract invoke(): Observable<CommandResult>;
  abstract concat(command: Command): void;
  abstract serialize(): string | Blob | ArrayBuffer;
  abstract processResponse(response: any): string | Blob | ArrayBuffer;
}
