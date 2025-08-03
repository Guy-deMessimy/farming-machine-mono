import { RootState } from '../../store';

export const isAuthenticated = (state: RootState): boolean => {
  return !!state.auth?.isAuthenticated;
};

export const isAdmin = (state: RootState): boolean => {
  return state.auth?.user?.role === 'ADMIN';
};

export const has2FAEnabled = (state: RootState): void => {
  console.log('🚀 ~ isAdmin ~ state:', state);
};

export const hasCompleted2FA = (state: RootState): void => {
  console.log('🚀 ~ isAdmin ~ state:', state);
};
