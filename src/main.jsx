import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { CssBaseline, createTheme, ThemeProvider} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from './context/AuthContext.jsx';
const theme = createTheme({
  palette:{
    mode: "light",
    primary: {
      main:"#1a4ed2"} 
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline/>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>,
)
