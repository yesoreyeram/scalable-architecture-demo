import {Observable} from 'rxjs/Observable';

export interface CommandResult {
  command: Command;
  payload: any;
}

export abstract class Command {
  abstract invoke(): Observable<CommandResult>;
  abstract concat(command: Command): void;
  abstract serialize(): string | Blob | ArrayBuffer;
}
