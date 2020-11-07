'use strict';

function DomElement( selector, height, width, background, fontSize, textInner ) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.background = background;
    this.fontSize = fontSize;
    this.textInner = textInner;
}

DomElement.prototype.createElem = function () {
    if ( this.selector.charAt(0) === '.' ) {
        let div = document.createElement( 'div' );
        div.classList.add( this.selector.substr(1) );
        div.style.cssText = `
            height: ${this.height}px;
            width: ${this.width}px;
            background-color: ${this.background};
            font-size: ${this.fontSize}px;
        `;
        div.textContent = this.textInner;
        document.body.prepend(div);
    } else if ( this.selector.charAt(0) === '#' ) {
        let p = document.createElement( 'p' );
        p.id = this.selector.substr(1);
        document.body.prepend(p);
    }
};

let domElement = new DomElement( '.block', 150, 200, 'red', 30, 'hello world!!!' );
domElement.createElem();