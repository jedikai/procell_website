import globalSlice from "./global.slice";
import userSlice from "./userSlice";
import userProfileImgSlice from "./userProfle.slice";

const rootReducer = {
  userSlice,
  globalSlice,
  userProfileImgSlice
};

export default rootReducer;
