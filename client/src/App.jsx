import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import User from './components/User';
import Header from './components/Header';
import AddUserModal from './components/AddUserModal';

// If any warning in console related to caching

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  // cache: new InMemoryCache()
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddUserModal />
          <User />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
