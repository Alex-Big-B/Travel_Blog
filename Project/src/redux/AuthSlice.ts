import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceState {
  auth: boolean;
  token: string | null;
}

const initialState: AuthSliceState = {
  auth: false,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    switchAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});

export const { switchAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
