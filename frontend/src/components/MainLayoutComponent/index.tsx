import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../MainNavigationComponent/index';
import './styles.scss';
// import { getTokenDuration } from '../../shared/utils/auth';

const MainLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: 'logout', method: 'post' });
    }

    // const tokenDuration = getTokenDuration();
    // console.log('AAA token duration', tokenDuration);

    // setTimeout(() => {
    //   submit(null, { action: 'logout', method: 'post' });
    // }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
