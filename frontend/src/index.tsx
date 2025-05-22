import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import App from './components/App/App';
import './styles.scss';
import { getAuthToken } from './shared/utils/auth';
import { store } from './store';
import { Provider } from 'react-redux';

const httpLink = createUploadLink({
  uri: '/graphql' || 'http://backend:3001/graphql' || 'http://localhost:3001/graphql',
  credentials: 'include',
});

// Add token into the header
// const authLink = setContext((_, { headers }) => {
//   const token = getAuthToken();
//   return {
//     headers: {
//       ...headers,
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//   };
// });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.warn(`[GraphQL error]: ${message}`, { locations, path });
    });
  }
  if (networkError) {
    console.error(`[Network error]:`, networkError);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: from([errorLink, authLink, httpLink as HttpLink]),
  link: from([errorLink, httpLink as HttpLink]),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
