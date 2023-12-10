import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import { categoryReducer } from '../../../pages/Chart/lib/store/categorySlice';
import { countReducers } from '../../../pages/Count/lib/store/countSlice';
import { targetReducers } from '../../../pages/Target/lib/store/targetSlice';

const rootReducer = combineReducers({
  count: countReducers,
  target: targetReducers,
  category: categoryReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export { store };
