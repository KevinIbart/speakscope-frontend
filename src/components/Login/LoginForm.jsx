import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleBlur = (fieldName) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Ingrese su correo';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Correo inválido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!formData.password.trim()) {
          newErrors.password = 'Ingrese su contraseña';
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      handleBlur(fieldName);
      if (errors[fieldName]) {
        newErrors[fieldName] = errors[fieldName];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (validateForm()) {
      try {
        await auth.login(formData.email, formData.password);
        navigate('/home');
      } catch (error) {
        console.error('Error during login:', error);
        setErrors({ general: 'Error durante el inicio de sesión. Por favor, inténtalo de nuevo.' });
      }
    } else {
      console.log('Formulario inválido. Por favor, corrija los errores.');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.loginWithGoogle();
      navigate('/home');
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.' });
    }
  };
  
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={3.5}>
        <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
        <img  src="/img/Mesa de trabajo 99.png"
            alt="SpeakScope Logo"
            style={{ width: '50%', marginBottom: '5px' }} />
            <Typography variant="h6" gutterBottom>
              INICIO DE SESIÓN
            </Typography>
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Correo', name: 'email', type: 'email' },
              { label: 'Contraseña', name: 'password', type: 'password' },
            ].map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                variant="outlined"
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                onBlur={() => handleBlur(field.name)}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]}
                fullWidth
                margin="normal"
                style={{ marginBottom: '5px', alignSelf: 'flex-start' }}
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '10px', marginBottom: '15px' }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          {errors.general && (
            <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
              {errors.general}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleGoogleLogin}
            startIcon={<img src="/img/google.png" alt="Google Icon" style={{ width: '24px', marginRight: '5px' }} />}
            style={{marginBottom:'20px'}}
          >
            Iniciar sesión con Google
          </Button>
          <Grid container >
            <Grid item >
              <Link href="/register" variant="body1">
                {'¿No tienes cuenta? Regístrate'}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};