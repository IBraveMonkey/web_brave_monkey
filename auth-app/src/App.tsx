import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
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

function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <Router>
          <div className="app">
            <div className="main-content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <DashboardPage />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <ProfilePage />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chats"
                  element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <ChatsPage />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/api-status"
                  element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <APIsProviderStatus />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<LoginPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </I18nProvider>
    </AuthProvider>
  );
}

export default App;