import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsBrand, fetchCarsData } from './operations';

const initialState = {
  carsInfo: {
    carsList: [],
    carsBrandList: [],
  },
  filters: {},
  totalCars: '',
  page: '1',
  totalPages: '',
  isLoading: false,
};

export const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCarsState: () => initialState,
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarsBrand.fulfilled, (state, { payload }) => {
        state.carsInfo.carsBrandList = payload;
        state.isLoading = false;
      })
      .addCase(fetchCarsData.fulfilled, (state, { payload }) => {
        const { cars } = payload;
        state.carsInfo.carsList = [...state.carsInfo.carsList, ...cars];
        state.totalCars = payload.totalCars;
        state.page = payload.page;
        state.totalPages = payload.totalPages;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchCarsBrand.pending, fetchCarsData.pending),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchCarsBrand.rejected, fetchCarsData.rejected),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const { setFilters, resetCarsState } = slice.actions;

export default slice.reducer;
