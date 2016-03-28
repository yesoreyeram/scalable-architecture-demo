import {Action} from '@ngrx/store';

import {
  SIGNIN_PARENT,
  SIGNUP_PARENT
} from '../parent.actions';

export const ParentActions = {
  signin(email: string, password: string): Action {
    return {
      payload: { email, password },
      type: SIGNIN_PARENT
    };
  },
  signup(email: string, password: string): Action {
    return {
      payload: { email, password },
      type: SIGNUP_PARENT
    };
  }
};
