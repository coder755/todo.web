/* eslint-disable react/require-default-props */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import MenuBar from '../../components/MenuBar';
import { UserContext } from '../../context/UserContext';
import { LoginPagePath } from '../consts';
import { BottomNavigation, NavigationItem } from '../../components/Navigation';

type PageProps = {
  children: React.ReactNode,
  isPublic?: boolean,
  navigationItems?: NavigationItem[]
};

const MenuBarPxHeight = '70px';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.palette.background.default,
  overflow: 'hidden',
}));

function Page(props: PageProps) {
  const { children, isPublic = false, navigationItems = [] } = props;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const showLoginPage = !isPublic && !user;

    if (showLoginPage) {
      navigate(`/${LoginPagePath}`);
    }
  }, [isPublic, user, navigate]);

  return (
    <StyledBox>
      <MenuBar height={MenuBarPxHeight} />
      <Box sx={{
        flex: 1, maxWidth: '500px', alignSelf: 'center', overflow: 'auto',
      }}
      >
        { children }
      </Box>
      {
        (navigationItems.length > 0)
          ? <BottomNavigation items={navigationItems} />
          : null
      }
    </StyledBox>
  );
}

export default Page;
