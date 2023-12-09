import { Backdrop, CircularProgress, Typography } from '@mui/material';

export default function LoadingBackdrop({ loading, message }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
      <Typography
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '2rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
    </Backdrop>
  );
}
