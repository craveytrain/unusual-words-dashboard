import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthService from '../utils/AuthService';

const Header = ( { auth }, context ) => {
    let logout = () => {
        auth.logout(this);
        context.router.push('/login');
    }
    let logoutButton;

    if (auth.isLoggedIn()) logoutButton = (<div className="navbar-toggle"><button className="btn btn-success btn-sm" onClick={logout}>Logout</button></div>);

    return (
        <header className="site-header">
          <nav role="navigation" className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                {logoutButton}
                <h1 className="navbar-brand">
                  <a href="https://auth0.com/"><span>Auth0</span></a>
                </h1>
              </div>
            </div>
          </nav>
        </header>
    );
}

Header.contextTypes = {
  router: PropTypes.object
};

Header.PropTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

export default Header;
