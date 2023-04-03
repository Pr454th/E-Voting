import {
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_DETAILS_FAIL,
} from "../constants/walletConstants";

export const storeWalletDetails = (add, bal) => async (dispatch) => {
  try {
    dispatch({
      type: WALLET_DETAILS_REQUEST,
    });

    const data = { isConnected: true, address: add, balance: bal };
    dispatch({
      type: WALLET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WALLET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
