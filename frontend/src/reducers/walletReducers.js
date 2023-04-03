import {
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_DETAILS_FAIL,
  WALLET_DETAILS_RESET,
} from "../constants/walletConstants";

export const walletDetailsReducer = (state = { wallet: {} }, action) => {
  switch (action.type) {
    case WALLET_DETAILS_REQUEST:
      return { ...state, loading: true };
    case WALLET_DETAILS_SUCCESS:
      return { loading: false, wallet: action.payload };
    case WALLET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_DETAILS_RESET:
      return { wallet: {} };
    default:
      return state;
  }
};
