import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import axios from 'axios';
import LoadingBackdrop from './LoadingBackdrop';

export const FeedbackContent = (transcriptionDetails) => {
  const [feedbackDetails, setFeedbackDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://apis.speakscope.tech/discurso/retroalimentacion/', { 
    });
      setFeedbackDetails(response.data);
    } catch (error) {
      console.error('Error getting feedback:', error.response?.status, error.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('Feedback loading state set to false');
    }
  }, []);

    const handleClickGenerarRetroalimentacion = () => {
      if (transcriptionDetails) {
        handleFeedback();
      }
    };

  if (!transcriptionDetails) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Realiza la transcripción antes de obtener retroalimentación.
      </Typography>
    );
  } else {
    return (
      <div>
       <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <Button variant="contained" color="primary" onClick={handleClickGenerarRetroalimentacion}>
            Generar Retroalimentación
          </Button>
        </Box>
        {feedbackDetails && (
          <>
            <Typography variant="h5" gutterBottom>Retroalimentación Basada en el discurso</Typography>
            <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>
                    <Lightbulb /> Claridad:
                  </Typography>
                  <Typography>{feedbackDetails.claridad_resultado}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>
                    <Lightbulb /> Coherencia:
                  </Typography>
                  <Typography>{feedbackDetails.coherencia_resultado}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>
                    <Lightbulb /> Muletillas:
                  </Typography>
                  <Typography>{feedbackDetails.muletillas_resultado}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>
                    <Lightbulb /> Redundancia:
                  </Typography>
                  <Typography>{feedbackDetails.redundancia_discurso}</Typography>
                </Box>
              </Paper>
            </Grid>

            <Box mt={3}>
              <Typography variant="h5" gutterBottom>Sugerencias de mejora</Typography>
              <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                <Paper elevation={3}>
                  <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                      <Lightbulb /> Aspectos a mejorar:
                    </Typography>
                    <Typography>{feedbackDetails.sugerencia_resultado}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Box>
          </>
        )}
        <LoadingBackdrop loading={loading} message="Proporcionando retroalimentación..." />
      </div>
    );
  }
};

