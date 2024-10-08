import {
  Box, CircularProgress, styled,
} from '@mui/material';
import { useContext, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { BottomNavigation, NavigationItem } from '../../components/Navigation';
import WrappedTodosDisplay from '../../displays/Todos/TodosDisplay';
import MenuBar from '../../components/MenuBar';
import { UserContext } from '../../context/UserContext';

const MenuBarPxHeight = '70px';

const InnerStyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  flexGrow: 1,
}));

const OuterStyledBox = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

function AccountPage() {
  const { isLoading } = useContext(UserContext);
  const [Display, setDisplay] = useState<JSX.Element>(<WrappedTodosDisplay />);

  const handleTodoOnClick = () => {
    setDisplay(
      <WrappedTodosDisplay />,
    );
  };

  const items: NavigationItem[] = [
    {
      displayName: 'My Todos',
      onclick: handleTodoOnClick,
      Icon: CheckBoxIcon,
    },
  ];

  return (
    <OuterStyledBox>
      <MenuBar height={MenuBarPxHeight} />
      {
        isLoading
          ? <CircularProgress sx={{ justifySelf: 'center', alignSelf: 'center' }} />
          : <InnerStyledBox>{Display}</InnerStyledBox>
      }
      <BottomNavigation items={items} />
    </OuterStyledBox>
  );
}

export default AccountPage;
