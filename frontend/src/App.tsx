import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/RootLayout/index';
import ErrorPage from './pages/ErrorPage';
import WelcomePage from './pages/WelcomePage/index';
import MachineLayout from './components/MachineLayout/index';
import MachinePage from './pages/MachinePage/index';
// import * as Styled from './app-styled';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
