import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userProfileImageInterface } from "../interfaces/interfaces";

const initialState: userProfileImageInterface = {
  refresh: false,
  image: "",
  AuthorizedNetCred: { login_id: "", client_key: "" },
  userName: "",
  productVariantId: ""
};

const userProfileImgSlice = createSlice({
  name: "userProfileImgSlice",
  initialState,
  reducers: {
    refreshProfileImg: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
    updatedProfileImg: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    getAuthorizationNetCred: (
      state,
      action: PayloadAction<{ login_id: string; client_key: string }>
    ) => {
      state.AuthorizedNetCred = action.payload;
    },
    getUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    getProductVariantId: (state, action: PayloadAction<string>) => {
      state.productVariantId = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  refreshProfileImg,
  updatedProfileImg,
  getAuthorizationNetCred,
  getUserName,
  getProductVariantId
} = userProfileImgSlice.actions;

export default userProfileImgSlice.reducer;
