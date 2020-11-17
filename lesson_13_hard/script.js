'use strict';

const button = document.getElementById( 'change' );
    //letters = '0123456789ABCDEFGHJKLMNPQRSTVWXYZabcdefghjklmnpqrstvwxyz';

let color = document.getElementById( 'color' ),
    wrapper = document.querySelector( '.wrapper' ),
    setRandomColor;

const getRandomColor = ( elementColor = '#' ) => elementColor += parseInt( Math.random() * 0xffffff ).toString( 16 );

button.addEventListener( 'click', () => {
    setRandomColor = getRandomColor();
    color.textContent = setRandomColor;
    wrapper.style.backgroundColor = setRandomColor;
    button.style.color = setRandomColor;
});