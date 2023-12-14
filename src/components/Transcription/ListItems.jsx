import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Divider } from '@mui/material';
import { Settings } from '@mui/icons-material';
import CerrarSesion from './Logout';



export const mainListItems = (
  
  <>
   <ListItemButton component={Link} to="/dashboard/history">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Historial" />
    </ListItemButton>
    
    <Divider/>
    
    <ListItemButton component={Link} to="/dashboard/transcription">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Transcripción" />
    </ListItemButton>

  </>

);

export const secondaryList = (
  
  <>
    <ListItemButton component={Link} to="/transcription">
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Configuración" />
    </ListItemButton>

    <CerrarSesion/>

    
  </>

);