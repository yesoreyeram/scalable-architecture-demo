/// <reference path="../../../node_modules/immutable/dist/immutable.d.ts"/>

import {fromJS, Map} from 'immutable';

export const initialState: Map<string, Object> = fromJS({
  games: [],
  partnerText: ''
});
