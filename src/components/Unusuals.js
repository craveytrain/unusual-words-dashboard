import React from 'react';
import { connect } from 'react-redux';

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
