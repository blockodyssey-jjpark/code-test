import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

type PageSlice = {
  total: number;
  currentPage: number;
};

const initialState: PageSlice = {
  total: 0,
  currentPage: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = Math.ceil(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    goToPrevPage: (state) => {
      if (state.currentPage - 1 >= 0) state.currentPage = state.currentPage - 1;
    },
    goToNextPage: (state) => {
      if (state.currentPage + 1 < state.total)
        state.currentPage = state.currentPage + 1;
    },
  },
});

export const { setTotal, setCurrentPage, goToPrevPage, goToNextPage } =
  pageSlice.actions;

export const modalSelector = (state: RootState): PageSlice => state.page;

export default pageSlice.reducer;
