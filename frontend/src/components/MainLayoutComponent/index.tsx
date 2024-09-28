import { Outlet } from 'react-router-dom';
import MainNavigation from '../MainNavigationComponent/index';

const MainLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
