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
        
        let parties = 0;
        const moveFunc = ( event ) => {
            if ( event.code === 'ArrowUp' ) {
                parties -= 10;
                div.style.top = `${parties}px`;
            } 
            if ( event.code === 'ArrowDown' ) {
                parties += 10;
                div.style.top = `${parties}px`;
            } 
            if ( event.code === 'ArrowRight' ) {
                parties += 10;
                div.style.left = `${parties}px`;
            }
            if ( event.code === 'ArrowLeft' ) {
                parties -= 10;
                div.style.left = `${parties}px`;
            }
        };
        document.addEventListener( 'keydown', moveFunc );
    };

    const domElement = new DomElement( 100, 100, 'red', 'absolute' );
    domElement.createElem();
});