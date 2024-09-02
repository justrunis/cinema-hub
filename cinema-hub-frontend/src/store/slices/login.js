import { createSlice } from "@reduxjs/toolkit";

const parseJsonFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  try {
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    return null;
  }
  return null;
};

const initialLoginState = {
  isLoggedIn: !!parseJsonFromLocalStorage("cinema-hub-token"),
  token: parseJsonFromLocalStorage("cinema-hub-token"),
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("cinema-hub-token", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("cinema-hub-token");
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
