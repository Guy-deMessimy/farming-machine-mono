import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigationComponent/index';
import './styles.scss';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <MainNavigation />
      <main id="error-content">
        <h1>An error occurred!</h1>
        {isRouteErrorResponse(error) && (
          <p>
            {error.status} {error.statusText}
          </p>
        )}
      </main>
    </div>
  );
};

export default ErrorPage;
