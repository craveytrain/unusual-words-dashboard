const unusual = ( state, action ) => {
    switch ( action.type ) {
        case 'ADD_UNUSUAL':
            return {
                word: action.word
            };

        case 'ADD_SYNONYMS':
            // this is not the droid you are looking for
            if ( state.word !== action.unusual ) return state;

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
            return action.unusuals.map( word => ( { word } ) );
            // return [
            //     ...action.unusuals
            // ];

        case 'ADD_UNUSUAL':
            return [
                ...state,
                unusual( undefined, action )
            ];

        case 'ADD_SYNONYMS':
            return state.map( u => unusual( u, action ) );
    }

    // otherwise, just return the state
    return state;
}

export default unusuals;
