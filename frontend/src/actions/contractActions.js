import {
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_DETAILS_FAIL,
} from "../constants/contractConstants";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const getContract = () => async (dispatch) => {
  try {
    dispatch({ type: CONTRACT_DETAILS_REQUEST });

    const sdk = new ThirdwebSDK("mumbai", {
      clientId: process.env.REACT_APP_CLIENT_ID,
    });
    const contract = await sdk.getContract(
      process.env.REACT_APP_CONTRACT_ADDRESS
    );

    dispatch({
      type: CONTRACT_DETAILS_SUCCESS,
      payload: contract,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
