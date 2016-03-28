import {initialState} from '../store/bp-store';
import {Action} from '@ngrx/store';
import * as ParentActions from '../actions/actions';

export const parentReducer = (state = <any>initialState.get('parent'), action: Action) => {
  switch (action.type) {
    case ParentActions.SIGNUP_PARENT:
      state = state.set('email', action.payload.email);
    break;
  }
  return state;
};
