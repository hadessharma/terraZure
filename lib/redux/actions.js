import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sid: null,
};

//So that id is not removed when page is refreshed.
if (typeof window !== "undefined") {
  if (localStorage.getItem("sid")) {
    initialState.sid = localStorage.getItem("sid");
  } else {
    initialState.sid = {};
  }
}

export const subscriptionSlice = createSlice({
  name: "sub",
  initialState,
  reducers: {
    change: (state, action) => {
      state.sid = action.payload;
    },
  },
});

export const { change } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
