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
                // return early with the new words if there is a title
                if (curr.title) return prev.concat( curr.title.split( ' ' ) );

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
