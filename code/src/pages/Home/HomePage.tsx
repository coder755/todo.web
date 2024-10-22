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
          <Typography>
            Hey
            {' '}
            {user.firstName}
            . Thanks for signing in. Checkout your account
          </Typography>
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
          This app is designed to create and update todos
          {' '}
          even when there aren&apos;t any database connections avaialable.
          {' '}
          Feel free to watch the network tab. You&apos;ll see that a Websocket gets created and
          {' '}
          acts as a notification service for when data is avaialable to fetch.
          {' '}
          To see architecture/flow diagrams and how the code works, check out
          {' '}
          <Link href="https://github.com/coder755?tab=repositories">Coder&apos;s Github</Link>
        </Typography>
        <Typography>
          As an added bonus, the sourcmaps for the front end code are available as well.
        </Typography>
      </StyledBox>
    </Page>
  );
}

export default HomePage;
