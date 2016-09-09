import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/unusuals';
import { setUnusuals, addUnusual, addSynonyms } from '../../src/actions/unusuals';

describe( 'unusuals reducer', () => {
    it( 'handles SET_UNUSUALS', () => {
        const initialState = [ 'normal' ];
        deepFreeze(initialState);

        const nextState = reducer( initialState, setUnusuals( [ 'weird' ] ) );

        expect( nextState ).to.deep.equal( [ { word: 'weird' } ] );
    } );

    it( 'handles ADD_UNUSUAL', () => {
        const initialState = [
            { word: 'weird' }
        ];
        deepFreeze(initialState);

        const nextState = reducer( initialState, addUnusual( 'normal' ) );

        expect( nextState ).to.deep.equal( [
            { word: 'weird' },
            { word: 'normal' }
        ] );
    } );

    it( 'handles ADD_SYNONYMS', () => {
        const initialState = [
            { word: 'weird' },
            { word: 'normal' }
        ];
        deepFreeze(initialState);

        const nextState = reducer( initialState, addSynonyms( 'weird', [ 'abnormal', 'unusual' ] ) );

        expect( nextState ).to.deep.equal( [
            {
                word: 'weird',
                synonyms: [
                    'abnormal',
                    'unusual'
                ]
            },
            {
                word: 'normal'
            }
        ] );
    } );


    it( 'can be used with reduce', () => {
        const initialState = [ 'weird' ];
        deepFreeze( initialState );

        const actionQueue = [
            setUnusuals( initialState ),
            addUnusual( 'normal' ),
            addSynonyms( 'weird', [ 'abnormal', 'unusual' ] )
      ];
        const finalState = actionQueue.reduce( reducer, [] );

        expect( finalState ).to.deep.equal( [
            {
                word: 'weird',
                synonyms: [
                    'abnormal',
                    'unusual'
                ]
            },
            {
                word: 'normal'
            }
        ] );
    } );
} );
