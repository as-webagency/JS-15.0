window.addEventListener( 'DOMContentLoaded', () => {
	'use strict';

    // Timer
	const countTimer = ( deadLine ) => {
        const timerHours = document.querySelector( '#timer-hours' ),
            timerMinutes = document.querySelector( '#timer-minutes' ),
            timerSeconds = document.querySelector( '#timer-seconds' );

        let idInterval;
            
        const getTimeRemaining = () => {
            const dateStop = new Date( deadLine ).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = ( dateStop - dateNow ) / 1000,
                seconds = Math.floor( timeRemaining % 60 ),
                minutes = Math.floor( ( timeRemaining / 60 ) % 60 ),
                hours = Math.floor( timeRemaining / 60 / 60 );

            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if ( timer.hours < 10 ) {
                timerHours.textContent = `0${timer.hours}`;
            }

            if ( timer.minutes < 10 ) {
                timerMinutes.textContent = `0${timer.minutes}`;
            }
            
            if ( timer.seconds < 10 ) {
                timerSeconds.textContent = `0${timer.seconds}`;
            }
            
            if ( timer.hours < 0 || timer.minutes < 0 || timer.seconds < 0 ) {
                clearInterval( idInterval );
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        idInterval = setInterval( updateClock, 1000 );
    };
    countTimer( '20 November 2020' );

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector( '.menu' ),
            menu = document.querySelector( 'menu' ),
            closeBtn = document.querySelector( '.close-btn' ),
            menuItems = menu.querySelectorAll( 'ul > li' );

        const handlerMenu = () => menu.classList.toggle( 'active-menu' );

        btnMenu.addEventListener( 'click', handlerMenu );
        closeBtn.addEventListener( 'click', handlerMenu );
        menuItems.forEach( item => item.addEventListener( 'click', handlerMenu ) );
    };
    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector( '.popup' ),
            popupBtn = document.querySelectorAll( '.popup-btn' ),
            popupClose = document.querySelector( '.popup-close' ),
            popupContent = document.querySelector( '.popup > .popup-content' );

        popupBtn.forEach( item => {
            item.addEventListener( 'click', () => {
                popup.style.display = 'block';
                if ( window.screen.width >= 769 ) {
                    popupAnimate();
                }
            });
        });

        popupClose.addEventListener( 'click', () => popup.style.display = 'none' );

        const popupAnimate = () => {
            let startAnimate = Date.now();
            let idInterval = setInterval( () => {
                let timePassed = Date.now() - startAnimate;
                popupContent.style.top = timePassed / 7 + 'px';
                if ( timePassed > 2000 ) clearInterval( idInterval );
            }, 20);
        };
    };
    togglePopup();

});

