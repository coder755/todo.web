/* eslint-disable react/require-default-props */
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  Box,
  Paper, Typography,
} from '@mui/material';
import { NavigationItem } from './navigation';

type BottomNavigationProps = {
  items: NavigationItem[],
};

function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <Box sx={{ backgroundColor: 'white', boxShadow: '0px 10px 10px 10px rgba(0, 0, 0, 0.2);' }}>
      <Paper
        elevation={3}
      >
        <MuiBottomNavigation onChange={(_e, i) => { items[i].onclick(); }}>
          {items.map(
            ({ displayName, Icon }) => (
              <MuiBottomNavigationAction
                key={displayName}
                showLabel
                label={<Typography>{displayName}</Typography>}
                icon={<Icon />}
              />
            ),
          )}
        </MuiBottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNavigation;
