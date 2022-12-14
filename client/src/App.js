import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import Coffee from './pages/Coffee';
import AddReview from './pages/AddReview';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div className='Page' >
            <Routes>
              <Route 
                path='/'
                element={<Home />}
              />
              <Route 
                path='/login'
                element={<Login />}
              />
              <Route 
                path='/signup'
                element={<Signup />}
              />
              <Route 
                path='/me'
                element={<Profile />}
              />
              <Route 
                path='/profiles/:username'
                element={<Profile />}
              />
              <Route 
              path = '/coffee/:coffeeId'
              element ={<Coffee/>}
              />
              <Route
              path='/search-results/:searchString'
              element={<SearchResults/>}
              />
              <Route
              path='/add-review'
              element={<AddReview/>}
              />
              <Route
              path='/about'
              element={<About/>}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
