import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { fetchUnusuals } from './actions/unusuals';

export default function makeStore() {
    const store = createStore(
        reducer,
        applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        )
    );

    store.dispatch( fetchUnusuals );

    return store;
}
