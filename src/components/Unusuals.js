import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Unusual from './Unusual';

export const Unusuals = ( { unusuals } ) => (
    <div>
        <h1>Unusual Words</h1>
        <ul>
            { unusuals.map( ( unusual, index ) => <Unusual key={index} word={unusual.word} children={unusual.synonyms} /> ) }
        </ul>
    </div>
);

Unusuals.propTypes = {
  unusuals: PropTypes.arrayOf( PropTypes.shape( {
    word: PropTypes.string.isRequired,
    synonyms: PropTypes.array
  } ).isRequired ).isRequired
};

const mapStateToProps = state => ( {
    unusuals: state.unusuals || []
} );

const UsualsContainer = connect( mapStateToProps )( Unusuals );

export default UsualsContainer;
