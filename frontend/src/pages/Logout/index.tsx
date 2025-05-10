import { redirect } from 'react-router-dom';
import { ApolloClient } from '@apollo/client';

export const logoutAction = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  //await client.clearStore(); // supprime tout le cache Apollo
  window.location.href = '/auth?mode=login';
  return null;
};
