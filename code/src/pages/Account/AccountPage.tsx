import {
  Box, CircularProgress, styled,
} from '@mui/material';
import { useContext, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { NavigationItem } from '../../components/Navigation';
import WrappedTodosDisplay from '../../displays/Todos/TodosDisplay';
import { UserContext } from '../../context/UserContext';
import Page from '../Page/Page';

const InnerStyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  flexGrow: 1,
}));

const OuterStyledBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

function AccountPage() {
  const { isLoading } = useContext(UserContext);
  const [Display, setDisplay] = useState<JSX.Element>(WrappedTodosDisplay);

  const handleTodoOnClick = () => {
    setDisplay(WrappedTodosDisplay);
  };

  const items: NavigationItem[] = [
    {
      displayName: 'My Todos',
      onclick: handleTodoOnClick,
      Icon: CheckBoxIcon,
    },
  ];

  return (
    <Page isPublic={false} navigationItems={items}>
      <OuterStyledBox>
        {
        isLoading
          ? <CircularProgress sx={{ justifySelf: 'center', alignSelf: 'center' }} data-testid="AccountPage-Progress" />
          : <InnerStyledBox>{Display}</InnerStyledBox>
      }
      </OuterStyledBox>
    </Page>
  );
}

export default AccountPage;
