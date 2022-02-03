import { createSlice } from "@reduxjs/toolkit";
import { signup, login, update } from "./thunks";

// Define a type for the slice state
interface AuthState {
  user: object | null;
  token: string | null;
  authenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
  authenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
    },
  },
  extraReducers: {
    [signup.fulfilled.toString()]: (state, action) => {
      state.token = action.payload.data.token;
    },
    [login.fulfilled.toString()]: (state, action) => {
      const data = action.payload?.data;
      state.authenticated = true;
      state.user = data?.user;
      state.token = data?.token;
    },
    [update.fulfilled.toString()]: (state, action) => {
      const data = action.payload?.data;
      state.user = data?.user;
      state.token = data?.token;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
