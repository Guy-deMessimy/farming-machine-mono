import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const uploadLink = createUploadLink({
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
  uri: process.env.REACT_APP_API_URI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, uploadLink]),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
