import {Command} from '../commands/command.service';

export abstract class JsonCommand {
  protected _commands: Command[];
  private _method: string;
  public get method(): string {
    return this._method;
  }
  public set method(value: string) {
    this._method = value;
  }
  abstract concat(command: Command): void;
  abstract serialize(): string | Blob | ArrayBuffer;
}
