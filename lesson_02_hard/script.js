'use strict';

let num = 266219;
let str = num + '';
let sum = 1;

for (let i = 0; i < str.length; i++) {
    sum *= str[i];
}

sum **= 3;

console.log( sum );
console.log( 'Результат возведения в степень 3: ', sum );
console.log( 'Вывести на экран первые 2 цифры полученного числа: ', String( sum ).slice(0, 2) );