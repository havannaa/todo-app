import { List } from '@mui/material';
import TodoItem from './TodoItem';
import { Todo } from '../types';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default TodoList;

