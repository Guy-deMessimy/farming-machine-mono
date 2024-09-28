import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import MainLayout from './components/MainLayoutComponent/index';
import Layout from './components/LayoutComponent/index';

// Pages
import ErrorPage from './pages/ErrorPage';
import WelcomePage from './pages/WelcomePage/index';
import EnginePage from './pages/EnginePage/index';

import './styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/engines',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <EnginePage />,
          },
        ],
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
