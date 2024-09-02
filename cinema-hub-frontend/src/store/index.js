import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favorites";
import watchlistReducer from "./slices/wathclist";
import friendsReducer from "./slices/friends";
import loginReducer from "./slices/login";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
    friends: friendsReducer,
    login: loginReducer,
  },
});

export default store;
