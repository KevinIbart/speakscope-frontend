import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";



const CerrarSesion = () => {
    const { logout } = useContext(authContext);
  
    const handleLogout = async () => {
      try {
        await logout();
        // You can perform additional actions after logout if needed
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
    return (
        <>
          
          <Divider />
    
          <ListItemButton onClick={handleLogout} component={Link} to="/">
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </>
      );
    };
    
export default CerrarSesion;