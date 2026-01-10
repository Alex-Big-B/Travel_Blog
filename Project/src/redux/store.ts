import { configureStore } from "@reduxjs/toolkit";
import successReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    success: successReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
