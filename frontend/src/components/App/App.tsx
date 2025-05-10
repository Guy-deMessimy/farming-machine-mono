import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import MainLayout from '../MainLayoutComponent/index';
import Layout from '../LayoutComponent/index';

// Pages
import ErrorPage from '../../pages/ErrorPage';
import WelcomePage from '../../pages/WelcomePage/index';
import EnginePage from '../../pages/EnginePage/index';
import EngineDetailsPage from '../../pages/EnginePage/components/EngineDetails';
import AuthenticationPage from '../../pages/Authentication';
import { logoutAction } from '../../pages/Logout';
import { checkAuthLoader, tokenLoader } from '../../shared/utils/auth';

import './styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: '/auth', element: <AuthenticationPage /> },
      {
        path: '/engines',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <EnginePage />,
          },
          {
            path: '/engines/:id',
            element: <EngineDetailsPage />,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'logout',
        action: logoutAction,
        // action: () => logoutAction(),
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
