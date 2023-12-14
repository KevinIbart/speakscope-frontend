  import { useState } from 'react';
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';
  import Grid from '@mui/material/Grid';
  import Typography from '@mui/material/Typography';
  import Paper from '@mui/material/Paper';
  import { Link } from '@mui/material';
  import { useAuth } from '../../context/AuthContext'
  import { toast, ToastContainer } from 'react-toastify'; 
  import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';


  const SignUp = () => {
    
    const auth = useAuth();
    const navigate = useNavigate ();

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };

    const handleBlur = (fieldName) => {
      const newErrors = { ...errors };
      switch (fieldName) {
        case 'firstName':
          if (!formData.firstName.trim()) {
            newErrors.firstName = 'Ingrese su nombre';
          } else if (!/^[A-Za-z\s]{1,25}$/.test(formData.firstName)) {
            newErrors.firstName = 'Nombre inválido. Solo letras y espacios.';
          } else {
            delete newErrors.firstName;
          }
          break;
        case 'lastName':
          if (!formData.lastName.trim()) {
            newErrors.lastName = 'Ingrese sus apellidos';
          } else if (!/^[A-Za-z\s]{1,25}$/.test(formData.lastName)) {
            newErrors.lastName = 'Apellidos inválidos. Solo letras y espacios.';
          } else {
            delete newErrors.lastName;
          }
          break;
        case 'username':
          if (!formData.username.trim()) {
            newErrors.username = 'Ingrese su nombre de usuario';
          } else if (!/^[a-zA-Z0-9_]{1,20}$/.test(formData.username)) {
            newErrors.username = 'Nombre de usuario inválido (máximo 20 caracteres)';
          } else {
            delete newErrors.username;
          }
          break;
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
          } else if (!/^[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres y al menos un número. No caracteres especiales.';
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
    
      if (await validateForm()) {
        try {
          await auth.register(formData.email, formData.password, formData.firstName, formData.lastName);
          setRegistrationSuccess(true);
          toast.success('Registro exitoso');
          navigate('/login');
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          if (error.code === 'auth/email-already-in-use') {
            setErrors({
              ...errors,
              email: 'Este correo electrónico ya está en uso. Por favor, elige otro.',
            });
          }
        }
      } else {
        console.log('Formulario inválido. Por favor, corrija los errores.');
      }
    
      setLoading(false);
    };

    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={3.5}>
          <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
          {registrationSuccess ? (
            <Typography variant="h6" gutterBottom>
              ¡Registro exitoso! Puedes iniciar sesión ahora.
            </Typography>
          ) : (
            <>
              <img  src="/img/Mesa de trabajo 99.png"
              alt="SpeakScope Logo"
              style={{ width: '50%', marginBottom: '5px' }} />
              <Typography variant="h6" gutterBottom>
                REGISTRO DE CUENTA
              </Typography>
              <form onSubmit={handleSubmit}>
                {[
                  { label: 'Nombre', name: 'firstName', type: 'text', size: '50%'  },
                  { label: 'Apellidos', name: 'lastName', type: 'text', size: '50%' },
                  { label: 'Nombre de usuario', name: 'username', type: 'text' },
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
                    style={{ width: field.size, marginBottom: '5px', alignSelf: 'flex-start' }}
                  />
                ))}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </form>
            </>
          )}
            <Grid container style={{alignContent:'justify-content-left'}}>
                <Grid item>
                  <Link href="/login" variant="body1">
                    {"¿Ya tienes cuenta? Inicia Sesión"}
                  </Link>
                </Grid>
            </Grid>
            <ToastContainer />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  export default SignUp;
