import { redirect } from 'react-router-dom';

// Désactivé : gestion de l'expiration
// export const getTokenDuration = () => {
//   const storedExpirationDate: string | null = localStorage.getItem('expiration');
//   const expirationDate: Date | null = storedExpirationDate ? new Date(storedExpirationDate) : null;
//   console.log('BBB expirationDate', expirationDate);
//   const now = new Date();
//   console.log('BBB now', now);
//   let duration;
//   if (expirationDate && !isNaN(expirationDate.getTime())) {
//     duration = expirationDate.getTime() - now.getTime();
//   } else duration = 0;
//   return duration;
// };

export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  // const tokenDuration = getTokenDuration();

  // if (tokenDuration <= 0) {
  //   return 'EXPIRED';
  // }
  return token;
};

export const tokenLoader = () => {
  const token = getAuthToken();
  return token;
};
export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth?mode=login');
  }
  return token;
};
