import { Outlet } from 'react-router-dom';
import MainNavigation from '../MainNavigationComponent/index';
import './styles.scss';
import useRouteChangeHandler from '../../hooks/useRouteChangeHandler';

const MainLayout = () => {
  useRouteChangeHandler();
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
