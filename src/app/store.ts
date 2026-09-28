import { configureStore } from "@reduxjs/toolkit";

import fruitsReducer from "../features/fruits/fruitsSlice";

export const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
