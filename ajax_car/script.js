document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    select.addEventListener( 'change', () => {
        let body = {};
        postData( body )
            //.then( success => console.log( success ) )
            .then( postData )
            .catch( error => console.error( error ) );
    });

    const postData = ( body ) => {
        return new Promise( ( resolve, reject ) => {
            const request = new XMLHttpRequest();
            request.addEventListener( 'readystatechange', () => {
                if ( request.readyState === 4 && request.status === 200 ) {
                    const data = JSON.parse( request.responseText );
                    data.cars.forEach( item => {
                        if ( item.brand === select.value ) {
                            const { brand, model, price } = item;
                            output.innerHTML = `Тачка ${brand} ${model} <br>
                            Цена: ${price}$`;
                        }
                    });
                }
                else reject( output.innerHTML = 'Произошла ошибка' );
            });
            request.open( 'GET', './cars.json' );
            request.setRequestHeader( 'Content-Type', 'application/json' );
            request.send( JSON.stringify( body ) );
        });
    };

});