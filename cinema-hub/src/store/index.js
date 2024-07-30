import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favorites";
import watchlistReducer from "./slices/wathclist";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
