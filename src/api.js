import axios from 'axios';

export const getTodos = async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data;
};

export const addNewTodo = async (todo) => {
  const response = await axios.post('https://dummyjson.com/todos/add', todo);
  return response.data;
};

export const updateExistingTodo = async (todo) => {
  const response = await axios.put(`https://dummyjson.com/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodoById = async (id) => {
  const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
  return response.data;
};
