import {Action} from '@ngrx/store';
import {LOAD_KIDS, CREATE_KID} from '../kid.actions';
import {Kid} from '../../store/bp.store';

export const KidActions = {
  getKids(): Action {
    return {
      type: LOAD_KIDS
    };
  },
  createKid(kid: Kid): Action {
    return {
      type: CREATE_KID,
      payload: kid
    };
  }
};
