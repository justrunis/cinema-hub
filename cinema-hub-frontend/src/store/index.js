import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favorites";
import watchlistReducer from "./slices/wathclist";
import loginReducer from "./slices/login";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
    login: loginReducer,
  },
});

export default store;
