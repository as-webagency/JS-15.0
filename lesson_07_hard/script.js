'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

for ( let i = 0, len = week.length; i < len; i++ ) {
    let html = week[i];

    if ( i === 4 ) {
        switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                html = html.italics();
                break;
            case 5:
            case 6:
                html = html.bold();
                html = html.italics();
                break;
        
            default: 
                alert( 'Что-то пошло не так' );
        }
    }
    if ( i === 5 || i === 6 ) {
        html = html.bold();
    }

    const div = document.createElement( 'div' );
    div.innerHTML = html;
    document.body.appendChild( div );
}