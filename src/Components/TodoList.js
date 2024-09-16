import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, editTodo } from '../slices/todosSlice';
import { CircularProgress, List, ListItem, ListItemText, IconButton, TextField, Button, Typography, Container, Paper, Divider, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newId = items.length ? items[items.length - 1].id + 1 : 1;
      dispatch(addTodo({ id: newId, todo: newTodo, completed: false }));
      setNewTodo('');
      setSnackbarMessage('Todo added successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    setSnackbarMessage('Todo deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleEditTodo = (id, todoText) => {
    setEditingTodoId(id);
    setEditingTodoText(todoText);
  };

  const handleSaveEdit = () => {
    if (editingTodoText.trim()) {
      dispatch(editTodo({ id: editingTodoId, updatedTodo: editingTodoText }));
      setEditingTodoId(null);
      setEditingTodoText('');
      setSnackbarMessage('Todo updated successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       // Linear gradient background for the container
      }}
    >
      <Paper
        style={{
          padding: '20px',
          width: '100%',
          maxWidth: '800px',
          margin: 'auto',
          background: 'linear-gradient(to right, #ff7043, #ffffff)', // Linear gradient background for Paper
          color: '#e0f7fa',
        }}
      >
        <Typography variant="h3" style={{ color: 'black' }} gutterBottom align="center">
          Todo App
        </Typography>

        {/* Add New Todo */}
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            marginBottom: '20px',
            backgroundColor: '#eeeeee', // Adjusted input background color
            borderRadius: '5px',
          }}
          InputProps={{
            style: {
              color: '#333', // Adjusted input text color
            },
          }}
          InputLabelProps={{
            style: {
              color: '#333', // Adjusted input label color
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          style={{
            backgroundColor: '#00bfa5', // Adjusted button background color
            color: '#fff',
            marginBottom: '20px',
            display: 'block',
            marginLeft: 'auto',
            width: '100%',
            maxWidth: '200px',
          }}
        >
          Add Todo
        </Button>

        <Divider style={{ margin: '20px 0', backgroundColor: '#455a64' }} />

        <List>
          {items.slice().reverse().map((todo) => (
            <ListItem
              key={todo.id}
              divider
              style={{
                background: 'linear-gradient(90deg, rgba(255,112,67,1) 0%, rgba(255,193,7,1) 100%)', // Equal linear gradient background
                borderRadius: '5px',
                marginBottom: '10px',
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {editingTodoId === todo.id ? (
                <>
                  <TextField
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginRight: '10px',
                      backgroundColor: '#37474f',
                      color: '#e0f7fa',
                    }}
                    InputProps={{
                      style: {
                        color: '#e0f7fa',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#e0f7fa',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveEdit}
                    style={{ backgroundColor: '#00bfa5', color: '#fff', maxWidth: '120px' }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={`${todo.id}`} style={{ color: 'white' }} />
                  <ListItemText primary={todo.todo} style={{ color: 'white' }} />
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditTodo(todo.id, todo.todo)}
                  >
                    <EditIcon style={{ color: 'white' }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <DeleteIcon style={{ color: 'white' }} />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoList;
