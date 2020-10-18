'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

for ( let i = 0, len = week.length; i < len; i++ ) {
    let html = week[i];
    if ( i === 0 ) {
        html = html.italics();
    } else if ( i > 4 ) {
        html = html.bold();
    }

    const div = document.createElement( 'div' );
    div.innerHTML = html;
    document.body.appendChild( div );
}