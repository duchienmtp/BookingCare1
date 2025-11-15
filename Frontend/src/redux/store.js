import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    app: appReducer,
  },
});
