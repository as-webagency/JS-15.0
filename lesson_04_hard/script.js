'use strict';

let str = prompt( 'Введите что-то: ', '' );
function oneArguments( myArgyment ) {

    if ( myArgyment ) {
        myArgyment = myArgyment.trim();
    }

    if ( str === Number( myArgyment ) ) {
        return ( 'Передана не строка :(' );
    } else {
        if ( myArgyment.length > 30 ) {
            myArgyment = myArgyment.slice(0, 30) + '...';
            return myArgyment;
        } else {
            return myArgyment;
        }
    }
}
console.log( oneArguments( str ) );