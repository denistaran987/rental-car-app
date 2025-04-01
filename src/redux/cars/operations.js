import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchCarsBrand = createAsyncThunk(
  'cars/brand',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/brands');
      return res.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue('Something went wrong. Please try again later.');
      }

      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchCarsList = createAsyncThunk(
  'cars/list',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/cars');
      return res.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue('Something went wrong. Please try again later.');
      }

      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
