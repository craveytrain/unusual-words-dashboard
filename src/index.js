import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';

import App from './components/App';

const initialState = {
};

// const store = createStore( reducer );
const store = createStore( reducer, initialState, window.devToolsExtension && window.devToolsExtension() );

// const routes = <Route component={App}>
//     <Route path="/" component={ChoresContainer}/>
// </Route>;

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
