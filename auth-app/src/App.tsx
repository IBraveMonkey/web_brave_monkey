import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage/VerifyEmailPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import APIsProviderStatus from './pages/APIsProviderStatus/APIsProviderStatus';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import DownloadPage from './pages/DownloadPage/DownloadPage';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <ThemeProvider>
          <Router>
            <div className="app">
              <Header />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/chats" element={
                    <ProtectedRoute>
                      <ChatsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/api-status" element={
                    <ProtectedRoute>
                      <APIsProviderStatus />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </I18nProvider>
    </AuthProvider>
  );
}

export default App;