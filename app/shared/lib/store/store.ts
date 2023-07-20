import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';

import { categoryReducer } from '../../../pages/Chart/lib/store/categorySlice';
import { countReducers } from '../../../pages/Count/lib/store/countSlice';
import { targetReducers } from '../../../pages/Target/lib/store/targetSlice';

const rootReducer = combineReducers({
  count: countReducers,
  target: targetReducers,
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { store };
