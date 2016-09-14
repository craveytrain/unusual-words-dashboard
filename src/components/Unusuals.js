import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Unusual from './Unusual';

export const Unusuals = ( { unusuals } ) => (
    <div>
        { unusuals.map( ( unusual, index ) => <Unusual key={index} word={unusual.word} children={unusual.synonyms} /> ) }
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
