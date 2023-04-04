import axios from "axios";
import {
  ELECTION_DETAILS_REQUEST,
  ELECTION_DETAILS_SUCCESS,
  ELECTION_DETAILS_FAIL,
  ELECTION_LIST_REQUEST,
  ELECTION_LIST_SUCCESS,
  ELECTION_LIST_FAIL,
  ELECTION_CREATE_REQUEST,
  ELECTION_CREATE_SUCCESS,
  ELECTION_CREATE_FAIL,
  ELECTION_DELETE_FAIL,
  ELECTION_DELETE_REQUEST,
  ELECTION_DELETE_SUCCESS,
  ELECTION_UPDATE_FAIL,
  ELECTION_UPDATE_REQUEST,
  ELECTION_UPDATE_SUCCESS,
  ELECTION_ADD_CANDIDATE_REQUEST,
  ELECTION_ADD_CANDIDATE_SUCCESS,
  ELECTION_ADD_CANDIDATE_FAIL,
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

export const createElection =
  (name, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ELECTION_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/elections`,
        { name, description },
        config
      );

      dispatch({
        type: ELECTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ELECTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteElection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELECTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/elections/${id}`, config);

    dispatch({
      type: ELECTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateElection = (election) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELECTION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/elections/${election._id}`,
      election,
      config
    );

    dispatch({
      type: ELECTION_UPDATE_SUCCESS,
    });

    dispatch({
      type: ELECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCandidateToElection =
  (id, email, description, address) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ELECTION_ADD_CANDIDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/elections/addcandidate/${id}`,
        { id, email, description, address },
        config
      );

      dispatch({
        type: ELECTION_ADD_CANDIDATE_SUCCESS,
      });

      dispatch({
        type: ELECTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ELECTION_ADD_CANDIDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
