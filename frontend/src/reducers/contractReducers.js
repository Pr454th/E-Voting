import {
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_DETAILS_FAIL,
} from "../constants/contractConstants";

export const contractDetailsReducer = (state = { contract: {} }, action) => {
  switch (action.type) {
    case CONTRACT_DETAILS_REQUEST:
      return { loading: true };
    case CONTRACT_DETAILS_SUCCESS:
      return { loading: false, contract: action.payload };
    case CONTRACT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
