import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleToggle}>
        <Checkbox checked={todo.completed} disableRipple />
        <ListItemText primary={todo.text} sx={todo.completed ? { textDecoration: 'line-through' } : {}} />
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;

