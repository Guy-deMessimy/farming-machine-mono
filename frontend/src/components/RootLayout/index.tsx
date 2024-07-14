import { Outlet } from 'react-router-dom';
import MainNavigation from '../MainNavigation/index';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
