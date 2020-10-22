'use strict';

// a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
function clock() {

    let names = {
        days: {
            1: 'день', 
            2: 'дня', 
            3: 'дней'
        },
        hours: {
            1: 'час', 
            2: 'часа', 
            3: 'часов'
        },
        minutes: {
            1: 'минута', 
            2: 'минуты', 
            3: 'минут'
        },
        seconds: {
            1: 'секунда', 
            2: 'секунды', 
            3: 'секунд'
        },
    };
    let dayName = names['days'][3];
    let hurName = names['hours'][3];
    let minName = names['minutes'][3];
    let secName = names['seconds'][3];

    let today = new Date();
    let BigDay = new Date();
    let timeLeft = ( BigDay.getTime() - today.getTime() );

    let eDaysLeft = timeLeft / 86400000;
    let daysLeft = Math.floor( eDaysLeft );

    let sliceDay = String( daysLeft ).slice( -1 );
    if ( parseInt( sliceDay ) === 1 && ( parseInt( daysLeft ) < 10 || parseInt( daysLeft ) > 20) ) {
        dayName = names['days'][1];
    } else if ( ( parseInt( sliceDay ) === 2 || parseInt( sliceDay ) === 3 || parseInt( sliceDay ) === 4) && ( parseInt( daysLeft ) < 10 || parseInt( daysLeft ) > 20 ) ) {
        dayName = names['days'][2];
    } else {
        dayName = names['days'][3];
    }

    let eHrsLeft = ( eDaysLeft - daysLeft ) * 24;
    let hrsLeft = Math.floor( eHrsLeft );
    if ( hrsLeft < 10 ) {
        hrsLeft = '0' + hrsLeft;
    }
    let sliceHours = String( hrsLeft ).slice( -1 );
    if ( parseInt( sliceHours ) === 1 && ( parseInt( hrsLeft ) < 10 || parseInt( hrsLeft ) > 20) ) {
        hurName = names['hours'][1];
    } else if ( ( parseInt( sliceHours ) === 2 || parseInt( sliceHours ) === 3 || parseInt( sliceHours ) === 4 )  && ( parseInt( hrsLeft ) < 10 || parseInt( hrsLeft ) > 20 ) ) {
        hurName = names['hours'][2];
    } else {
        hurName = names['hours'][3];
    }

    let eMinsLeft = ( eHrsLeft - hrsLeft ) * 60;
    let minsLeft = Math.floor( eMinsLeft );
    if ( minsLeft < 10 ) {
        minsLeft = '0' + minsLeft;
    }
    let sliceMin = String( minsLeft ).slice( -1 );
    if ( parseInt( sliceMin ) === 1 && ( parseInt( minsLeft ) < 10 || parseInt( minsLeft ) > 20 ) ) {
        minName = names['minutes'][1];
    } else if ( ( parseInt( sliceMin ) === 2 || parseInt( sliceMin ) === 3 || parseInt( sliceMin ) === 4 ) && ( parseInt( minsLeft ) < 10 || parseInt( minsLeft ) > 20 ) ) {
        minName = names['minutes'][2];
    } else{
        minName = names['minutes'][3];
    }

    let seksLeft = Math.floor( ( eMinsLeft - minsLeft ) * 60 );
    if ( seksLeft < 10 ){
        seksLeft = '0' + seksLeft;
    }
    let sliceSec = String( seksLeft ).slice( -1 );
    if ( parseInt( sliceSec ) === 1 && ( parseInt( seksLeft ) < 10 || parseInt( seksLeft ) > 20 ) ) {
        secName = names['seconds'][1];
    } else if ( ( parseInt( sliceSec ) === 2 || parseInt( sliceSec ) === 3 || parseInt( sliceSec ) === 4 ) && ( parseInt( seksLeft ) < 10 || parseInt( seksLeft ) > 20 ) ) {
        secName = names['seconds'][2];
    } else {
        secName = names['seconds'][3];
    }

    function checkTime( i ) {
        if ( i < 10 ) {
            i = "0" + i;
        }
        return i;
    }

    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let nowDate = new Date();
    let textout;
    let month = nowDate.getMonth();
    let date = nowDate.getDate();
    textout = date;
    if ( month === 0 ) textout += ' Января';
    if ( month === 1 ) textout += ' Февраля';
    if ( month === 2 ) textout += ' Марта';
    if ( month === 3 ) textout += ' Апреля';
    if ( month === 4 ) textout += ' Мая';
    if ( month === 5 ) textout += ' Июня';
    if ( month === 6 ) textout += ' Ииюля';
    if ( month === 7 ) textout += ' Августа';
    if ( month === 8 ) textout += ' Сентября';
    if ( month === 9 ) textout += ' Октября';
    if ( month === 10 ) textout += ' Ноября';
    if ( month === 11 ) textout += ' Декабря';

    let div = document.createElement('div');
    div.innerHTML = 'Сегодня ' + days[nowDate.getDay()] + ', ' + textout + ' ' + nowDate.getFullYear() + ' года, ' + 
    checkTime( nowDate.getHours() ) + ' ' + hurName + ' ' + checkTime( nowDate.getMinutes() ) + ' ' + minName + ' ' + 
    checkTime( nowDate.getSeconds() ) + ' ' + secName;
    document.body.append( div );

    // б) '04.02.2020 - 21:05:33'
    let nowDates = new Date();
    let day = nowDates.getDate();
    let months = nowDates.getMonth() + 1;
    let year = nowDates.getFullYear();
    let time = nowDates.getHours();
    let minutes = nowDates.getMinutes();
    let second = nowDates.getSeconds();

    let div2 = document.createElement( 'div' );
    div2.innerHTML = day + '.' + months + '.' + year + ' - ' + checkTime( time ) + ':' + 
    checkTime( minutes ) + ':' + checkTime( second );
    document.body.append(div2);

}
setInterval(clock, 1000);
//clearInterval(clock);