import {Store} from '@ngrx/store';
import {Gateway} from '../gateways/gateway.service';
import {CommandBuilder} from '../commands/builders/command-builder.service';

export interface SignUpData {

}

export interface SignInData {

}

export class ParentModel {
  constructor(private store: Store<any>, private builder: CommandBuilder) {}
  signup(data: SignUpData) {

  }
  signin(data: SignInData) {

  }
}
