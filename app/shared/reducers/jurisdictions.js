import * as types from '../actions/types';

const initialState = {
  loading: false,
  jurisdictions: [],
};

export default function jurisdictions(state = initialState, action) {

  const { type } = action;
  let matches = /^GET_JURISDICTION_(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  let requestName;
  let requestState;
  if (matches) {
    requestName = matches[1];
    requestState = matches[2];
  }

  switch (action.type) {
    case types.GET_JURISDICTION_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        [requestName]: requestState,
        jurisdictions: action.payload.jurisdictions
      };
    }
    case types.GET_JURISDICTION_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
      };
    }
    case types.GET_JURISDICTION_PRODUCER_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_PRODUCER_SUCCESS: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
        producer: action.payload.producer,
        producer_jurisdictions: action.payload.producer_jurisdictions
      };
    }
    case types.GET_JURISDICTION_PRODUCER_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
