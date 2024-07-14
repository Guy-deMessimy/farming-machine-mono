import { isRouteErrorResponse, useRouteError } from 'react-router-dom'; // import MainNavigation from '../components/MainNavigation';
// import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <p>coucou</p>
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
