import {initialState} from '../store/game.store';
import {Action} from '@ngrx/store';
import {COMPLETE_GAME, INVALID_GAME, START_GAME} from '../actions/game.actions';
import {fromJS} from 'immutable';

export const gamesReducer = (state: any = initialState.get('games'), action: Action) => {
  switch (action.type) {
    case COMPLETE_GAME:
      state = state.push(fromJS(action.payload));
    break;
  }
  return state;
};

export const gameReducer = (state: any = initialState.get('game'), action: Action) => {
  switch (action.type) {
    case START_GAME:
      state = fromJS({});
    break;
    case INVALID_GAME:
      state = state.set('invalid', true);
    break;
  }
  return state;
};
