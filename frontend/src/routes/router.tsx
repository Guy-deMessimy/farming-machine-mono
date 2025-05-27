import { createBrowserRouter } from 'react-router-dom';

// Layout
import MainLayout from '../components/MainLayoutComponent/index';
import Layout from '../components/LayoutComponent/index';

// Pages
import ErrorPage from '../pages/ErrorPage';
import WelcomePage from '../pages/WelcomePage/index';
import EnginePage from '../pages/EnginePage/index';
import EngineDetailsPage from '../pages/EnginePage/components/EngineDetails';
import AuthenticationPage from '../pages/Authentication';
import LogoutPage from '../pages/Logout';

// Route guards
// import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import WithGuard from './guards/WithGuard';
import { isAuthenticated } from './guards/guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/auth',
        element: (
          <PublicOnlyRoute>
            <AuthenticationPage />
          </PublicOnlyRoute>
        ),
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
            // element: (
            //   <PrivateRoute>
            //     <EngineDetailsPage />
            //   </PrivateRoute>
            // ),
            element: (
              <WithGuard guards={[isAuthenticated]} redirectTo="/auth?mode=signin">
                <EngineDetailsPage />
              </WithGuard>
            ),
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
