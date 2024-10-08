import {
  Button, Paper, styled, Typography,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Todo } from '../../models/Todo';

type TodoThumbnailProps = {
  todo: Todo
  onCompletedClick: (externalId: string) => void
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '300px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.2)',
}));

function TodoThumbnail({ todo, onCompletedClick }: TodoThumbnailProps) {
  const { name, isComplete, externalId } = todo;
  const handleTodoCompleted = () => {
    onCompletedClick(externalId);
  };

  const getStyle = () => {
    if (isComplete) {
      return { textDecorationLine: 'line-through' };
    }
    return {};
  };

  return (
    <StyledPaper>
      {
        isComplete ? <CheckBoxIcon /> : (
          <Button onClick={handleTodoCompleted}>Complete</Button>
        )
      }
      <Typography variant="body1" style={getStyle()}>
        {name}
      </Typography>
    </StyledPaper>
  );
}

export default TodoThumbnail;
