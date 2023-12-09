import { Grid, Button, Typography } from '@mui/material';
import { FastRewind, PlayArrow, FastForward } from '@mui/icons-material';

export default function WaveformDisplay({ file, waveformRef, wavesurferRef }) {
  const handleAudioAction = (action, value = 10) => {
    if (!wavesurferRef.current) return;
    switch (action) {
      case 'playPause':
        wavesurferRef.current.isPlaying() ? wavesurferRef.current.pause() : wavesurferRef.current.play();
        break;
      case 'forward':
        wavesurferRef.current.seekTo(Math.min(wavesurferRef.current.getCurrentTime() + value, 1));
        break;
      case 'rewind':
        wavesurferRef.current.seekTo(Math.max(wavesurferRef.current.getCurrentTime() - value, 0));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" paddingTop="1rem" align="center" gutterBottom>
          {file.name}
        </Typography>
        <div ref={waveformRef}></div>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {[{ action: 'rewind', icon: <FastRewind /> }, { action: 'playPause', icon: <PlayArrow /> }, { action: 'forward', icon: <FastForward /> }].map(
          (button) => (
            <Button key={button.action} onClick={() => handleAudioAction(button.action)}>
              {button.icon}
            </Button>
          )
        )}
      </Grid>
    </>
  );
}
