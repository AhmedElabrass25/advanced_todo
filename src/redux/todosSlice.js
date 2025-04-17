import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: JSON.parse(localStorage.getItem("allTodos")) || [],
  tasksFilter: [],
  currentFilter: "all",
};
// ======= Filter Todos =======
const applyFilter = (todos, category) => {
  if (category === "all") return todos;
  return todos.filter((todo) => todo.status.toLowerCase() === category);
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ============ Add Todo ===========
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now() + Math.random(),
        text: action.payload.text,
        status: action.payload.status,
      };
      state.todos = [newTodo, ...state.todos];
      localStorage.setItem("allTodos", JSON.stringify(state.todos));
      state.tasksFilter = applyFilter(state.todos, state.currentFilter); // ✅
    },
    // ============ Remove Todo ==========
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("allTodos", JSON.stringify(state.todos));
      state.tasksFilter = applyFilter(state.todos, state.currentFilter); // ✅
    },
    // ============ Update Todo ==========
    updateTodo: (state, action) => {
      const { editId, text, status } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === editId);

      if (todoIndex !== -1) {
        state.todos[todoIndex] = { id: editId, text, status };
        localStorage.setItem("allTodos", JSON.stringify(state.todos));
        state.tasksFilter = applyFilter(state.todos, state.currentFilter); // ✅
      }
    },
    // ============ Filter Todo ==========
    filterTodos: (state, action) => {
      state.currentFilter = action.payload; // ✅ تحديث الفلتر الحالي
      state.tasksFilter = applyFilter(state.todos, state.currentFilter); // ✅
    },
    // ============ Clear All Todos ==========
    clearTodos: (state) => {
      state.todos = [];
      localStorage.setItem("allTodos", JSON.stringify(state.todos));
      state.tasksFilter = state.todos;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const { addTodo, removeTodo, updateTodo, clearTodos, filterTodos } =
  todosSlice.actions;
