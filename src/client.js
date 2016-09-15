import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import io from 'socket.io-client';
import config from './config';
import Root from './components/Root';

import { setState } from './actions';

const store = createStore( reducer );
// const store = createStore( reducer, window.devToolsExtension && window.devToolsExtension() );

const socket = io( location.origin );

socket.on('state', state =>
  store.dispatch(setState( state ) )
);

render(<Root store={store} />, document.getElementById('app') );
