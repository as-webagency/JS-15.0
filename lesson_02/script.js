'use strict';

let money = 5000; // Доход за месяц
let income = 'Фриланс'; // Дополнительный доход 
let addExpenses = 'Интернет, Такси, Коммуналка'; // Дополнительные расходы
let deposit = false; // Депозит
let mission = 10000; // Какую сумму хотите накопить
let period = 6; // Период от 1 до 12 (месяцев)
let budgetDay = money / 30; // Дневной бюджет

addExpenses.toLowerCase().split( ', ' );

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );
console.log( addExpenses.length );
console.log( 'Период равен ' + period + ' месяцев и Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );
console.log( addExpenses.toLowerCase().split( ', ' ) );
console.log( 'Дневной бюджет: ', budgetDay );