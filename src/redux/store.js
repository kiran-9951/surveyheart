
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';
import { loadState,saveState } from '../localStorage';


const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: persistedState, 
});


store.subscribe(() => {
  saveState(store.getState());
});
