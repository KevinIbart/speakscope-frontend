
import { Grid, Button, Typography, Paper, Box } from '@mui/material';
import { NoteAdd, Key, Lightbulb, Description } from '@mui/icons-material';
import { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useRef, useState } from 'react';
import AudioUpload from './AudioUpload.jsx';
import WaveformDisplay from './WaveformDisplay.jsx';
import LoadingBackdrop from './LoadingBackdrop.jsx';
import axios from 'axios';



export default function TranscriptionContent() {
  const [file, setFile] = useState(null);
  const [transcriptionDetails, setTranscriptionDetails] = useState(null);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('audio_file', file);

      const response = await axios.post(
        'https://apis.speakscope.tech/discurso/transcribe-audio/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
        }
      );
      setTranscriptionDetails(response.data);
    } catch (error) {
      console.error('Error uploading file:', error.response?.status, error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (file) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 150,
        barGap: 3,
      });
      wavesurferRef.current.loadBlob(file);
    }
  }, [file]);
  return (
    
    <div>
      <AudioUpload setFile={setFile} />
      {file && <WaveformDisplay file={file} waveformRef={waveformRef} wavesurferRef={wavesurferRef} />}
      <Grid item xs={12}  sx={{ textAlign: 'center', paddingTop: '1rem', paddingBottom:'1rem' }}>
        {file && (
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Transcribir
          </Button>
        )}
      </Grid>

      {transcriptionDetails && (
        <>
          <Grid item xs={12}  sx={{ paddingTop: '1rem', paddingBottom:'1rem' }}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <Description /> Transcripción:
                </Typography>
                <Typography>{transcriptionDetails.transcription}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom:'1rem' }}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <NoteAdd /> Resumen:
                </Typography>
                <Typography>{transcriptionDetails.resumen}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom:'1rem' }}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <Key /> Puntos Clave:
                </Typography>
                <Typography>{transcriptionDetails.ideasClave}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}  sx={{ paddingTop: '1rem', paddingBottom:'1rem' }}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <Lightbulb /> Ideas Clave:
                </Typography>
                <Typography>{transcriptionDetails.palabrasClave}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}  sx={{ paddingTop: '1rem', paddingBottom:'1rem' }}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  <Lightbulb /> Análisis de Sentimientos:
                </Typography>
                <Typography>{transcriptionDetails.Analisis_de_Sentimientos}</Typography>
              </Box>
            </Paper>
          </Grid>
        </>
      )}
      <LoadingBackdrop loading={loading} message="Procesando transcripción..." />
    </div>
  );
}



