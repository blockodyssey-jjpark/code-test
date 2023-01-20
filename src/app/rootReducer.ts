import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import pageReducer from '../slices/pageSlice';

const appReducer = combineReducers({
  page: pageReducer,
});

type RootState = ReturnType<typeof appReducer>;

export const rootReducer: Reducer = (state: RootState, action: AnyAction) =>
  appReducer(state, action);

export default rootReducer;
