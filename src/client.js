import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import config from './config';

import { setState } from './actions';

import App from './components/App';

const initialState = {};

// const store = createStore( reducer );
const store = createStore( reducer, initialState, window.devToolsExtension && window.devToolsExtension() );

const socket = io( location.origin );

socket.on('state', state =>
  store.dispatch(setState( state ) )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
