import { useContext } from 'react';
import {
  Box, CircularProgress, Link, styled, Typography,
} from '@mui/material';
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

function WelcomeDisplay() {
  const { user, isLoading } = useContext(UserContext);

  const getInternalDisplay = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (user) {
      return (
        <Typography mt={2}>
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
      <Typography mt={2}>
        Sign in or make an account to start creating
        {' '}
        and managing your ToDos.
      </Typography>
    );
  };

  return (
    <StyledBox>
      <Typography variant="h3">Welcome to Coder&apos;s Todo App</Typography>
      <StyledInnerBox>
        {
          getInternalDisplay()
        }
        <Typography mt={1}>
          This app is designed to create and update todos
          {' '}
          even when no database connections are avaialable.
          {' '}
          Watch the network tab. You&apos;ll see a Websocket gets created and
          {' '}
          acts as a notification service for when data is avaialable to fetch. Click
          {' '}
          <Link href="https://miro.com/welcomeonboard/S202em5HMnRhQ0JSMURRZW90QzNiZk5NMzJXWmpaWTRCOHZsMlAzeHRCd3JTTWFheHhZcXg4ZmljUTZLWmk2TXwzNDU4NzY0NjA0MTk1NjE0NTg4fDI=?share_link_id=531797049135">to see the current architecture and upcoming changes.</Link>
          {' '}
          All the code for this work can be found on
          {' '}
          <Link href="https://github.com/coder755?tab=repositories">Coder&apos;s Github</Link>
        </Typography>
        <Typography mt={1}>
          As an added bonus, the sourcmaps for the front end code are available in the source
          {' '}
          tab of the dev console.
        </Typography>
        <Typography mt={1}>
          As with everything in life, this project is a work in progress that I&apos;m
          {' '}
          constantly making updates. Let me know if you have a feature request.
        </Typography>
      </StyledInnerBox>
    </StyledBox>
  );
}

export default WelcomeDisplay;
