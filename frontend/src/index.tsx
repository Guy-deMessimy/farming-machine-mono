import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { store } from './store';
import { Provider } from 'react-redux';
import App from './components/App/App';
import './styles.scss';

const httpLink = createUploadLink({
  uri: '/graphql' || 'http://backend:3001/graphql' || 'http://localhost:3001/graphql',
  credentials: 'include',
});

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
