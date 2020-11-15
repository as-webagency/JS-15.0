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
        const menu = document.querySelector( 'menu' ),
            body = document.querySelector( 'body' );

        body.addEventListener( 'click', ( event ) => {
            let target = event.target;

            if ( target.closest( '.menu' ) ) {
                menu.classList.add( 'active-menu' );
            } else if ( target.classList.contains( 'close-btn' ) ) {
                menu.classList.remove( 'active-menu' );
            } else if ( target.tagName !== 'MENU' ) {
                menu.classList.remove( 'active-menu' );
            } else {
                return;
            }
        });
    };
    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector( '.popup' ),
            popupBtn = document.querySelectorAll( '.popup-btn' ),
            popupContent = document.querySelector( '.popup > .popup-content' );

        const popupAnimate = () => {
            let startAnimate = Date.now();
            let idInterval = setInterval( () => {
                let timePassed = Date.now() - startAnimate;
                popupContent.style.top = timePassed / 7 + 'px';
                if ( timePassed > 3000 ) clearInterval( idInterval );
            }, 30);
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

            if ( target.classList.contains( 'popup-close' ) ) {
                popup.style.display = 'none';
            } else {
                target = target.closest( '.popup-content' );
                if ( !target ) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopup();

    // Tabs
    const toggleTabs = () => {
        const tabHeader = document.querySelector( '.service-header' ),
            tab = tabHeader.querySelectorAll( '.service-header-tab' ),
            tabContent = document.querySelectorAll( '.service-tab' );

        const toggleTabContent = ( index ) => {
            for ( let i = 0; i < tabContent.length; i++ ) {
                if ( index === i ) {
                    tab[i].classList.add( 'active' );
                    tabContent[i].classList.remove( 'd-none' );
                } else {
                    tab[i].classList.remove( 'active' );
                    tabContent[i].classList.add( 'd-none' );
                }
            }
        };

        tabHeader.addEventListener( 'click', ( event ) => {
            let target = event.target;
                target = target.closest( '.service-header-tab' );

            if ( target ) {
                tab.forEach( ( item, i ) => {
                    if ( item  === target ) {
                        toggleTabContent( i );
                    }
                });
            }
        });
    };
    toggleTabs();

    // Slider
    const slider = () => {
        const slide = document.querySelectorAll( '.portfolio-item' ),
            slider = document.querySelector( '.portfolio-content' );

        let currentSlide = 0, interval;

        for ( let i = 0; i < slide.length; i++ ) {
            const dotsParent = document.querySelectorAll( '.portfolio-dots'),
                dots = document.createElement('li');
            
            if ( i === 0 ) {
                dots.setAttribute( 'class', 'dot dot-active' );
                dotsParent[0].appendChild( dots);
            } else {
                dots.setAttribute( 'class', 'dot' );
                dotsParent[0].appendChild( dots );
            }
        }

        const dot = document.querySelectorAll('.dot');
        const prevSlide = ( elem, index, strClass ) => elem[index].classList.remove( strClass );
        const nextSlide = ( elem, index, strClass ) => elem[index].classList.add( strClass );

        const autoPlaySlide = () => {
            prevSlide( slide, currentSlide, 'portfolio-item-active' );
            prevSlide( dot, currentSlide, 'dot-active' );

            currentSlide++;
            if ( currentSlide >= slide.length ) currentSlide = 0;

            nextSlide( slide, currentSlide, 'portfolio-item-active' );
            nextSlide( dot, currentSlide, 'dot-active' );
        };

        const startSlide = ( timePlay = 3000 ) => interval = setInterval( autoPlaySlide, timePlay );
        const stopSlide = () => clearInterval( interval );

        slider.addEventListener( 'click', ( event ) => {
            event.preventDefault();
            let target = event.target;

            if ( !target.matches( '.portfolio-btn, .dot' ) ) return;

            prevSlide( slide, currentSlide, 'portfolio-item-active' );
            prevSlide( dot, currentSlide, 'dot-active' );

            if ( target.matches( '#arrow-right' ) ) {
                currentSlide++;
            } else if ( target.matches( '#arrow-left' ) ) {
                currentSlide--;
            } else if ( target.matches( '.dot' ) ) {
                dot.forEach( ( item, index ) => {
                    if ( item === target ) {
                        currentSlide = index;
                    }
                });
            }

            if ( currentSlide >= slide.length ) currentSlide = 0;
            if ( currentSlide < 0 ) currentSlide = slide.length - 1;

            nextSlide( slide, currentSlide, 'portfolio-item-active' );
            nextSlide( dot, currentSlide, 'dot-active' );

        });

        slider.addEventListener( 'mouseover', ( event ) => {
            if ( event.target.matches( '.portfolio-btn' ) || event.target.matches( '.dot' ) ) {
                stopSlide();
            }
        });

        slider.addEventListener( 'mouseout', ( event ) => {
            if ( event.target.matches( '.portfolio-btn' ) || event.target.matches( '.dot' ) ) {
                startSlide();
            }
        });

        startSlide( 1500 );
    };
    slider();

    // Team
    const ourTeam = () => {
        const commandPhoto = document.querySelectorAll( '.command__photo' );
        let teamFoto;

        commandPhoto.forEach( ( item, index ) => {
            commandPhoto[index].addEventListener( 'mouseenter', event => {
                teamFoto = event.target.getAttribute( 'src' );
                event.target.src = event.target.dataset.img;
            });

            commandPhoto[index].addEventListener( 'mouseleave', event => {
                event.target.src = teamFoto;
            });
        });
    };
    ourTeam();

    // Calculator
    const calc = () => {
        const inputs = document.querySelectorAll( '.calc-block > input[type="text"]' );
        
        inputs.forEach( item => {
            item.addEventListener( 'input', () => {
                item.value = item.value.replace( /[^0-9]/g, '' );
            });
        });
    };
    calc();

});

