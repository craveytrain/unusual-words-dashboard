import request from 'request-promise';
import config from '../config';
import { addSynonyms } from './unusuals';
import storage from '../storage';

const bigHugeAPIKey = process.env.BIGHUGE_APIKEY;

if ( !bigHugeAPIKey ) throw('No Big Huge API Key');

const cacheExpires = 31536000; // seconds in 1 year

export default word => {
    return dispatch => {
        // This is a bit dirty, but helps preserve order and arguments
        storage.existsAsync( word )
            .then( results => {
                // If we have it cached, use it
                if ( results ) return results;

                // If there are no results, fetch and cache them
                if ( !results ) {
                    return request( {
                        uri: `http://words.bighugelabs.com/api/2/${bigHugeAPIKey}/${word}/json`
                    } )
                    .catch() // trap all those errors and shunt them away
                    .then( response => {
                        return Object.entries( JSON.parse( response ) ).reduce( ( prev, curr ) => {
                            let syns = curr[ 1 ].syn;

                            if ( syns ) return prev.concat( syns );

                            return prev;
                        }, [] );
                    } )
                    .then( synonyms => {
                        // cache as a set
                        storage.saddAsync( [ word, ...synonyms ] );

                        // expire it in 1 year, the english langauge is pretty stable
                        storage.expireAsync( word,  cacheExpires );
                    } )
                }
            } )
            .then( () => storage.smembersAsync( word ) ) // using redis set to dedupe and cache, so just fetch
            .catch( response => ( [ ] ) )
            .then( synonyms => synonyms.sort() ) // Alpha sort since redis sets don't preserve order
            .then( synonyms => {
                dispatch( addSynonyms( word, synonyms ) ); // fire the action
                return synonyms;
            } )
            .catch( err => {
                console.log( err.stack )
            } );
    }
};
