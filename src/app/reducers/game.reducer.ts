import {initialState} from '../store/game.store';
import {Action} from '@ngrx/store';
import {COMPLETE_GAME} from '../actions/game.actions';
import {fromJS} from 'immutable';

export const gamesReducer = (state: any = initialState.get('games'), action: Action) => {
  switch (action.type) {
    case COMPLETE_GAME:
      state = state.push(fromJS(action.payload));
    break;
  }
  return state;
};
