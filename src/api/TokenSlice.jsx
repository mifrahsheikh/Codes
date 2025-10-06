import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  role: localStorage.getItem("role") || null,
  username: localStorage.getItem("username") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh, role } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.role = role;
      state.username = username;

      if (access) localStorage.setItem("access", access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (role) localStorage.setItem("role", role);
      if (username) localStorage.setItem("username", username);
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.role = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;