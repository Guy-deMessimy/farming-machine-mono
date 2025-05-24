import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../MainNavigationComponent/index';
import './styles.scss';

const MainLayout = () => {
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
