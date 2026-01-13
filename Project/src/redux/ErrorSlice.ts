import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorSliceState {
  isError: boolean;
  errorText: string | null;
}

const initialState: ErrorSliceState = {
  isError: false,
  errorText: null,
};

const ErrorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    changeIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.errorText = action.payload;
    },
    resetErrorText: (state) => {
      state.errorText = null;
    },
  },
});

export const { changeIsError, setErrorText, resetErrorText } = ErrorSlice.actions;

export default ErrorSlice.reducer;
