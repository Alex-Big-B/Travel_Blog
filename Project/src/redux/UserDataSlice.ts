import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataSliceState {
  full_name: string;
  city: string;
  country: string;
  bio: string;
}

const initialState: UserDataSliceState = {
  full_name: "",
  city: "",
  country: "",
  bio: "",
};

const UserDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (_state, action: PayloadAction<UserDataSliceState>) => action.payload,
    resetUserData: (_) => initialState,
  },
});

export const { setUserData, resetUserData } = UserDataSlice.actions;
export default UserDataSlice.reducer;
