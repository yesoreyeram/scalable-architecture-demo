import {Store} from '@ngrx/store';
import {Gateway} from '../gateways/gateway.service';

export interface SignUpData {

}

export interface SignInData {

}

export class ParentModel {
  constructor(private store: Store<any>, private gateway: Gateway<any>) {}
  signup(data: SignUpData) {

  }
  signin(data: SignInData) {

  }
}
