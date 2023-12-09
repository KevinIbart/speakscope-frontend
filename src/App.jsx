import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FeedbackPage } from './pages/FeedbackPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

import { useAuth } from './context/AuthContext'; 
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { HistoryPage } from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { user } =  useAuth();
  
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}>
            <Route path="transcription" element={<TranscriptionPage/>} />
            <Route path="feedback" element={<FeedbackPage/>} />
            <Route path="history" element={<HistoryPage/>} />
            <Route path="profile" element={<ProfilePage/>} />
          </Route>

          <Route
            path="home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="home" />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
