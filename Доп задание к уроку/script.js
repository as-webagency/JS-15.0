'use strict';

//Добрый день (утро, вечер, ночь в зависимости от времени суток)
function getHour( hours ) {

    if ( hours > 4 && hours < 12 ) {
        return ( 'Доброе утро' );
    }
    else if ( hours >= 12 && hours < 16 ) {
        return ( 'Добрый день' );
    }
    else if ( hours >= 16 && hours < 21 ) {
        return ('Добрый вечер' );
    }
    else if ( hours >= 21 || hours <= 4 ) {
        return ( 'Доброй ночи' );
    }
    else {
        return ( 'Что-то пошло не так' );
    }

}

let hours = new Date().getHours(),
    hoursBlock = document.createElement( 'div' );
    
hoursBlock.innerHTML = getHour( hours );
document.body.append( hoursBlock );

//Сегодня: Понедельник
function getWeekDays( date ) {

    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Воскресенье'];
    return days[date.getDay()];

}

let date = new Date(),
    dateBlock = document.createElement( 'div' );

dateBlock.innerHTML = 'Сегодня: ' + getWeekDays( date );
document.body.appendChild( dateBlock );

//Текущее время: 12: 05: 15 PM
date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' PM';
let dateHourNow = document.createElement( 'div' );

dateHourNow.innerHTML = date;
document.body.appendChild( dateHourNow );

//До нового года осталось 175 дней
function getNewYear( deadline ) {
    
    let getNewYearStop = new Date( deadline ).getTime(),
        getNewYearNow = new Date().getTime(),
        getNewYearRemaining = ( getNewYearStop - getNewYearNow ) / 1000,
        getDays = Math.floor( getNewYearRemaining / 60 / 60 / 24 ),
        getDaysBlock = document.createElement( 'div' );
    
    getDaysBlock.innerHTML = 'До нового года осталось ' + getDays + ' дня';
    document.body.appendChild( getDaysBlock );
        
}

getNewYear( '01 january 2021' );