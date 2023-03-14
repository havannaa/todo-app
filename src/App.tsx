import { useState, useEffect, useMemo, useReducer } from 'react';
import { Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import NewTodoForm from './components/NewTodoForm';
import { Todo } from './types';

type State = {
  todos: Todo[];
  newTodoValue: string;
};

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'SET_NEW_TODO_VALUE'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTodoValue: '',
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'SET_NEW_TODO_VALUE':
      return {
        ...state,
        newTodoValue: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    newTodoValue: '',
  });

  const { todos, newTodoValue } = state;

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
    dispatch({ type: 'ADD_TODO', payload: todosFromStorage });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoChange = (value: string) => {
    dispatch({ type: 'SET_NEW_TODO_VALUE', payload: value });
  };

  const handleNewTodoSubmit = () => {
    const newTodo: Todo = { id: Date.now(), text: newTodoValue, completed: false };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const handleTodoToggle = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleTodoDelete = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const completedTodosCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        My Todo List
      </Typography>
      <NewTodoForm value={newTodoValue} onChange={handleNewTodoChange} onSubmit={handleNewTodoSubmit} />
      <TodoList todos={todos} onToggle={handleTodoToggle} onDelete={handleTodoDelete} />
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {completedTodosCount}/{todos.length} completed
      </Typography>
    </Container>
  );
};

export default App;

