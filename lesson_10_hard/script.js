'use strict';

// Добавлять новые <li> элементы с текстом из инпута

const button = document.querySelector( 'button' ),
    input = document.querySelector( 'input' ),
    li = document.querySelectorAll( 'li' );

button.addEventListener( 'click', () => {
    let cloneLi = li[0].cloneNode( true );
    cloneLi.textContent = input.value;
    li[0].parentNode.append( cloneLi );
    input.value = '';
});