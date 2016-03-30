import {initialState} from '../store/bp.store';
import {Action} from '@ngrx/store';
import {LOAD_KIDS, CREATE_KID} from '../actions/kid.actions';
import * as Immutable from 'immutable';

export const kidReducer = (state = <any>initialState.get('kids'), action: Action) => {
  const p = action.payload;
  switch (action.type) {
    case LOAD_KIDS:
      state = Immutable.fromJS(p);
    break;
    case CREATE_KID:
      state = state.push(Immutable.fromJS(p));
    break;
  }
  return state;
};
