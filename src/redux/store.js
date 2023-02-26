import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./Slices/comments-slice";
import authReducer from "./Slices/auth-slice";

export default configureStore({
  reducer: {
    comments: commentsReducer,
    auth: authReducer,
  },
});
