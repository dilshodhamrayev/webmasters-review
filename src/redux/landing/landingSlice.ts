import { createSlice } from "@reduxjs/toolkit";
import { fetchDemos } from "./thunks";

// Define a type for the slice state
interface AuthState {
  demos: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  demos: [],
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDemos.fulfilled.toString()]: (state, action) => {
      state.demos = action.payload.data;
    },
  },
});

export default landingSlice.reducer;
