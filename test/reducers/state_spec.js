import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/state';
import { setState } from '../../src/actions/state';

describe( 'state reducer', () => {
    it( 'handles SET_STATE', () => {
        const initialState = {
            hello: 'there'
        };
        deepFreeze(initialState);

        const nextState = reducer( initialState, setState( { holas: 'amigos' } ) );

        expect( nextState ).to.deep.equal( { holas: 'amigos' } );
    } );
} );
