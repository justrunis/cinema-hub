import { createSlice } from "@reduxjs/toolkit";

const initialTriviaState = {
  questions: [],
  showQuestions: false,
  trivia: {
    category: "",
    difficulty: "",
  },
};

const triviaSlice = createSlice({
  name: "trivia",
  initialState: initialTriviaState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload.results;
    },
    setShowQuestions(state, action) {
      state.showQuestions = action.payload;
    },
    setTrivia(state, action) {
      state.trivia = action.payload;
    },
  },
});

export const triviaActions = triviaSlice.actions;

export default triviaSlice.reducer;
