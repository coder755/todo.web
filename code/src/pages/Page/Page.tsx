import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline, styled } from '@mui/material';
import MenuBar from '../../components/MenuBar';
import { UserContext } from '../../context/UserContext';
import { LoginPagePath } from '../consts';

type PageProps = {
  children: React.ReactNode,
  isPublic?: boolean
};

const MenuBarPxHeight = '70px';

const StyledBox = styled(Box)(() => ({
  width: '100vw',
  height: `calc(100vh - ${MenuBarPxHeight})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

function Page(props: PageProps) {
  const { children, isPublic } = props;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const showLoginPage = !isPublic && !user;

    if (showLoginPage) {
      navigate(`/${LoginPagePath}`);
    }
  }, [isPublic, user, navigate]);

  return (
    <>
      <CssBaseline />
      <MenuBar height={MenuBarPxHeight} />
      <StyledBox>
        { children }
      </StyledBox>
    </>
  );
}

Page.defaultProps = {
  isPublic: false,
};

export default Page;
