import request from 'request-promise';
import config from './config';
import { setUnusuals } from './actions/unusuals';

export default store => {
    request( {
            uri: config.urls.articles,
            transform: response => JSON.parse( response )
        } )
        .then( articles => {
            return articles.articles.reduce( ( prev, curr ) => {

                // for some reasons, concat is broken, hence the hacky push
                if ( curr.title ) Array.prototype.push.apply( prev, curr.title.split( ' ' ) );

                return prev;
            }, [] );
        } )
        .then( payload => {
            store.dispatch( setUnusuals( payload ) );
        } )
        .catch( err => {
            throw( err.stack );
        } );


}
