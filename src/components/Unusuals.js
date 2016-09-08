import React from 'react';
import { connect } from 'react-redux';
import config from '../config';

const articles = fetch( config.urls.articles  )
    .then( response => response.json() )
    .then( payload => {
        console.log('payload', payload );
    })
    .catch( err => {
        console.error( err.stack );
    } );

export const Unusuals = props => (
    <h1>Unusual Words</h1>
);

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
};

const UnusualsContainer = connect( mapStateToProps )( Unusuals );

export default UnusualsContainer;
