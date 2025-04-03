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

export const fetchCarsData = createAsyncThunk(
  'cars/list',
  async ({ page = '1', filters = {} }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit: 12,
        ...filters,
      };

      const res = await axios.get('/cars', { params });
      return res.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue('Something went wrong. Please try again later.');
      }
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/id',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/cars/${id}`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue('Something went wrong. Please try again later.');
      }
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
