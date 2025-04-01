import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsBrand, fetchCarsList } from './operations';

const initialState = {
  carsList: null,
  carsBrandList: null,
  carsPriceList: null,
  isLoading: false,
};

export const slice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCarsBrand.fulfilled, (state, { payload }) => {
        state.carsBrandList = payload;
        state.isLoading = false;
      })
      .addCase(fetchCarsList.fulfilled, (state, { payload }) => {
        const { cars } = payload;
        const uniqueRentalPrices = [
          ...new Set(cars.map(car => car.rentalPrice)),
        ].sort((a, b) => a - b);

        state.carsPriceList = uniqueRentalPrices;
        state.carsList = payload.cars;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchCarsBrand.pending, fetchCarsList.pending),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchCarsBrand.rejected, fetchCarsList.rejected),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export default slice.reducer;
