import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favorites";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
