import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const loadTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

interface TodoState {
  todos: Todo[];
  filter: "all" | "completed" | "uncompleted";
}

const initialState: TodoState = {
  todos: loadTodos(),
  filter: "all",
};

const setLocalStorage = (state: TodoState) => {
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: uuidv4(),
        text: action.payload,
        isCompleted: false,
      };
      state.todos.push(newTodo);
      setLocalStorage(state);
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      setLocalStorage(state);
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        setLocalStorage(state);
      }
    },

    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "uncompleted">
    ) => {
      state.filter = action.payload;
    },

    clearAll: (state) => {
      state.todos = [];
      setLocalStorage(state);
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, setFilter, clearAll } =
  todoSlice.actions;
export default todoSlice.reducer;
