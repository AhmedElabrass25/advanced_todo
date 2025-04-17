import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todosSlice";

let store = configureStore({
  reducer: {
    allTodos: todosReducer, //
  },
});
export default store;
