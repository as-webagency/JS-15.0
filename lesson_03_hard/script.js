'use strict';

/// Первое задание
let lang = prompt( 'Выберите язык: ', '' ), languages;

if ( lang === 'ru' ) {
    console.log( 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье ' );
} else if ( lang === 'en' ) {
    console.log( 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday ' );
} else {
    console.log( 'Моя - твоя, не понимать :)' );
}

switch ( lang ) {
    case 'ru':
        console.log( 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье ' );
        break;
    case 'en':
        console.log( 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday ' );
        break;
    default:
        console.log( 'Моя - твоя, не понимать :)' );
        break;
}

languages = {
    'ru': [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ],
    'en': [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
};
console.log( "На каком языке вышло: ", languages[lang] );

// Второе задание
let namePerson = prompt( 'Напишите имя: ', '' );

let names = (namePerson === 'Артём') ? 'директор' :
            (namePerson === 'Максим') ? 'преподаватель' :
            'студент';

console.log( `${namePerson} это -`, names );