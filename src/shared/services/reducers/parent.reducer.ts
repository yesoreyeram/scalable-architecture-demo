import {initialState} from '../store/bp-store';
import {Action} from '@ngrx/store';

export const parentReducer = (state = <any>initialState.get('parent'), action: Action) => {
  switch (action.type) {
    case 'set-email':
      state = state.set('email', action.payload.email);
    break;
  }
  return state;
};
