import {Command, CommandResult} from '../command.service';
import {Observable} from 'rxjs/Observable';

export interface RestfulResource {
  name: string;
  value?: string;
}

export class RestfulCommand extends Command {
  private _resource: RestfulResource[] = [];
  constructor(private _delegate: ExecutableCommand) {}
  setResource(resource: RestfulResource[]) {
    this._resource = resource;
  }
  get resource(): string {
    return this._resource.reduce((p, c) => `${p}/${c.name}/${c.value}`, '');
  }
  invoke(): Observable<CommandResult> {
    return this._delegate.invoke();
  }
  serialize() {
    return this._delegate.serialize();
  }
  concat(command: Command) {
    return this._delegate.concat(command);
  }
  set method(method: string) {
    this._delegate.method = method;
  }
  get method(): string {
    return this._delegate.method;
  }
}
