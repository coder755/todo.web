import { useContext } from 'react';
import {
  Box, CircularProgress, Grid, styled, Typography,
} from '@mui/material';
import TodosProvider, { TodosContext } from '../../context/TodosContext';
import ModalWithButton from '../../components/Modals/ModalWithButton';
import NewTodoForm from './NewTodoForm';
import TodoThumbnail from '../../components/Todo/TodoThumbnail';

const StyledBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

function TodosDisplay() {
  const { isLoading, todos, completeTodo } = useContext(TodosContext);

  return (
    <StyledBox>
      <Typography variant="h5" gutterBottom sx={{ alignSelf: 'center' }}>Your Todos</Typography>

      <ModalWithButton openText="Add a Todo" closeText="Close">
        <NewTodoForm />
      </ModalWithButton>
      {
        isLoading ? (
          <CircularProgress />
        )
          : (
            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                {todos.map((todo) => (
                  <Grid item xs={12} sm={12} md={6} key={todo.externalId}>
                    <TodoThumbnail
                      todo={todo}
                      onCompletedClick={completeTodo}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
      }
    </StyledBox>
  );
}

function WrappedTodosDisplay() {
  return (
    <TodosProvider>
      <TodosDisplay />
    </TodosProvider>
  );
}

export default WrappedTodosDisplay;
