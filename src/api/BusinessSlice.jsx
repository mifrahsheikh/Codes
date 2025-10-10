import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "businesses",
  initialState: [],
  reducers: {
    clearBusinesses: () => [],
  },
});

export const { clearBusinesses } = businessSlice.actions;
export default businessSlice.reducer;