import axios from "axios";
import {
  ELECTION_DETAILS_REQUEST,
  ELECTION_DETAILS_SUCCESS,
  ELECTION_DETAILS_FAIL,
  ELECTION_LIST_REQUEST,
  ELECTION_LIST_SUCCESS,
  ELECTION_LIST_FAIL,
} from "../constants/electionConstants";

export const listElections =
  (keyword = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ELECTION_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/elections?keyword=${keyword}`,
        config
      );

      dispatch({
        type: ELECTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ELECTION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listElectionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELECTION_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/elections/${id}`, config);

    dispatch({
      type: ELECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
