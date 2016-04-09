import {Action} from '@ngrx/store';

import {
  COMPLETE_GAME, GAME_PROGRESS, INVALID_GAME, START_GAME, PARTNER_PROGRESS
} from '../game.actions';

export const GameActions = {
  completeGame(time: number, text: string): Action {
    return {
      payload: { text, time },
      type: COMPLETE_GAME
    };
  },
  gameProgress(prevText: string, text: string, time: Date): Action {
    return {
      payload: { text, time, prevText },
      type: GAME_PROGRESS
    };
  },
  invalidateGame(): Action {
    return {
      payload: null,
      type: INVALID_GAME
    };
  },
  startGame(): Action {
    return {
      payload: null,
      type: START_GAME
    };
  },
  partnerProgress(text: string): Action {
    return {
      payload: { text },
      type: PARTNER_PROGRESS
    };
  }
};
