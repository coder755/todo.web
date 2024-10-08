import { ReactElement } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { getRouter } from './pages/Router';
import UserProvider from './context/UserContext';

function App(): ReactElement {
  const router = getRouter();

  return (
    <UserProvider>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <RouterProvider router={router} />
      </Grid>
    </UserProvider>
  );
}

export default App;
