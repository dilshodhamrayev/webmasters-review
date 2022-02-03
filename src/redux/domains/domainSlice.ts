import { createSlice } from "@reduxjs/toolkit";
import { fetchRegions, fetchDomains } from "./thunks";
import { postRequest, getRequest } from "../rootThunk";


// Define a type for the slice state
interface AuthState {
  regions: any;
  domains: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  regions: [],
  domains: [],
};

export const domainSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRegions.fulfilled.toString()]: (state, action) => {
      state.regions = action.payload.data;
    },
    [postRequest.fulfilled.toString()]: (state, action) => {
      const payload = action.payload;
      state[payload.value] = action.payload.res;
    },
    [getRequest.fulfilled.toString()]: (state, action) => {
      const payload = action.payload;
      state[payload.value] = action.payload.res;
    },
  },
});

export default domainSlice.reducer;
