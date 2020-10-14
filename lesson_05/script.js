'use strict';

let isNumber = function ( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
};

let money, // Доход за месяц
    start = function () {
        do {
            money = prompt( 'Ваш месячный доход?', '' );
        } while ( !isNumber( money ) );
};
start();

let income = 'Фриланс', // Дополнительный доход 
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Интернет, Такси, Коммуналка' ), // Дополнительные расходы
    deposit = confirm( 'Есть ли у вас депозит в банке?' ), // Депозит
    mission = 10000, // Какую сумму хотите накопить
    period = 12; // Период от 1 до 12 (месяцев)

let showTypeOf = function ( data ) {
    console.log( data, typeof ( data ) );
};
showTypeOf( money );
showTypeOf( income );
showTypeOf( deposit );

if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
}

// Cуммa всех обязательных расходов за месяц
let expenses = [];
let getExpensesMonth = function () {
    let sum = 0, cost;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt( 'Введите обязательную статью расходов?', '' );
        do {
            cost = prompt( 'Во сколько это обойдется?', '' );
        }
        while ( !isNumber( cost ) || cost === '' || cost === null );

        sum += +cost;
    }

    return sum;
};
let expensesAmount = getExpensesMonth();

// Накопления за месяц (Доходы минус расходы)
let getAccumulatedMonth = function () {
    return money - expensesAmount;
};

// Pезультат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth();

// За сколько месяцев будет достигнута цель
let getTargetMonth = function () {
    let target = mission / accumulatedMonth;

    if ( target > 0 ) {
        console.log( 'За сколько месяцев будет достигнута цель: ', Math.floor( target ) );
    } else if ( target < 0 ) {
        console.log( 'Цель не будет достигнута: ', Math.floor( target ) );
    }

    return Math.floor( target );
};
getTargetMonth();

// Значения месячного накопления 
let budgetDay = getAccumulatedMonth() / 30;

// Получить статусный доход
let getStatusIncome = function () {
    if ( budgetDay >= 1200 ) {
        return ( 'У вас высокий уровень дохода' );
    } else if ( budgetDay > 600 && budgetDay < 1200 ) {
        return ( 'У вас средний уровень дохода' );
    } else if ( budgetDay < 600 && budgetDay > 0 ) {
        return ( 'К сожалению у вас уровень дохода ниже среднего' );
    } else if ( budgetDay <= 0 ) {
        return ( 'Что то пошло не так' );
    }
};
console.log( getStatusIncome() );


// Консоль Логи
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );
console.log( addExpenses.toLowerCase().split( ', ' ) );
console.log( 'Бюджет на день: ', Math.ceil( budgetDay ) );