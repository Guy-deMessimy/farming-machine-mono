import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch } from '../../store/hooks';
import { clearCredentials } from '../../store/slices/auth/auth-slice';
import './styles.scss';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      dispatch(clearCredentials());
      navigate('/auth?mode=login');
    };

    performLogout();
  }, []);

  return <p className="logout-message">Déconnexion en cours...</p>;
};

export default LogoutPage;
