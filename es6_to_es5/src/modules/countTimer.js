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

export default countTimer;