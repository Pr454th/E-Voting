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
} from "./reducers/electionReducers";
import { walletDetailsReducer } from "./reducers/walletReducers";
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
  walletDetails: walletDetailsReducer,
  contractDetails: contractDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
