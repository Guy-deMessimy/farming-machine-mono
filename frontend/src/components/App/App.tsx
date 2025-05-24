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
import LogoutPage from '../../pages/Logout';

import './styles.scss';
import { publicOnlyLoader } from '../../shared/loaders/public-only-loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/auth',
        element: <AuthenticationPage />,
        // loader: publicOnlyLoader,
      },
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
          },
        ],
      },
      {
        path: 'logout',
        element: <LogoutPage />,
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
