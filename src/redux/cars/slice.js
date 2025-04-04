import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarById, fetchCarsBrand, fetchCarsData } from './operations';

const initialState = {
  carsInfo: {
    carInfo: {},
    carsList: [],
    carsBrandList: [],
    selectedCars: JSON.parse(localStorage.getItem('selectedCars')) || [],
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
    resetCarsState: state => {
      state.carsInfo.carsList = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.carsInfo.selectedCars.includes(carId)) {
        state.carsInfo.selectedCars = state.carsInfo.selectedCars.filter(
          id => id !== carId
        );
      } else {
        state.carsInfo.selectedCars.push(carId);
      }
      localStorage.setItem(
        'selectedCars',
        JSON.stringify(state.carsInfo.selectedCars)
      );
    },
    setSelectedCars: (state, action) => {
      state.carsInfo.selectedCars = action.payload;
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
      .addCase(fetchCarById.fulfilled, (state, { payload }) => {
        state.carsInfo.carInfo = payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchCarsBrand.pending,
          fetchCarsData.pending,
          fetchCarById.fulfilled
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCarsBrand.rejected,
          fetchCarsData.rejected,
          fetchCarById.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const { setFilters, resetCarsState, setSelectedCars, toggleFavorite } =
  slice.actions;

export default slice.reducer;
