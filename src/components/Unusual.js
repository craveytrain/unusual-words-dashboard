import React from 'react';

// const Unusual = ( word, synonyms ) => (
const Unusual = ( { word, children } ) => {
    let subList;

    if ( children && children.length ) {
        subList = (<ul> { children.map( ( child, index ) => <li key={index}>{child}</li> ) } </ul>);
    }

    return (
        <li>
            {word}
            {subList}
        </li>
    );
}

export default Unusual;
