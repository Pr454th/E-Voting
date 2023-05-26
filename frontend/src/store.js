import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  electionDetailsReducer,
  electionListReducer,
  electionCreateReducer,
  electionDeleteReducer,
  electionUpdateReducer,
  electionAddCandidateReducer,
  electionDeleteCandidateReducer,
  electionStartReducer,
  electionFinishReducer,
  electionAddVoterReducer,
  electionDeleteVoterReducer,
} from "./reducers/electionReducers";
import { contractDetailsReducer } from "./reducers/contractReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  electionDetails: electionDetailsReducer,
  electionList: electionListReducer,
  electionCreate: electionCreateReducer,
  electionDelete: electionDeleteReducer,
  electionUpdate: electionUpdateReducer,
  electionStart: electionStartReducer,
  electionFinish: electionFinishReducer,
  electionAddCandidate: electionAddCandidateReducer,
  electionDeleteCandidate: electionDeleteCandidateReducer,
  electionAddVoter: electionAddVoterReducer,
  electionDeleteVoter: electionDeleteVoterReducer,
  contractDetails: contractDetailsReducer,
});

const initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
