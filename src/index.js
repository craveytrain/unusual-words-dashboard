import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';

import { setWords } from './actions/words';

import App from './components/App';

const initialState = {};

// const store = createStore( reducer );
const store = createStore( reducer, initialState, window.devToolsExtension && window.devToolsExtension() );

// TODO: not sure this goes here. perhaps a middlware pattern is more appropriate?
const articles = fetch( '/articles' )
    .then( response => response.json() )
    .then( articles => {
        return articles.articles.reduce( ( prev, curr ) => {

            // for some reasons, concat is broken, hence the hacky push
            if ( curr.title ) Array.prototype.push.apply( prev, curr.title.split( ' ' ) );

            return prev;
        }, [] );
    } )
    .then( payload => {
        store.dispatch( setWords( payload ) );
    } )
    .catch( err => {
        console.error( err.stack );
    } );


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
