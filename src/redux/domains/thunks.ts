import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// FETCH DOMAINS
const fetchDomainsAsync = async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      url: "domains/get-domains",
      method: "GET",
    });
    return res;
  } catch (err) {
    return rejectWithValue([], err);
  }
};

export const fetchDomains = createAsyncThunk(
  "global/fetchDomains",
  fetchDomainsAsync
);
