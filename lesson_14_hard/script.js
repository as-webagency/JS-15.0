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
        
        let partiesX = 0, partiesY = 0;
        const moveFunc = ( event ) => {
            if ( event.code === 'ArrowUp' ) {
                partiesX -= 10;
                div.style.top = `${partiesX}px`;
            } 
            if ( event.code === 'ArrowDown' ) {
                partiesX += 10;
                div.style.top = `${partiesX}px`;
            } 
            if ( event.code === 'ArrowRight' ) {
                partiesY += 10;
                div.style.left = `${partiesY}px`;
            }
            if ( event.code === 'ArrowLeft' ) {
                partiesY -= 10;
                div.style.left = `${partiesY}px`;
            }
        };
        document.addEventListener( 'keydown', moveFunc );
    };

    const domElement = new DomElement( 100, 100, 'red', 'absolute' );
    domElement.createElem();
});