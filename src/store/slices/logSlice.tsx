import { createSlice } from "@reduxjs/toolkit";

interface LogState {
  reRender: string;
}

const initialState: LogState = {
  reRender: " ",
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    triggerReRender: (state) => {
      state.reRender = new Date().toISOString(); // Update with a new timestamp
    },
  },
});

export const { triggerReRender } = logSlice.actions;
export default logSlice.reducer;

