import PUSH_SEARCH_RESULT from '../actions/actions';

import { data } from '../../data/data';

const initialState = {
  selectedCompany: [],
  data: data.company,
};

export default function reducers(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case PUSH_SEARCH_RESULT:
      return {
        ...state,
        selectedCompany: action.payload,
      };
    default:
      return state;
  }
}
