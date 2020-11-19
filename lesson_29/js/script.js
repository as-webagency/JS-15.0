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
            idInterval = requestAnimationFrame( updateClock, 1000 );

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
                cancelAnimationFrame( idInterval );
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        idInterval = requestAnimationFrame( updateClock, 1000 );
    };
    countTimer( '20 November 2020' );

    // Menu
    const toggleMenu = () => {
        const menu = document.querySelector( 'menu' ),
            body = document.querySelector( 'body' ),
            navLink = menu.querySelectorAll( 'li a' ),
            serviceBlockBtn = document.querySelector( 'a[href="#service-block"]' ),
            idServiceBlock = document.getElementById( 'service-block' );
            

        body.addEventListener( 'click', event => {
            let target = event.target;
            if ( target.closest( '.menu' ) ) menu.classList.add( 'active-menu' );
            else if ( target.classList.contains( 'close-btn' ) ) menu.classList.remove( 'active-menu' );
            else if ( target.tagName !== 'MENU' ) menu.classList.remove( 'active-menu' );
            else return;
        });

        navLink.forEach( ( item, index ) => {
            navLink[index].addEventListener( 'click', event => {
                event.preventDefault();
                const hrefId = event.target.getAttribute( 'href' ).substr( 1 );
                document.getElementById( hrefId ).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        });

        const scrollTo = ( element ) => {
            window.scroll({
                left: 0,
                top: element.offsetTop,
                behavior: 'smooth',
            });
        };

        serviceBlockBtn.addEventListener( 'click', event => {
            event.preventDefault();
            scrollTo( idServiceBlock );
        });
    };
    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector( '.popup' ),
            popupBtn = document.querySelectorAll( '.popup-btn' ),
            popupContent = document.querySelector( '.popup > .popup-content' );

        const popupAnimate = () => {
            let startAnimate = performance.now();
            const loop = ( now ) => {
                let timePassed = now - startAnimate;
                popupContent.style.top = timePassed / 4 * 2 + "px";
                if ( timePassed > 1000 ) return;
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
                    if ( item  === target ) toggleTabContent( i );
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

            commandPhoto[index].addEventListener( 'mouseleave', event => event.target.src = teamFoto );
        });
    };
    ourTeam();

    // Calculator
    const calc = ( price = 100 ) => {
        const calcBlock = document.querySelector( '.calc-block' ),
            calcInputs = calcBlock.querySelectorAll( 'input[type="text"]' ),
            calcType = document.querySelector( '.calc-type' ),
            calcSquare = document.querySelector( '.calc-square' ),
            calcDay = document.querySelector( '.calc-day' ),
            calcCount = document.querySelector( '.calc-count' ),
            totalValue = document.getElementById( 'total' );
        
        calcInputs.forEach( item => item.addEventListener( 'input', () => item.value = item.value.replace( /[^0-9]/g, '' )));

        const countSum = () => {
            let total = 0, countValue = 1, dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if ( calcCount.value > 1 ) countValue += ( calcCount.value - 1 ) / 10;

            if ( calcDay.value && calcDay.value < 5 ) dayValue *= 2;
            else if ( calcDay.value && calcDay.value < 10 ) dayValue *= 1.5;

            if ( typeValue && squareValue ) total = price * typeValue * squareValue * countValue * dayValue;

            totalValue.textContent = total;
        };

        calcBlock.addEventListener( 'change', event => {
            if ( event.target.matches( 'select' ) || event.target.matches( 'input' ) ) countSum();
        });
    };
    calc( 100 );

    const sendFormsAjax = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся',
            allForms = document.querySelectorAll( 'form' ),
            allInputsForm = document.querySelectorAll( 'form input' ),
            statusMessage = document.createElement( 'div' );

        statusMessage.className = 'status-message';
        statusMessage.textContent = 'Тут будет сообщение!';
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';

        allInputsForm.forEach( item => {
            item.setAttribute( 'required', true );
            item.addEventListener( 'input', event => {
                if ( item.name === 'user_name' ) item.value = item.value.replace( /[^а-яёА-ЯЁ\s]/gi, '' );
                else if ( item.name === 'user_phone' ) item.value = item.value.replace( /[^0-9+]/gi, '' );
                else if ( item.name === 'user_email' ) item.value = item.value.replace( /^[а-яёА-ЯЁ0-9._%+-]+@[а-яёА-ЯЁ0-9-]+.+.[а-яёА-ЯЁ]{2,4}$/gi, '' );
                else if ( item.name === 'user_message' ) item.value = item.value.replace( /[^а-яёА-ЯЁ\.\-\,\!\?\;:\s]/gi, '' );
                else return;
            });
        });

        allForms.forEach( item => {
            item.addEventListener( 'submit', event => {
                event.preventDefault();
                item.appendChild( statusMessage );
                
                const formStatusMessage = () => statusMessage.textContent = '';
                setTimeout( formStatusMessage, 5000 );
                
                statusMessage.textContent = loadMessage;

                const formData = new FormData( item );
                let body = {};
                
                formData.forEach( ( val, key ) => body[key] = val );
                
                postData( body )
                    .then( ( response ) => {
                        if ( response.status !== 200 ) throw new Error('status network is not 200');
                        statusMessage.textContent = successMessage;
                    })
                    .then( allInputsForm.forEach( ( item ) => item.value = '' ) )
                    .catch( ( error ) => {
                        statusMessage.textContent = errorMessage;
                        console.error( error );
                    });
            });
        });

        const postData = ( body ) => {
            return fetch( './server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( body )
            });
        };
    };
    sendFormsAjax();
});