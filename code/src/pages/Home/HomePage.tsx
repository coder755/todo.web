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
const StyledInnerBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
}));

function HomePage() {
  const { user, isLoading } = useContext(UserContext);

  const getInternalDisplay = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (user) {
      return (
        <Typography>
          Hey
          {' '}
          {user.firstName}
          . Thanks for signing in. Checkout your account
          {' '}
          page to create and manage your ToDos.
        </Typography>
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
        <StyledInnerBox>
          {
          getInternalDisplay()
        }
          <Typography mt={1}>
            This app is designed to create and update todos
            {' '}
            even when no database connections avaialable.
            {' '}
            Feel free to watch the network tab. You&apos;ll see that a Websocket gets created and
            {' '}
            acts as a notification service for when data is avaialable to fetch.
            {' '}
            To see
            {' '}
            <Link href="https://miro.com/welcomeonboard/S202em5HMnRhQ0JSMURRZW90QzNiZk5NMzJXWmpaWTRCOHZsMlAzeHRCd3JTTWFheHhZcXg4ZmljUTZLWmk2TXwzNDU4NzY0NjA0MTk1NjE0NTg4fDI=?share_link_id=531797049135">architecture/flow diagrams</Link>
            {' '}
            or how the code works, check out
            {' '}
            <Link href="https://github.com/coder755?tab=repositories">Coder&apos;s Github</Link>
          </Typography>
          <Typography mt={1}>
            As an added bonus, the sourcmaps for the front end code are available in the source
            {' '}
            tab of the dev console.
          </Typography>
        </StyledInnerBox>
      </StyledBox>
    </Page>
  );
}

export default HomePage;
