import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { PING_QUERY } from '../graphql/ping.query';

const useRouteChangeHandler = () => {
  const location = useLocation();
  const [ping] = useLazyQuery(PING_QUERY, {
    fetchPolicy: 'network-only',
    variables: { path: location.pathname },
  });

  useEffect(() => {
    ping();
  }, [location.pathname]);
};

export default useRouteChangeHandler;
