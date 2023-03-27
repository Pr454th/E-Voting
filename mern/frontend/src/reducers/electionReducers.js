import {
  ELECTION_DETAILS_REQUEST,
  ELECTION_DETAILS_SUCCESS,
  ELECTION_DETAILS_FAIL,
  ELECTION_DETAILS_RESET,
  ELECTION_LIST_REQUEST,
  ELECTION_LIST_SUCCESS,
  ELECTION_LIST_FAIL,
  ELECTION_DELETE_REQUEST,
  ELECTION_DELETE_SUCCESS,
  ELECTION_DELETE_FAIL,
  ELECTION_UPDATE_REQUEST,
  ELECTION_UPDATE_SUCCESS,
  ELECTION_UPDATE_FAIL,
  ELECTION_UPDATE_RESET,
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

export const electionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_DELETE_REQUEST:
      return { loading: true };
    case ELECTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const electionUpdateReducer = (state = { election: {} }, action) => {
  switch (action.type) {
    case ELECTION_UPDATE_REQUEST:
      return { loading: true };
    case ELECTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_UPDATE_RESET:
      return { election: {} };
    default:
      return state;
  }
};
