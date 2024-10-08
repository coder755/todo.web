import { styled } from '@mui/material';
import Button from '@mui/material/Button';

const BaseButton = styled(Button)(({ theme }) => (
  {
    borderRadius: theme.spacing(10),
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: '2px',
    margin: `${theme.spacing(1)} 0`,
  }
));

export default BaseButton;
