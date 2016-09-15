import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Unusual from './Unusual';

export const Unusuals = ( { unusuals } ) => (
    <div>
        <section className="jumbotron has-header">
          <h1>Unusual Words</h1>
          <p>Some unusual words used in the titles on the Auth0 blog with some alternative words.</p>
        </section>
        { unusuals.map( ( unusual, index ) => <Unusual key={index} word={unusual.word} children={unusual.synonyms} /> ) }
    </div>
);

Unusuals.PropTypes = {
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
