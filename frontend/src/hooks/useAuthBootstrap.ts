// src/hooks/useAuthBootstrap.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useCurrentUser } from './useGetCurrentUser';
import { setCredentials, clearCredentials } from '../store/slices/auth/auth-slice';

type Options = {
  redirectIfAuthenticated?: boolean;
};

export const useAuthBootstrap = ({ redirectIfAuthenticated = false }: Options = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useCurrentUser();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (user) {
      dispatch(setCredentials({ user }));
      if (redirectIfAuthenticated) {
        navigate('/', { replace: true });
      }
    } else {
      dispatch(clearCredentials());
    }

    setBootstrapped(true);
  }, [loading, user, error]);

  return { bootstrapped };
};
