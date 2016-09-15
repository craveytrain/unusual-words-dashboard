/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes} from 'react';
import AuthService from '../utils/AuthService'

export const Login = ( { auth } ) => (
    <div className="try-banner">
        <span>Please login</span>
        <button className="btn btn-success" onClick={auth.login.bind(this)}>Login</button>
    </div>
);

Login.PropTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

export default Login;
