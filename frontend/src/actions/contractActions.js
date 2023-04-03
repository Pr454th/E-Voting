import {
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_DETAILS_FAIL,
} from "../constants/contractConstants";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

export const getContract = () => async (dispatch) => {
  try {
    dispatch({ type: CONTRACT_DETAILS_REQUEST });

    const sdk = new ThirdwebSDK("mumbai");
    const contract = await sdk.getContract(
      "0xf61eE0665Ee019a96a04DD34B998356377683aF6"
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
