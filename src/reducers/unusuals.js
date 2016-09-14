const unusual = ( state, action ) => {
    // this is not the droid you are looking for
    if ( state.word !== action.word ) return state;

    switch ( action.type ) {

        case 'ADD_SYNONYMS':
            // object spread makes this nice and clean


            return {
                ...state,
                synonyms: action.synonyms
            };
    }

    // otherwise, just return the state
    return state;
};

const unusuals = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_UNUSUALS':
            return action.words.map( word => {
                return { word };
            } );

        case 'ADD_SYNONYMS':
            return state.map( u => unusual( u, action ) );
    }

    // otherwise, just return the state
    return state;
}

export default unusuals;
