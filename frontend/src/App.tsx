import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutComponent from './components/LayoutComponent/index';
import ErrorPage from './pages/ErrorPage';
import WelcomePage from './pages/WelcomePage/index';
import MachineLayout from './components/MachineLayout/index';
import MachinePage from './pages/MachinePage/index';
import './styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/machines',
        element: <MachineLayout />,
        children: [
          {
            index: true,
            element: <MachinePage />,
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
