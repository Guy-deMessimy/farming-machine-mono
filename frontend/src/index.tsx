import React from 'react';
import ReactDOM from 'react-dom/client';
// Apollo client
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink, fromPromise } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
// Redux store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './components/App/App';
import { REFRESH_TOKEN_MUTATION } from './graphql/authentication/mutation/refresh-token.mutation';
import './styles.scss';

const httpLink = createUploadLink({
  uri: '/graphql' || 'http://backend:3001/graphql' || 'http://localhost:3001/graphql',
  credentials: 'include',
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.warn(`[GraphQL error]: ${message}`, { locations, path });
    });
  }
  const hasAuthError = graphQLErrors?.some(
    (err) => err.message === 'Invalid or expired token' || err.extensions?.code === 'UNAUTHENTICATED',
  );

  if (hasAuthError) {
    if (!isRefreshing) {
      isRefreshing = true;
      return fromPromise(
        client
          .mutate({ mutation: REFRESH_TOKEN_MUTATION })
          .then(() => {
            resolvePendingRequests();
          })
          .catch(() => {
            console.error('Mutation refresh token failed');
          })
          .finally(() => {
            isRefreshing = false;
          }),
      ).flatMap(() => forward(operation));
    } else {
      // lorsqu'une erreur d'authentification est detectée et qu'un rafraichissement est deja en cours alors la reqeuete est mise en attente dans pendingRequest
      return fromPromise(
        new Promise<void>((resolve) => {
          pendingRequests.push(() => resolve());
        }),
      ).flatMap(() => forward(operation));
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink as HttpLink]),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
