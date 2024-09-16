import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});


const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle' },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
