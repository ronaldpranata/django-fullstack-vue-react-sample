import { useState } from 'react';
import { ApiService } from './services/api';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

const App = () => {
  const [isAuth, setIsAuth] = useState(ApiService.isAuthenticated());

  const handleLogout = () => {
    ApiService.clearToken();
    setIsAuth(false);
  };

  if (!isAuth) {
    return <LoginPage onLoginSuccess={() => setIsAuth(true)} />;
  }

  return <DashboardPage onLogout={handleLogout} />;
};

export default App;
