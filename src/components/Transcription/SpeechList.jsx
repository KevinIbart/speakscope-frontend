import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
} from '@mui/material';
import { Delete, Feed, MenuOpen } from '@mui/icons-material';
import axios from 'axios';
import LoadingBackdrop from './LoadingBackdrop';
import { authContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function SpeechList() {
  const [speechHistory, setSpeechHistory] = useState([]);
  const [selectedSpeech, setSelectedSpeech] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState(null);
  const auth = useContext(authContext);

  const handleHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://apis.speakscope.tech/discurso/usuario/`, {
        headers: {
          'Authorization': await auth.getToken(),
        },
      });
      setSpeechHistory(response.data);
    } catch (error) {
      console.error('Error getting history:', error.response?.status, error.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('History loading state set to false');
    }
  }, [auth]);

  const selectSpeechFromHistory = async (speech) => {
    try {
      const authToken = await auth.getToken(); 
      const feedbackResponse = await axios.get(`https://apis.speakscope.tech/discurso/retro/buscar/${speech.id}`, {
        headers: {
          'Authorization': authToken
        },
      });

      console.log('Feedback Response:', feedbackResponse.data);

      setSelectedSpeech(speech);
      setFeedbackDetails(feedbackResponse.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error getting feedback details:', error.response?.status, error.response?.data || error.message);
    }
  };

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFeedbackPage = (speechId) => {
    navigate(`/dashboard/feedback/${speechId}`);
  };

  const handleDeleteSpeech = async () => {
    if (selectedSpeech) {
      const { id } = selectedSpeech;
  
      try {
        const authToken = await auth.getToken(); 
        const response = await axios.delete(`https://apis.speakscope.tech/discurso/discurso/del/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });
        console.log('Speech deleted successfully:', response.data);
        handleHistory();
      } catch (error) {
        console.error('Error deleting speech:', error.response?.status, error.response?.data || error.message);
      }
    } else {
      console.error('Cannot delete speech: selectedSpeech is null');
    }
  };

  useEffect(() => {
    handleHistory();
  }, [handleHistory]);

  return (
    <Container sx={{ paddingTop: '2rem', width: '100%' }}>
      {speechHistory.length === 0 ? (
        <div>
          <Typography variant="body1">Aún no hay ningún discurso.</Typography>
          <Button variant="outlined" color="primary" component={Link} to="/dashboard/transcription">
            Ir a la Transcripción
          </Button>
        </div>
      ) : (
        <Grid container spacing={2}>
          {speechHistory.map((speech) => (
            <Grid item key={speech.id} xs={12} sm={6} md={4} lg={12}>
              <Card sx={{ minWidth: 200, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    DISCURSO {speech.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    RESUMEN: {speech.resumen}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => selectSpeechFromHistory(speech)}
                  >
                    <MenuOpen />
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleFeedbackPage(speech.id)}
                  >
                    <Feed />
                  </Button>

                  <Button variant="outlined" color="secondary" onClick={handleDeleteSpeech}>
                    <Delete />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        
        <DialogTitle>DETALLES DEL DISCURSO</DialogTitle>
        
        <DialogContent>
          
        <Typography variant="body1" style={{ display: 'block', fontWeight: 'bold' }}>DETALLES DE TRANSCRIPCIÓN</Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            RESUMEN <span style={{ display: 'block' }}>{selectedSpeech?.resumen}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block'}}>
            TRANSCRIPCIÓN <span style={{ display: 'block'}}>{selectedSpeech?.transcripcion}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            PALABRAS CLAVE <span style={{ display: 'block' }}>{selectedSpeech?.palabrasClave}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            IDEAS CLAVE <span style={{ display: 'block' }}>{selectedSpeech?.ideasClave}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            ANÁLISIS DE SENTIMIENTOS <span style={{ display: 'block' }}>{selectedSpeech?.sentimiento}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>

          <Divider style={{ margin: '8px 0' }}/>
          
          <Typography variant="body1" style={{ display: 'block', fontWeight: 'bold' }}>RETROALIMENTACIÓN</Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            CLARIDAD <span style={{ display: 'block' }}>{feedbackDetails?.claridad}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block'}}>
            COHERENCIA <span style={{ display: 'block'}}>{feedbackDetails?.coherencia}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            MULETILLAS <span style={{ display: 'block' }}>{feedbackDetails?.muletillas}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            REDUNDANCIA <span style={{ display: 'block' }}>{feedbackDetails?.redundancia}</span>
          </Typography>
          <Divider style={{ margin: '8px 0' }}/>
          <Typography variant="body1" style={{ display: 'block' }}>
            SUGERENCIAS DE MEJORA <span style={{ display: 'block' }}>{feedbackDetails?.sugerencia_mejora}</span>
          </Typography> 
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
        
      </Dialog>

      <LoadingBackdrop loading={loading} message="Cargando Historial" />
    </Container>
  );
}
