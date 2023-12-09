import { Grid, Button, Typography, styled } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AudioUpload({ setFile }) {
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "35px",
    color: "#1a4ed2",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedFormats = ['.mp3', '.wav', '.ogg', '.mp4', '.flac', '.mpeg', '.mpga', '.oga', '.webm', '.m4a'];
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (!allowedFormats.includes(`.${fileExtension}`)) {
        toast.error('Formato de archivo no permitido. Por favor, selecciona un archivo de audio válido.');
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <Grid item xs={12} style={{ textAlign: 'center' }}>
      <Title variant="h1">
        Transcribe tu audio y descubre algunas funcionalidades que te servirán
      </Title>

      <h3>Solo se permiten archivos de audio: MP3 , WAV, OGG, MP4, FLAC, MPEG, MPGA, OGA, WEBM, M4A</h3>

      <Button
        variant="contained"
        component="label"
        startIcon={<Upload />}
        sx={{ marginBottom: '1rem' }}
      >
        Subir Archivo de Audio
        <input
          type="file"
          accept=".mp3, .wav, .ogg, .mp4, .flac, .mpeg, .mpga, .oga, .webm, .m4a"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {/* ToastContainer para mostrar toasts */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </Grid>
  );
}
