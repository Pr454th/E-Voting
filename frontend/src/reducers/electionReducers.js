import {
  ELECTION_DETAILS_REQUEST,
  ELECTION_DETAILS_SUCCESS,
  ELECTION_DETAILS_FAIL,
  ELECTION_DETAILS_RESET,
  ELECTION_LIST_REQUEST,
  ELECTION_LIST_SUCCESS,
  ELECTION_LIST_FAIL,
  ELECTION_CREATE_REQUEST,
  ELECTION_CREATE_SUCCESS,
  ELECTION_CREATE_FAIL,
  ELECTION_CREATE_RESET,
  ELECTION_DELETE_REQUEST,
  ELECTION_DELETE_SUCCESS,
  ELECTION_DELETE_FAIL,
  ELECTION_UPDATE_REQUEST,
  ELECTION_UPDATE_SUCCESS,
  ELECTION_UPDATE_FAIL,
  ELECTION_UPDATE_RESET,
  ELECTION_ADD_CANDIDATE_REQUEST,
  ELECTION_ADD_CANDIDATE_SUCCESS,
  ELECTION_ADD_CANDIDATE_FAIL,
  ELECTION_ADD_CANDIDATE_RESET,
  ELECTION_DELETE_CANDIDATE_REQUEST,
  ELECTION_DELETE_CANDIDATE_SUCCESS,
  ELECTION_DELETE_CANDIDATE_FAIL,
  ELECTION_DELETE_CANDIDATE_RESET,
  ELECTION_ADD_VOTER_REQUEST,
  ELECTION_ADD_VOTER_SUCCESS,
  ELECTION_ADD_VOTER_FAIL,
  ELECTION_ADD_VOTER_RESET,
  ELECTION_DELETE_VOTER_REQUEST,
  ELECTION_DELETE_VOTER_FAIL,
  ELECTION_DELETE_VOTER_SUCCESS,
  ELECTION_DELETE_VOTER_RESET,
  ELECTION_START_REQUEST,
  ELECTION_START_SUCCESS,
  ELECTION_START_FAIL,
  ELECTION_START_RESET,
  ELECTION_FINISH_REQUEST,
  ELECTION_FINISH_SUCCESS,
  ELECTION_FINISH_FAIL,
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

export const electionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_CREATE_REQUEST:
      return { loading: true };
    case ELECTION_CREATE_SUCCESS:
      return { loading: false, success: true, election: action.payload };
    case ELECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_CREATE_RESET:
      return {};
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

export const electionAddCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_ADD_CANDIDATE_REQUEST:
      return { loading: true };
    case ELECTION_ADD_CANDIDATE_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_ADD_CANDIDATE_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_ADD_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const electionDeleteCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_DELETE_CANDIDATE_REQUEST:
      return { loading: true };
    case ELECTION_DELETE_CANDIDATE_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_DELETE_CANDIDATE_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_DELETE_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const electionAddVoterReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_ADD_VOTER_REQUEST:
      return { loading: true };
    case ELECTION_ADD_VOTER_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_ADD_VOTER_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_ADD_VOTER_RESET:
      return {};
    default:
      return state;
  }
};

export const electionDeleteVoterReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_DELETE_VOTER_REQUEST:
      return { loading: true };
    case ELECTION_DELETE_VOTER_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_DELETE_VOTER_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_DELETE_VOTER_RESET:
      return {};
    default:
      return state;
  }
};

export const electionStartReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_START_REQUEST:
      return { loading: true };
    case ELECTION_START_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_START_FAIL:
      return { loading: false, error: action.payload };
    case ELECTION_START_RESET:
      return {};
    default:
      return state;
  }
};

export const electionFinishReducer = (state = {}, action) => {
  switch (action.type) {
    case ELECTION_FINISH_REQUEST:
      return { loading: true };
    case ELECTION_FINISH_SUCCESS:
      return { loading: false, success: true };
    case ELECTION_FINISH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
