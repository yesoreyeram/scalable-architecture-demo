import {PARTNER_PROGRESS} from '../p2p-game.actions';
import {Action} from '@ngrx/store';

export const P2PGameActions = {
  partnerProgress(text: string): Action {
    return {
      payload: {text},
      type: PARTNER_PROGRESS
    };
  }
};
