import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/words';
import { setWords } from '../../src/actions/words';

describe( 'words reducer', () => {
    it( 'handles SET_WORDS', () => {
        const initialState = [ 'weird' ];
        deepFreeze(initialState);

        const nextState = reducer( initialState, setWords( [ 'normal' ] ) );

        expect( nextState ).to.deep.equal( [ 'normal' ] );
    } );
} );
