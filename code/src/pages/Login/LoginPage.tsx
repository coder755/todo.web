import { useContext, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../Page/Page';
import { UserContext } from '../../context/UserContext';
import '@aws-amplify/ui-react/styles.css';
import { AccountPagePath } from '../consts';

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
      <Authenticator signUpAttributes={['email', 'given_name', 'family_name', 'preferred_username']} loginMechanisms={['email']}>
        <CircularProgress />
      </Authenticator>
    </Page>
  );
}

export default LoginPage;
