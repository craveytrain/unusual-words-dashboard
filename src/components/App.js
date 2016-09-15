import React from 'react';
// import React, { PropTypes as T } from 'react';
import Footer from './Footer';
import Header from './Header';

export default ( props ) => {
    let children = null;
    if (props.children) {
      children = React.cloneElement(props.children, {
        auth: props.route.auth //sends auth instance to children
      })
    }

    return (
    <div>
        <Header auth={props.route.auth} />
        {children}
        <Footer />
    </div>
    );
}
