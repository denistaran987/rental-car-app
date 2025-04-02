import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsBrand, fetchCarsData } from './operations';

const initialState = {
  carsInfo: {
    carsList: [],
    carsBrandList: [],
    carsPriceList: [],
  },
  totalCars: '',
  page: '1',
  totalPages: '',
  isLoading: false,
};

export const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    nextPage: (state, action) => {
      state.page = action.payload;
    },
    resetCarsState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarsBrand.fulfilled, (state, { payload }) => {
        state.carsInfo.carsBrandList = payload;
        state.isLoading = false;
      })
      .addCase(fetchCarsData.fulfilled, (state, { payload }) => {
        const { cars } = payload;
        const uniqueRentalPrices = [
          ...new Set([
            ...state.carsInfo.carsPriceList,
            ...cars.map(car => car.rentalPrice),
          ]),
        ].sort((a, b) => a - b);

        state.carsInfo.carsPriceList = uniqueRentalPrices;
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

export const { nextPage, resetCarsState } = slice.actions;

export default slice.reducer;
