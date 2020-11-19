const togglePopup = () => {
    const popup = document.querySelector( '.popup' ),
        popupBtn = document.querySelectorAll( '.popup-btn' ),
        popupContent = document.querySelector( '.popup > .popup-content' );

    const popupAnimate = () => {
        let startAnimate = Date.now();
        const loop = ( now ) => {
            let timePassed = now - startAnimate;
            popupContent.style.top = timePassed / 6 + "px";
            if ( timePassed > 3000 ) return;
            requestAnimationFrame( loop );
        };
        requestAnimationFrame( loop );
    };

    popupBtn.forEach( item => {
        item.addEventListener( 'click', () => {
            popup.style.display = 'block';
            if ( window.screen.width >= 769 ) {
                popupAnimate();
            }
        });
    });

    popup.addEventListener( 'click', ( event ) => {
        let target = event.target;

        if ( target.classList.contains( 'popup-close' ) ) popup.style.display = 'none';
        else {
            target = target.closest( '.popup-content' );
            if ( !target ) popup.style.display = 'none';
        }
    });
};

export default togglePopup;