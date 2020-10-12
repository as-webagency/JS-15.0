'use strict';

let money = +prompt( 'Ваш месячный доход?', 5000 ), // Доход за месяц
    income = 'Фриланс', // Дополнительный доход 
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Интернет, Такси, Коммуналка' ), // Дополнительные расходы
    deposit = confirm( 'Есть ли у вас депозит в банке?' ), // Депозит
    mission = 10000, // Какую сумму хотите накопить
    period = 13, // Период от 1 до 12 (месяцев)
    expenses1 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount1 = +prompt( 'Во сколько это обойдется?', '' ),
    expenses2 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount2 = +prompt( 'Во сколько это обойдется?', '' ),
    budgetMonth = money - amount1 - amount2, // Бюджет на месяц, учитывая обязательные расходы,
    target = mission / budgetMonth, // За сколько месяцев будет достигнута цель
    budgetDay = money / 30; // Дневной бюджет

if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
}

if ( budgetDay >= 1200 ) {
    console.log( 'У вас высокий уровень дохода' );
} else if ( budgetDay > 600 && budgetDay < 1200 ) {
    console.log( 'У вас средний уровень дохода' );
} else if ( budgetDay < 600 && budgetDay > 0 ) {
    console.log( 'К сожалению у вас уровень дохода ниже среднего' );
} else if ( budgetDay <= 0 ) {
    console.log( 'Что то пошло не так' );
}

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );
console.log( addExpenses.length );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );
console.log( addExpenses.toLowerCase().split( ', ' ) );
console.log( 'Бюджет на месяц: ', budgetMonth );
console.log( 'Цель будет достигнута за: ', Math.floor( target ) );
console.log( 'Бюджет на день: ', Math.ceil( budgetDay ) );