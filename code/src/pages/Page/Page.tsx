import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import MenuBar from '../../components/MenuBar';
import { UserContext } from '../../context/UserContext';
import { LoginPagePath } from '../consts';

type PageProps = {
  children: React.ReactNode,
  // eslint-disable-next-line react/require-default-props
  isPublic?: boolean
};

const MenuBarPxHeight = '70px';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.palette.background.default,
}));

function Page(props: PageProps) {
  const { children, isPublic = false } = props;
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
      <Box sx={{ flex: 1 }}>
        { children }
      </Box>
    </StyledBox>
  );
}

export default Page;
