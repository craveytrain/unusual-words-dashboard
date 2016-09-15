import React, { PropTypes } from 'react';
import { Router, hashHistory, Route, IndexRedirect } from 'react-router';
import AuthService from '../utils/AuthService';
import { Provider } from 'react-redux';

import App from './App';
import Login from './Login';
import Unusuals from './Unusuals';

const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, hashHistory);

// onEnter callback to validate authentication in private routes
const requireAuth = ( nextState, replace ) => {
  if ( !auth.loggedIn() ) {
    replace( { pathname: '/login' } )
  }
}

const Root = ( { store } ) => (
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App} auth={auth}>
            <IndexRedirect to="/words" />
            <Route path="words" component={Unusuals} onEnter={requireAuth} />
            <Route path="login" component={Login} />
            <Route path="access_token=:token" component={Login} /> //to prevent router errors
        </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
