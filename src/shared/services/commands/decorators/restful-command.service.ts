import {Command, CommandResult} from '../command.service';
import {ExecutableCommand} from '../executable-command.service'
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from 'angular2/http';

export interface RestfulResource {
  name: string;
  value?: string;
}

export class RestfulCommand extends Command {
  private _resource: RestfulResource[] = [];
  constructor(private _delegate: ExecutableCommand) {
    super();
  }
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
  set method(method: RequestMethod) {
    this._delegate.method = method;
  }
  get method(): RequestMethod {
    return this._delegate.method;
  }
}
