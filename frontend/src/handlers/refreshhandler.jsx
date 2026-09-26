import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import authService from '../services/authService';

function Refreshhandler({ SetIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = authService.isAuthenticated();
    SetIsAuthenticated(isAuth);

    if (isAuth && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/panel');
    }
  }, [location.pathname, SetIsAuthenticated, navigate]);

  return null;
}

export default Refreshhandler;
