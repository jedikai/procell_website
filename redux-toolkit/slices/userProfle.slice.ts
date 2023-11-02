import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userProfileImageInterface } from "../interfaces/interfaces";

const initialState: userProfileImageInterface = {
  refresh: false
};

const userProfileImgSlice = createSlice({
  name: "userProfileImgSlice",
  initialState,
  reducers: {
    refreshProfileImg: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    }
  },
  extraReducers: {}
});

export const { refreshProfileImg } = userProfileImgSlice.actions;

export default userProfileImgSlice.reducer;