import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch Todos from the API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});



const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add new todo
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    // Delete todo by ID
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    // Edit todo by ID
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const todoIndex = state.items.findIndex((todo) => todo.id === id);
      if (todoIndex >= 0) {
        state.items[todoIndex].todo = updatedTodo;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions for dispatching
export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;

