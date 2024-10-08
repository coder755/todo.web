import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const ModalButton = styled(Button)(({ theme }) => (
  {
    borderRadius: theme.spacing(10),
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: '2px',
    margin: `${theme.spacing(1)} 0`,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    color: '#000',
  }
));

export default ModalButton;
