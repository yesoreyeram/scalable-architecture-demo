import {Command} from '../commands/base.command';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import 'rxjs/add/operator/share';

export abstract class Gateway {
  dataStream: Observable<any>;
  connectionEvents: Observable<boolean>;
  protected _emitter: Observer<any>;
  protected _connectionEventsEmitter: Observer<boolean>;
  constructor() {
    this.dataStream = new Observable<any>((emitter: Observer<any>) => {
      this._emitter = emitter;
    }).share();
    this.connectionEvents = new Observable<boolean>((obs: Observer<boolean>) => {
      this._connectionEventsEmitter = obs;
    }).share();
  }
  abstract send(command: Command): any;
}
