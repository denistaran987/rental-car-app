import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
};

export const slice = createSlice({
  name: 'cars',
  initialState,
});

export default slice.reducer;
