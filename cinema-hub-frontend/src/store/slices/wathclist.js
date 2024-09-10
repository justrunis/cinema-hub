import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist, removeFromWatchlist } from "../../api/http";

const initialState = {
  watchlist: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addWatchlist(state, action) {
      addToWatchlist({
        token: action.payload.token,
        itemId: action.payload.itemId,
        itemType: action.payload.itemType,
        title:
          action.payload.title ||
          action.payload.name ||
          action.payload.original_name,
        poster_path: action.payload.poster_path,
        vote_average: action.payload.vote_average,
      });
      state.watchlist.push(action.payload);
    },
    removeWatchlist(state, action) {
      removeFromWatchlist({
        token: action.payload.token,
        itemId: action.payload.id,
      });
      state.watchlist = state.watchlist.filter(
        (item) => item.itemId !== action.payload
      );
    },
  },
});

export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice.reducer;
