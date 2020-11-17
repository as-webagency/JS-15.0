document.addEventListener( 'DOMContentLoaded', () => {
    'use strict';

    const body = document.querySelector( 'body' );

    function DomElement( height, width, background, position ) {
        this.height = height;
        this.width = width;
        this.background = background;
        this.position = position;
    }

    DomElement.prototype.createElem = function () {
        let div = document.createElement( 'div' );
        div.className = 'block';
        div.style.cssText = `
            height: ${this.height}px;
            width: ${this.width}px;
            background-color: ${this.background};
            position: ${this.position};
        `;
        document.body.prepend( div );
        
        const moveFunc = ( event ) => {
            console.log('event.code: ', event.code);
            if ( event.code === 'ArrowUp' ) {
                div.style.top = 10 + 'px';
            }
            if ( event.code === 'ArrowRight' ) {
                div.style.right = 10 + 'px';
            }
            if ( event.code === 'ArrowLeft' ) {
                div.style.left = 10 + 'px';
            }
            if ( event.code === 'ArrowDown' ) {
                div.style.bottom = 10 + 'px';
            }
        };

        document.addEventListener( 'keydown', moveFunc );
    };

    const domElement = new DomElement( 100, 100, 'red', 'absolute' );
    domElement.createElem();
});