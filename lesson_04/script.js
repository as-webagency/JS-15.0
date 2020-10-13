'use strict';

let money = +prompt( 'Ваш месячный доход?', 5000 ), // Доход за месяц
    income = 'Фриланс', // Дополнительный доход 
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Интернет, Такси, Коммуналка' ), // Дополнительные расходы
    deposit = confirm( 'Есть ли у вас депозит в банке?' ), // Депозит
    mission = 10000, // Какую сумму хотите накопить
    period = 12; // Период от 1 до 12 (месяцев)
    
let expenses1 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount1 = +prompt( 'Во сколько это обойдется?', '' ),
    expenses2 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount2 = +prompt( 'Во сколько это обойдется?', '' );

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
let getExpensesMonth = function () {
    return amount1 - amount2;
};

// Накопления за месяц (Доходы минус расходы)
let getAccumulatedMonth = function () {
    return money - getExpensesMonth();
};

// Pезультат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth();

// За сколько месяцев будет достигнута цель
let getTargetMonth = function () {
    return Math.floor( mission / accumulatedMonth );
};

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
console.log( 'За сколько месяцев будет достигнута цель: ', getTargetMonth() );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );
console.log( addExpenses.toLowerCase().split( ', ' ) );
console.log( 'Бюджет на день: ', Math.ceil( budgetDay ) );