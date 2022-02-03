import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

// POST REQUEST
const postRequestAsync = async (params, { rejectWithValue }) => {
    console.log("FIRED")
    try {
      const res = await axios({
        url: params.url,
        method: "POST",
        data: params.data
      });
      return {value: params.value, res: res.data};
    } catch (err) {
      return rejectWithValue([], err);
    }
  };

  export const postRequest = createAsyncThunk(
    "global/postRequest",
    postRequestAsync
  );
  
  // GET REQUEST
const getRequestAsync = async (params, { rejectWithValue }) => {
  console.log("FIRED")
  try {
    const res = await axios({
      url: params.url,
      method: "GET",
    });
    return {value: params.value, res: res.data};
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const getRequest = createAsyncThunk(
  "global/getRequest",
  getRequestAsync
);