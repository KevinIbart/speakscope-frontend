import { Typography, Grid, Paper, Box} from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBackdrop from './LoadingBackdrop';
import { authContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

export const FeedbackContent = () => {
  const [feedbackDetails, setFeedbackDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(authContext);
  
  const { speechId } = useParams();

  const handleFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://apis.speakscope.tech/discurso/retroalimentacion/generate/${speechId}`, {
        headers: {
          'Authorization': await auth.getToken(),
        },
      });
      setFeedbackDetails(response.data);
    } catch (error) {
      console.error('Error getting feedback:', error.response?.status, error.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('Feedback loading state set to false');
    }
  }, [auth, speechId]);

  useEffect(() => {
    if (speechId) {
      handleFeedback();
    }
  }, [speechId, handleFeedback]);

  return (
      <div>
        {feedbackDetails && (
          <>
            <Typography variant="h5" gutterBottom>Retroalimentación Basada en el discurso</Typography>
            <Grid item xs={12} sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>
                    <Lightbulb /> ID:
                  </Typography>
                  <Typography>{feedbackDetails.retroalimentacion_id}</Typography>
                </Box>
              </Paper>
            </Grid>
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
                  <Typography>{feedbackDetails.redundancia_resultado}</Typography>
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
};

