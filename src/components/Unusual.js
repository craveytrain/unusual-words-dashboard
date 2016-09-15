import React from 'react';

const Unusual = ( { word, children } ) => {
    let subList;

    if ( children ) {
        if ( children.length ) {
            subList = (<p>{ children.join( ', ' ) }</p>);
        } else {
            subList = (<p className="no-alt">Sorry, no alternatives available.</p>);
        }
    } else {
        subList = (<div className="spinner spinner-sm"><div className="circle"></div></div>);
    }

    return (
        <article>
            <h2>{word}</h2>
            {subList}
        </article>
    );
}

export default Unusual;
