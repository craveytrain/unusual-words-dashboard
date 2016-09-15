import React from 'react';

const Unusual = ( { word, children } ) => {
    let subList;

    if ( children && children.length ) {
        subList = (<ul className="list-inline"> { children.map( ( child, index ) => <li key={index}>{child}</li> ) } </ul>);
    } else {
        subList = (<p className="no-alt">Sorry, no alternatives available.</p>)
    }

    return (
        <article>
            <h2>{word}</h2>
            {subList}
        </article>
    );
}

export default Unusual;
