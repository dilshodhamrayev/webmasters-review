import { createSlice } from "@reduxjs/toolkit";
import { fetchRegions, getRequest } from "./thunks";

// Define a type for the slice state
interface AuthState {
  regions: any;
  streams: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  regions: [],
  streams: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: {
    [getRequest.fulfilled.toString()]: (state, action) => {
      const payload = action.payload;
      state[payload.value] = action.payload.res;
    },
    [fetchRegions.fulfilled.toString()]: (state, action) => {
      state.regions = action.payload.data;
    }
  },
});

export default globalSlice.reducer;
