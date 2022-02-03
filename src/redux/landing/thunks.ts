import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH DEMOS
const fetchDemosAsync = async (data: any, { rejectWithValue }) => {
  try {
    const res = await axios({
      url: "instruments/landing",
      method: "GET",
      data,
    });
    return res;
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const fetchDemos = createAsyncThunk(
  "landing/fetchDemos",
  fetchDemosAsync
);

// GENERATE LANDING FORM
const genLandingFormAsync = async (data: any, { rejectWithValue }) => {
  try {
    const res = await axios({
      url: "generate-form/create-landing",
      method: "POST",
      data,
    });
    return res;
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const genLandingForm = createAsyncThunk(
  "landing/genLandingForm",
  genLandingFormAsync
);

// UPDATE LANDING FORM
const updateLandingFormAsync = async (data: any, { rejectWithValue }) => {
  console.log(data);
  try {
    const res = await axios({
      url: `generate-form/create-landing?id=${data.id}`,
      method: "POST",
      data: data.formData,
    });
    return res;
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const updateLandingForm = createAsyncThunk(
  "landing/updateLandingForm",
  updateLandingFormAsync
);
