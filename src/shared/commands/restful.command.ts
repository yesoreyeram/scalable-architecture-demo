import {Command} from './base.command';

export interface RestfulResource {
  name: string;
  value?: string;
}

export class RestfulCommand extends Command {
  private _resource: RestfulResource[] = [];
  setResource(resource: RestfulResource[]) {
    this._resource = resource;
  }
  get resource(): string {
    return this._resource.reduce((p, c) => `${p}/${c.name}/${c.value}`, '');
  }
  parse(response: any): any {
    return this._payload.parse(response);
  }
}
