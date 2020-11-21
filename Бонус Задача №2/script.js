document.addEventListener( 'DOMContentLoaded', () => {
    'use strict';

    const getResult = ( x, y ) => {
        let result = Math.pow( parseInt( x ), parseInt( y ) );
        return result.toString().split( '' ).reduce( ( x, y ) => +x + +y );
    };
    console.log(getResult( 4, 8 ))

});