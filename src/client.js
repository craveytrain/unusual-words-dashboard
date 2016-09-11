import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/state';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import config from './config';

import { setState } from './actions/state';

import App from './components/App';

const initialState = {};

// const store = createStore( reducer );
const store = createStore( reducer, initialState, window.devToolsExtension && window.devToolsExtension() );

// TODO: not sure this goes here. perhaps a middlware pattern is more appropriate?

const socket = io(`${location.protocol}//${location.hostname}:${config.servers.websocket.port}`);

socket.on('state', state =>
  store.dispatch(setState( state ) )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
