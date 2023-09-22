import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { categoryReducer } from '../../../pages/Chart/lib/store/categorySlice';
import { countReducers } from '../../../pages/Count/lib/store/countSlice';
import { targetReducers } from '../../../pages/Target/lib/store/targetSlice';

import { reduxStorageMMKV } from './mmkv';

const rootReducer = combineReducers({
  count: countReducers,
  target: targetReducers,
  category: categoryReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorageMMKV,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export { store };
