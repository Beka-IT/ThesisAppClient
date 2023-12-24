import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { authReducer, sidebarReducer } from './reducers';
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  sidebarStore: sidebarReducer,
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

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
