import {
  Box, CircularProgress, useMediaQuery, useTheme,
} from '@mui/material';
import { useState } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import Page from '../Page/Page';
import { BottomNavigation, MiniDrawer, NavigationItem } from '../../components/Navigation';

function AccountPage() {
  const [Display, setDisplay] = useState<JSX.Element>(<CircularProgress />);

  const handleContactMethodsOnClick = () => {
    setDisplay(
      <CircularProgress />,
    );
  };

  const theme = useTheme();
  const isBiggerThanSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const items: NavigationItem[] = [
    {
      displayName: 'Contacts',
      onclick: handleContactMethodsOnClick,
      Icon: ContactsIcon,
    },
  ];

  return (
    <Page>
      <MiniDrawer hide={!isBiggerThanSmall} items={items} />
      <Box sx={{
        flex: 1,
        padding: '26px',
        display: 'flex',
      }}
      >
        {
          Display
        }
      </Box>
      <BottomNavigation hide={isBiggerThanSmall} items={items} />
    </Page>
  );
}

export default AccountPage;
