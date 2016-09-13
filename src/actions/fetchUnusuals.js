import request from 'request-promise';
import config from '../config';
import { setUnusuals, fetchSynonyms } from './unusuals';
import storage from '../storage';

const cacheKey = 'APP_UNUSUAL_WORDS';
const cacheExpires = 86400; // seconds in 24 hours

export default dispatch => {
    // This is a bit dirty, but helps preserve order and arguments
    storage.existsAsync( cacheKey )
        .then( results => {
            // If we have it cached, use it
            if ( results ) return results;

            // If there are no results, fetch and cache them
            if ( !results ) {
                return request( {
                    uri: config.urls.articles,
                    transform: response => JSON.parse( response )
                } )
                .then( articles => {
                    return articles.articles.reduce( ( prev, curr ) => {
                        if (curr.title) {
                            // take it lowercase and strip out non-valid characters
                            let title = curr.title.toLowerCase().replace(/[^0-9a-z\-\s]/gi, '').split( ' ' );
                            // return early with the new words if there is a title
                            return prev.concat( title );
                        }

                        return prev;
                    }, [] );
                } )
                // .then( words => { //TODO: spacer for better word processing algo} )
                .then( words => {
                    // cache as a set
                    storage.saddAsync( [ cacheKey, ...words ] );
                    // expire it in 24 hours
                    return storage.expireAsync( cacheKey,  cacheExpires );
                } )
            }
        } )
        .then( () => storage.smembersAsync( cacheKey ) ) // using redis set to dedupe and cache, so just fetch
        .then( words => words.sort() ) // Alpha sort since redis sets don't preserve order
        .then( words => {
            dispatch( setUnusuals( words ) ); // save to state
            return words;
        } )
        .then( words => {
            dispatch( fetchSynonyms( words ) ); // start getting the synonyms
            return words;
        } )
        .catch( err => {
            throw( err.stack );
        } );
}
