import {Action} from '@ngrx/store';

import {
  COMPLETE_GAME
} from '../game.actions';

export const GameActions = {
  completeGame(time: number, text: string): Action {
    return {
      payload: { text, time },
      type: COMPLETE_GAME
    };
  }
};
