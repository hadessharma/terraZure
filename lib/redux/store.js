import { configureStore } from "@reduxjs/toolkit";
import subReducer from "./actions";

export const store = configureStore({
  reducer: {
    sub: subReducer,
  },
});
