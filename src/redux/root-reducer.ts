import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import landingReducer from "./landing/landingSlice";
import globalReducer from "./global/globalSlice";
import domainReducer from "./domains/domainSlice";


const rootReducer = combineReducers({
  authReducer,
  landingReducer,
  globalReducer,
  domainReducer
});

export default rootReducer;
