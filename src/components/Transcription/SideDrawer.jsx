import { useContext, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { mainListItems, secondaryList} from './ListItems';

import DashboardContent from './DashboardContent';
import { Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { authContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export function SideDrawer() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { user } = useContext(authContext);
   
  
  const getFirstWord = (fullName) => {
    if (!fullName || typeof fullName !== 'string') {
      return ""; // Return an empty string if fullName is undefined or not a string
    }
  
    const words = fullName.split(" ");
    return words.length > 0 ? words[0] : ""; // Return the first word
  };
  
  return (
    
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} >
            <Toolbar
              sx={{
                pr: '24px',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton
                
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component= {Link}
                to="/home"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, textDecoration: 'none' }}  
              >
                SpeakScope
              </Typography>
              <Button component={Link} to="/dashboard/profile" sx={{color:'white'}}>
                <AccountCircle/>
                  <Typography variant="body2" sx={{ marginLeft: 1, fontWeight: "bold",}}>
                    {user ? getFirstWord(user.displayName) : "Perfil"}
                  </Typography>
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                
                sx={{textAlign: 'center', flexGrow: 1 }}
              >
                Funciones
              </Typography>
              <img src="../../../img/logo.png" alt="Logo" style={{ textAlign: 'center', width: '20%', marginBottom: '3px' }} />
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            
            <Divider />
            
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
            <List component="nav"
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }} 
            >
              {secondaryList}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              margin: 0,
              padding: 0,
            }}
          >
            <Toolbar />
            <DashboardContent/>
          </Box>
        </Box>
      </ThemeProvider>
    
  );
}