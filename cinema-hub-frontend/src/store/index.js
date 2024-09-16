import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favorites";
import watchlistReducer from "./slices/wathclist";
import loginReducer from "./slices/login";
import triviaReducer from "./slices/trivia";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
    login: loginReducer,
    trivia: triviaReducer,
  },
});

export default store;
