import { useContext, useState } from 'react';
import {
  Box, CircularProgress, styled,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Page from '../Page/Page';
import { UserContext } from '../../context/UserContext';
import WelcomeDisplay from '../../displays/Welcome/WelcomeDisplay';
import { NavigationItem } from '../../components/Navigation';

const OuterStyledBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  margin: theme.spacing(1),
}));
const StyledInnerBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
}));

function HomePage() {
  const { isLoading } = useContext(UserContext);
  const [Display, setDisplay] = useState<JSX.Element>(<WelcomeDisplay />);

  const handleTodoOnClick = () => {
    setDisplay(
      <WelcomeDisplay />,
    );
  };

  const items: NavigationItem[] = [
    {
      displayName: 'Home',
      onclick: handleTodoOnClick,
      Icon: HomeIcon,
    },
  ];

  return (
    <Page isPublic navigationItems={items}>
      <OuterStyledBox>
        {
        isLoading
          ? <CircularProgress sx={{ justifySelf: 'center', alignSelf: 'center' }} />
          : <StyledInnerBox>{Display}</StyledInnerBox>
      }
      </OuterStyledBox>
    </Page>
  );
}

export default HomePage;
