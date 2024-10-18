import { useContext, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Box, styled, CircularProgress } from '@mui/material';
import Page from '../Page/Page';
import { UserContext } from '../../context/UserContext';
import '@aws-amplify/ui-react/styles.css';
import { AccountPagePath } from '../consts';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.background.default,
}));

function LoginPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${AccountPagePath}`);
    }
  }, [user, navigate]);

  return (
    <Page>
      <StyledBox>
        <Authenticator signUpAttributes={['email', 'given_name', 'family_name', 'preferred_username']} loginMechanisms={['email']}>
          <CircularProgress />
        </Authenticator>
      </StyledBox>
    </Page>
  );
}

export default LoginPage;
