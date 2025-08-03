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
import SharePage from '../pages/SharePage';
import AccessDeniedPage from '../pages/AccessDenied';

// Route guards
// import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import WithGuard from './guards/WithGuard';
import { isAdmin, isAuthenticated } from './guards/guards';

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
              <WithGuard guards={[isAuthenticated]}>
                <EngineDetailsPage />
              </WithGuard>
            ),
          },
        ],
      },
      {
        path: 'share',
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <WithGuard guards={[isAdmin]}>
                <SharePage />
              </WithGuard>
            ),
          },
        ],
      },
      {
        path: 'logout',
        element: <LogoutPage />,
      },
      {
        path: '/403',
        element: <AccessDeniedPage />, // à toi de créer ça
      },
    ],
  },
]);
