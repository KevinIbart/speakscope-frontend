import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
        toast.error('Error al cargar datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success('¡Cierre de sesión exitoso!');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
      {loading ? (
        <Typography variant="h6" gutterBottom>
          Cargando perfil...
        </Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            PERFIL DE USUARIO
          </Typography>
          <div>
            <p>
              <strong>Nombre:</strong> {userData.displayName}
            </p>
            <p>
              <strong>Correo:</strong> {userData.email}
            </p>
          </div>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}
      <ToastContainer />
    </Paper>
  );
};

export default UserProfile;
