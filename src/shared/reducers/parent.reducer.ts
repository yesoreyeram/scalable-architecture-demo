import {initialState} from '../store/bp-store';
import {Action} from '@ngrx/store';
import * as ParentActions from '../actions/index';

export const parentReducer = (state = <any>initialState.get('parent'), action: Action) => {
  const p = action.payload;
  switch (action.type) {
    case ParentActions.SIGNIN_PARENT:
      state = state.set('email', p.email).set('isLogged', true).set('token', action.payload.jwt);
    break;
    case ParentActions.SIGNUP_PARENT:
      state = state.set('email', p.email).set('name', p.name);
    break;
    case ParentActions.GET_GUEST_TOKEN:
      state = state.set('token', action.payload.jwt);
    break;
  }
  return state;
};
