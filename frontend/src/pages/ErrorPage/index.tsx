import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigationComponent/index';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>An error occurred!</h1>
        {isRouteErrorResponse(error) && (
          <p>
            {error.status} {error.statusText}
          </p>
        )}
      </main>
    </>
  );
};

export default ErrorPage;
