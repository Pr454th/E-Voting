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
  ELECTION_DELETE_CANDIDATE_REQUEST,
  ELECTION_DELETE_CANDIDATE_SUCCESS,
  ELECTION_DELETE_CANDIDATE_FAIL,
  ELECTION_START_REQUEST,
  ELECTION_START_SUCCESS,
  ELECTION_START_FAIL,
  ELECTION_FINISH_REQUEST,
  ELECTION_FINISH_SUCCESS,
  ELECTION_FINISH_FAIL,
  ELECTION_ADD_VOTER_REQUEST,
  ELECTION_ADD_VOTER_FAIL,
  ELECTION_ADD_VOTER_SUCCESS,
  ELECTION_DELETE_VOTER_REQUEST,
  ELECTION_DELETE_VOTER_SUCCESS,
  ELECTION_DELETE_VOTER_FAIL,
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

export const addElection =
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

      dispatch({
        type: ELECTION_DETAILS_SUCCESS,
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
  (id, email, address) => async (dispatch, getState) => {
    try {
      if (email === "") {
        dispatch({
          type: ELECTION_ADD_CANDIDATE_FAIL,
          payload: "Email is required",
        });
        return;
      }

      if (address === "") {
        dispatch({
          type: ELECTION_ADD_CANDIDATE_FAIL,
          payload: "Address is required",
        });
        return;
      }

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
        { id, email, address },
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

export const deleteCandidateFromElection =
  (address, _id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ELECTION_DELETE_CANDIDATE_REQUEST,
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
        `/api/elections/deletecandidate/${_id}`,
        { address },
        config
      );

      dispatch({
        type: ELECTION_DELETE_CANDIDATE_SUCCESS,
      });

      dispatch({
        type: ELECTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ELECTION_DELETE_CANDIDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addVoterToElection = (id, email) => async (dispatch, getState) => {
  try {
    if (email === "") {
      dispatch({
        type: ELECTION_ADD_VOTER_FAIL,
        payload: "Email is required",
      });
      return;
    }

    dispatch({
      type: ELECTION_ADD_VOTER_REQUEST,
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
      `/api/elections/addvoter/${id}`,
      { id, email },
      config
    );

    dispatch({
      type: ELECTION_ADD_VOTER_SUCCESS,
    });

    dispatch({
      type: ELECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_ADD_VOTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVoterFromElection =
  (email, _id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ELECTION_DELETE_VOTER_REQUEST,
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
        `/api/elections/deletevoter/${_id}`,
        { email },
        config
      );

      dispatch({
        type: ELECTION_DELETE_VOTER_SUCCESS,
      });

      dispatch({
        type: ELECTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ELECTION_DELETE_VOTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const startElection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELECTION_START_REQUEST,
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

    const { data } = await axios.put(`/api/elections/start/${id}`, {}, config);

    dispatch({
      type: ELECTION_START_SUCCESS,
    });

    dispatch({
      type: ELECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_START_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const finishElection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELECTION_FINISH_REQUEST,
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

    const { data } = await axios.put(`/api/elections/finish/${id}`, {}, config);

    dispatch({
      type: ELECTION_FINISH_SUCCESS,
    });

    dispatch({
      type: ELECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELECTION_FINISH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
