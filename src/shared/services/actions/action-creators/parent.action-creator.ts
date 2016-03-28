import {Action} from '@ngrx/store';

import {
  SIGNIN_PARENT,
  SIGNUP_PARENT,
  GET_GUEST_TOKEN
} from '../parent.actions';

export const ParentActions = {
  getGuestToken(): Action {
    return {
      type: GET_GUEST_TOKEN
    };
  },
  signIn(email: string, password: string): Action {
    return {
      payload: { email, password },
      type: SIGNIN_PARENT
    };
  },
  signUp(email: string, password: string): Action {
    return {
      payload: { email, password },
      type: SIGNUP_PARENT
    };
  }
};
