import { Outlet } from 'react-router-dom';
import MainNavigation from '../MainNavigationComponent/index';

const LayoutComponent = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutComponent;
