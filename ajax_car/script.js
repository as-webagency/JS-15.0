document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById( 'cars' ),
        output = document.getElementById( 'output' );

    select.addEventListener( 'change', () => {
        return new Promise( () => {
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
                else output.innerHTML = 'Произошла ошибка';
            });
            request.open( 'GET', './cars.json' );
            request.setRequestHeader( 'Content-Type', 'application/json' );
            request.send();
        });
    });

});