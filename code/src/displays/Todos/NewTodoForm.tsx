/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import {
  TextField, Button, Typography, CircularProgress, Paper,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TodosContext } from '../../context/TodosContext';
import { PostTodoRequest } from '../../types/services/todos/todoTypes';

interface FormData {
  name: string,
  description: string,
}

const defaultState: FormData = {
  name: '',
  description: '',
};

const isEmptyObject = (obj: Object) => Object.keys(obj).length === 0;

function NewTodoForm() {
  const { addTodo, isLoading } = useContext(TodosContext);
  const [isError, setIsError] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const {
    handleSubmit, formState: { errors }, register,
  } = useForm({ defaultValues: defaultState });

  const onSubmit: SubmitHandler<FormData> = async ({ name }) => {
    const requestData: PostTodoRequest = {
      name,
    };
    const isAddingSuccess = await addTodo(requestData);
    setIsAddSuccess(isAddingSuccess);
    setIsError(false); // does nothing right now. will need to handle later
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isAddSuccess) {
    return <Typography>Todd Added</Typography>;
  }

  if (isError) {
    return <Typography>An Error Occurred</Typography>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{
        display: 'flex', flexDirection: 'column', width: '100%', boxShadow: 'none',
      }}
      >
        <Typography variant="h4" gutterBottom>
          Add a new Todo
        </Typography>
        <TextField
          label="Todo Name"
          margin="normal"
          variant="outlined"
          required
          helperText={errors ? errors.name?.message : null}
          {...register('name', {
            required: 'Name is required.',
          })}
        />
        <Button disabled={!isEmptyObject(errors)} type="submit" variant="contained" color="primary" sx={{ my: 1 }}>
          Add Todo
        </Button>
      </Paper>
    </form>
  );
}

export default NewTodoForm;
