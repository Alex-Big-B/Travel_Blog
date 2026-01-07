import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SuccessSliceState {
  success: boolean;
  successText: string | null;
}

const initialState: SuccessSliceState = {
  success: false,
  successText: null,
};

const SuccessSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    toggleSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setSuccessText: (state, action: PayloadAction<string>) => {
      state.successText = action.payload;
    },
    resetSuccessText: (state) => {
      state.successText = null;
    },
  },
});

export const { toggleSuccess, setSuccessText, resetSuccessText } = SuccessSlice.actions;
export default SuccessSlice.reducer;
