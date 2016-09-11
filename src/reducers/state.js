const reducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case 'SET_STATE':
            return {
                ...action.state
            };
    }

    // otherwise, just return the state
    return state;
}

export default reducer;
