import { useState } from 'react';
import { TextField, Box, Button, Stack } from '@mui/material';

type NewTodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const NewTodoForm = ({ value, onChange, onSubmit }: NewTodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    onSubmit();
    setIsSubmitting(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="New todo"
          variant="outlined"
          size="small"
          value={value}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default NewTodoForm;


