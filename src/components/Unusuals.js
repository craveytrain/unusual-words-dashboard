import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const Unusuals = ( { unusuals } ) => (
    <div>
        <h1>Unusual Words</h1>
        <ul>
            { unusuals.map( ( unusual, index ) => <li key={index}>{unusual.word}</li> ) }
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
