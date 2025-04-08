import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const isFav = state.favorites.includes(payload);

      state.favorites = isFav
        ? state.favorites.filter(id => id !== payload)
        : [...state.favorites, payload];
    },
  },
});

export const { toggleFavorite } = slice.actions;

export default slice.reducer;
