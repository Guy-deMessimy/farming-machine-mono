import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes/router';
import './styles.scss';

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
