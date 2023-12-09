import SignUp from '../components/SignUp/SignUp';
import { useAuth } from '../context/AuthContext';

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegistration = async (formData) => {
    try {
      await register(formData.email, formData.password);
      console.log('Usuario registrado con éxito');
      toast.success('Registro exitoso. ¡Bienvenido!');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message); 
    }
  };

  return (
    <div>
      <SignUp onSubmit={handleRegistration} />
    </div>
  );
};