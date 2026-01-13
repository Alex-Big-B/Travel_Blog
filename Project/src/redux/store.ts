import { configureStore } from "@reduxjs/toolkit";
import userDataSliceReducer from "./UserDataSlice";
import errorSliceReducer from "./ErrorSlice";
import agreedSliceReducer from "./AgreedSlice";

export const store = configureStore({
  reducer: {
    userData: userDataSliceReducer,
    error: errorSliceReducer,
    agreed: agreedSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
