import { redirect } from 'react-router-dom';

export const logoutAction = () => {
  localStorage.removeItem('token');
  // localStorage.remove('expiration');
  return redirect('/');
};
