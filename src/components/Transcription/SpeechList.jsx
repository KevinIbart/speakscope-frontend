import { useCallback, useEffect, useState } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import LoadingBackdrop from './LoadingBackdrop';
import { Delete, MenuOpen } from '@mui/icons-material';

export function SpeechList() {
  const [speechHistory, setSpeechHistory] = useState([]);
  const [selectedSpeech, setSelectedSpeech] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://apis.speakscope.tech/discurso/discurso/');
      setSpeechHistory(response.data);
    } catch (error) {
      console.error('Error getting history:', error.response?.status, error.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('History loading state set to false');
    }
  }, []);

  const selectSpeechFromHistory = (speech) => {
    setSelectedSpeech(speech);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  const handleDeleteSpeech = () => {
    const { id } = selectedSpeech;

    console.log('Deleting speech:', selectedSpeech);

    axios.delete(`https://apis.speakscope.tech/discurso/discurso/${id}`)
      .then((response) => {
        console.log('Speech deleted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting speech:', error.response?.status, error.response?.data || error.message);
      });
  };

  useEffect(() => {
    handleHistory();
  }, [handleHistory]);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'resumen', headerName: 'Resumen', flex: 2 },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button variant="outlined" color="primary" onClick={() => selectSpeechFromHistory(params.row)}>
            <MenuOpen/>
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDeleteSpeech}>
            <Delete/>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container sx={{ paddingTop: '2rem', width: '200%' }}> {/* Set width as needed */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={speechHistory}
          columns={columns}
          pageSize={5}
          onSelectionModelChange={(newSelection) => {
            if (newSelection.selectionModel.length > 0) {
              const selectedIndex = newSelection.selectionModel[0];
              selectSpeechFromHistory(speechHistory[selectedIndex]);
            }
          }}
        />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Discurso</DialogTitle>
        <DialogContent>
          <Typography variant="body1">ID: {selectedSpeech?.id}</Typography>
          <Divider/>
          <Typography variant="body1">Resumen: {selectedSpeech?.resumen}</Typography>
          <Divider/>
          <Typography variant="body1">Transcripción: {selectedSpeech?.transcripcion}</Typography>
          <Divider/>
          <Typography variant="body1">Palabras Clave: {selectedSpeech?.palabrasClave}</Typography>
          <Divider/>
          <Typography variant="body1">Ideas Clave: {selectedSpeech?.ideasClave}</Typography>
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
