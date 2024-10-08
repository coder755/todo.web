import { useContext } from 'react';
import {
  Box, CircularProgress, Link, styled, Typography,
} from '@mui/material';
import Page from '../Page/Page';
import { UserContext } from '../../context/UserContext';

const StyledBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  margin: theme.spacing(1),
}));

function HomePage() {
  const { user, isLoading } = useContext(UserContext);

  const getInternalDisplay = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (user) {
      return (
        <>
          <Typography>Thanks for signing in. Checkout your account</Typography>
          {' '}
          <Typography>
            page to create and manage your ToDos.
          </Typography>
        </>
      );
    }
    return (
      <>
        <Typography>Sign in or make an account to start creating</Typography>
        {' '}
        <Typography>
          and managing your ToDos.
        </Typography>
      </>
    );
  };

  return (
    <Page isPublic>
      <StyledBox>
        <Typography variant="h3">Welcome to Coder&apos;s Todo App</Typography>
        {
          getInternalDisplay()
        }
        <Typography>
          All the code used to make this app can be viewed at
          {' '}
          <Link href="https://github.com/coder755?tab=repositories">Coder&apos;s Github</Link>
        </Typography>
      </StyledBox>
    </Page>
  );
}

export default HomePage;
