import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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


// FETCH REGIONS
const fetchRegionsAsync = async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      url: "universal/region-list",
      method: "GET",
    });
    return res;
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const fetchRegions = createAsyncThunk(
  "global/fetchRegions",
  fetchRegionsAsync
);

