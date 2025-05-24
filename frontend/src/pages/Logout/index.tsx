import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch } from '../../store/hooks';
import { clearUser } from '../../store/slices/user/user-slice';
import './styles.scss';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      dispatch(clearUser());
      navigate('/auth?mode=login');
    };

    performLogout();
  }, []);

  return <p className="logout-message">Déconnexion en cours...</p>;
};

export default LogoutPage;
