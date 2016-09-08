const words = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_WORDS':
            return [
                ...action.words.slice(0, 100)
            ];
    }

    // otherwise, just return the state
    return state;
}

export default words;
