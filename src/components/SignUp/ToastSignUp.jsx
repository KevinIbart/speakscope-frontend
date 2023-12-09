import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastSignUp = ({ type, message, firebaseError }) => {
  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      if (firebaseError && firebaseError.code) {
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            toast.error('Correo electrónico ya está en uso. Inicie sesión o utilice otro correo.', options);
            break;
          case 'auth/invalid-email':
            toast.error('Formato de correo electrónico no válido.', options);
            break;
          case 'auth/user-not-found':
            toast.error('No se encontró ningún usuario con este correo electrónico.', options);
            break;
          case 'auth/wrong-password':
            toast.error('Contraseña incorrecta. Por favor, vuelva a intentarlo.', options);
            break;
          case 'auth/weak-password':
            toast.error('La contraseña debe tener al menos 6 caracteres.', options);
            break;
          default:
            toast.error(message, options);
        }
      } else {
        toast.error(message, options);
      }
      break;
    default:
      break;
  }
};
