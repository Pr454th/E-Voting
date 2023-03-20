import {
  ELECTION_DETAILS_REQUEST,
  ELECTION_DETAILS_SUCCESS,
  ELECTION_DETAILS_FAIL,
  ELECTION_DETAILS_RESET,
  ELECTION_LIST_REQUEST,
  ELECTION_LIST_SUCCESS,
  ELECTION_LIST_FAIL,
} from "../constants/electionConstants";

export const electionListReducer = (state = { elections: [] }, action) => {
  switch (action.type) {
    case ELECTION_LIST_REQUEST:
      return { ...state, loading: true };
    case ELECTION_LIST_SUCCESS:
      return { loading: false, elections: action.payload };
    case ELECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const electionDetailsReducer = (state = { election: {} }, action) => {
  switch (action.type) {
    case ELECTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ELECTION_DETAILS_SUCCESS:
      return { loading: false, election: action.payload };
    case ELECTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_DETAILS_RESET:
      return { election: {} };
    default:
      return state;
  }
};
