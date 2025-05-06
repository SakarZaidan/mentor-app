import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all', // 'all', 'completed', 'active'
  aiSuggestions: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...updates };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodoComplete: (state, action) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    receiveAiSuggestions: (state, action) => {
      state.aiSuggestions = action.payload;
    },
    applyAiSuggestion: (state, action) => {
      const { suggestionId, todoId } = action.payload;
      // Find the suggestion
      const suggestion = state.aiSuggestions.find(s => s.id === suggestionId);
      if (suggestion) {
        // Apply suggestion to the todo
        const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
        if (todoIndex !== -1) {
          state.todos[todoIndex] = { ...state.todos[todoIndex], ...suggestion.changes };
        }
        // Remove the applied suggestion
        state.aiSuggestions = state.aiSuggestions.filter(s => s.id !== suggestionId);
      }
    }
  }
});

export const { 
  fetchTodosStart, 
  fetchTodosSuccess, 
  fetchTodosFailure, 
  addTodo, 
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  setFilter,
  receiveAiSuggestions,
  applyAiSuggestion
} = todoSlice.actions;

export default todoSlice.reducer;
