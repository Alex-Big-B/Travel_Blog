import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorSliceState {
  agreed: boolean;
  agreedText: string | null;
  agreedNavigate: string | null;
}

const initialState: ErrorSliceState = {
  agreed: false,
  agreedText: null,
  agreedNavigate: null,
};

const ErrorSlice = createSlice({
  name: "agreed",
  initialState,
  reducers: {
    changeAgreed: (state, action: PayloadAction<boolean>) => {
      state.agreed = action.payload;
    },
    setAgreedText: (state, action: PayloadAction<string>) => {
      state.agreedText = action.payload;
    },
    resetAgreedText: (state) => {
      state.agreedText = null;
    },
    setAgreedNavigate: (state, action: PayloadAction<string>) => {
      state.agreedNavigate = action.payload;
    },
    resetAgreedNavigate: (state) => {
      state.agreedNavigate = null;
    },
  },
});

export const {
  changeAgreed,
  setAgreedText,
  resetAgreedText,
  setAgreedNavigate,
  resetAgreedNavigate,
} = ErrorSlice.actions;

export default ErrorSlice.reducer;
