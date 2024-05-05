import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { themeSlice } from './slices/theme';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  theme: themeSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        warnAfter: 128,
      },
    }).concat([apiSlice.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
