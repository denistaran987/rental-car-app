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

// export const fetchCarsData = createAsyncThunk(
//   'cars/list',
//   async (page = '1', { rejectWithValue }) => {
//     try {
//       const res = await axios.get('/cars', {
//         params: { page, limit: 12 },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

export const fetchCarsData = createAsyncThunk(
  'cars/list',
  async ({ page = '1', filters = {} }, thunkAPI) => {
    try {
      const params = {
        page,
        limit: 12,
        ...filters,
      };

      const res = await axios.get('/cars', { params });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchFilteredCars = createAsyncThunk(
//   'cars/filter',
//   async (filters, { rejectWithValue }) => {
//     try {
//       const res = await axios.get('/cars', {
//         params: { limit: 12, ...filters },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
