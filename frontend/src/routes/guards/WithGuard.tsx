import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type GuardFn = (state: RootState) => boolean;

interface WithGuardProps {
  guards: GuardFn[];
  redirectTo: string;
  children: ReactElement;
}

/**
 * HOC pour protéger un composant avec une ou plusieurs fonctions de garde.
 */
const WithGuard = ({ guards, redirectTo, children }: WithGuardProps) => {
  const location = useLocation();
  const state = useSelector((s: RootState) => s);

  const isAuthorized = guards.every((guard) => guard(state));

  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};

export default WithGuard;
