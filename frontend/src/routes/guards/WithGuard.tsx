import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { isAuthenticated } from './guards';

type GuardFn = (state: RootState) => boolean;

interface WithGuardProps {
  guards: GuardFn[];
  children: ReactElement;
}

/**
 * HOC pour protéger un composant avec une ou plusieurs fonctions de garde.
 */
const WithGuard = ({ guards, children }: WithGuardProps) => {
  const location = useLocation();
  const state = useSelector((s: RootState) => s);
  const isAuth = isAuthenticated(state);

  const isAuthorized = guards.every((guard) => guard(state));

  if (!isAuth) {
    return <Navigate to="/auth?mode=signin" replace state={{ from: location }} />;
  }
  if (!isAuthorized) {
    return <Navigate to="/403" replace state={{ from: location }} />;
  }

  return children;
};

export default WithGuard;
