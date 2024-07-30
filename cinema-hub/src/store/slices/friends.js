import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [
    {
      id: 1,
      name: "John Doe",
      email: "johhny@mail.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@mail.com",
    },
  ],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend(state, action) {
      state.friends.push(action.payload);
    },
    removeFriend(state, action) {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
    },
    getFriendById(state, action) {
      return state.friends.find((friend) => friend.id === action.payload.id);
    },
  },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;
