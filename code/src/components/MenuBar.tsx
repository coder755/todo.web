import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { UserContext } from '../context/UserContext';
import {
  AccountPagePath, HomePagePath, LoginPagePath,
} from '../pages/consts';

type MenuBarProps = {
  height: string
};

function MenuBar({ height }: MenuBarProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user, signOut } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (text: string) => {
    setAnchorElUser(null);
    console.log(text);
  };

  const handleSignOut = React.useCallback(() => {
    signOut();
    handleCloseUserMenu('logout');
    navigate(`/${HomePagePath}`);
  }, [signOut, navigate]);

  const handleClickHome = () => {
    handleCloseUserMenu('home');
    navigate(`/${HomePagePath}`);
  };

  const handleClickAccount = () => {
    handleCloseUserMenu('account');
    navigate(`/${AccountPagePath}`);
  };

  const handleSignIn = () => {
    setAnchorElUser(null);
    navigate(`/${LoginPagePath}`);
  };

  const settings = [
    { text: 'Home', onclick: handleClickHome },
    { text: 'Account', onclick: handleClickAccount },
    { text: 'Sign Out', onclick: handleSignOut },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: 1201,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Container maxWidth="xl" sx={{ alignSelf: 'center' }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
          }}
        >
          <AllInclusiveIcon sx={{ mr: 1, width: '40px' }} />
          <Typography
            variant="h5"
            noWrap
            onClick={handleClickHome}
            sx={{
              display: 'flex',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            Todo App
          </Typography>
          {
            user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Todo" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.text} onClick={setting.onclick}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
              : (
                <Button
                  key="signInButton"
                  onClick={handleSignIn}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign In
                </Button>
              )
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;
