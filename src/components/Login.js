/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes} from 'react';
import AuthService from '../utils/AuthService'

export const Login = ( { auth } ) => (
    <section className="jumbotron has-header">
      <h1>Please login</h1>
      <button className="btn btn-success btn-lg" onClick={auth.login.bind(this)}>Login</button>
    </section>
);

Login.PropTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

export default Login;
