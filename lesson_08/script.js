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

let appData = {
    budget: money, // Бюджет
    budgetDay: 0, // Бюджет - день
    budgetMonth: 0, // Бюджет - месяц
    income: {}, // Дополнительный доход
    addIncome: [], // Добавить доход
    expenses: {}, // Затраты
    expensesMonth: 0, // Расходы - месяц
    addExpenses: [], // Добавить расходы
    deposit: false, // Депозит
    percentDeposit: 0, // Процентный депозит
    moneyDeposit: 0, // Денежный депозит
    mission: 50000, // Какую сумму хотите накопить
    period: 3, // Период от 1 до 12 (месяцев)
    // Вопросы
    asking: function () {
        if ( confirm( 'Есть ли у вас дополнительный источник заработка?' ) ) {
            let itemIncome, cashIncome;

            do {
                itemIncome = prompt( 'Какой у вас дополнительный заработок?', 'Такси' );
            } while ( !isNaN( itemIncome ) || itemIncome === '' || itemIncome === null );

            do {
                cashIncome = prompt( 'Сколько в месяц вы на этом зарабатываете?', 10000 );
            } while ( isNaN( cashIncome ) || cashIncome === '' || cashIncome === null );

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Такси, Коммуналка' ); // Дополнительные расходы
            if ( addExpenses ) {
                appData.addExpenses = addExpenses.toLowerCase().split( ', ' );
            }
            appData.deposit = confirm( 'Есть ли у вас депозит в банке?' ); // Депозит

        // Функция возвращает сумму всех обязательных расходов за месяц
        for (let i = 0; i < 2; i++) {
            let expensesItem, expensesCost;

            do {
                expensesItem = prompt( 'Введите обязательную статью расходов?', '' );
            } while ( !isNaN( expensesItem ) || expensesItem === '' || expensesItem === null );

            do {
                expensesCost = prompt( 'Во сколько это обойдется?', 2500 );
            } while ( isNaN( expensesCost ) || expensesCost === '' || expensesCost === null );

            appData.expenses[expensesItem] = expensesCost;
        }
    },
    // Cуммa всех обязательных расходов за месяц
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {

        appData.budgetMonth = Math.floor( money - appData.budgetMonth );
        appData.budgetDay = appData.budgetMonth / 30;
        return money - appData.expensesMonth;

    },
    // За сколько месяцев будет достигнута цель
    getTargetMonth: function () {
        let target = appData.mission / appData.getBudget();
        target = Math.floor( target );

        if ( target > 0 ) {
            return ( 'Цель будет достигнута за ' + target + ' месяцев');
        } else {
            return ( 'Цель не будет достигнута' );
        }
    },
    // Получить статусный доход
    getStatusIncome: function () {
        if ( appData.budgetDay >= 1200 ) {
            return ( 'У вас высокий уровень дохода' );
        } else if ( appData.budgetDay > 600 && appData.budgetDay < 1200 ) {
            return ( 'У вас средний уровень дохода' );
        } else if ( appData.budgetDay < 600 && appData.budgetDay > 0 ) {
            return ( 'К сожалению у вас уровень дохода ниже среднего' );
        } else if ( appData.budgetDay <= 0 ) {
            return ( 'Что то пошло не так' );
        }
    },
    // Есть ли депозит в банке
    getInfoDeposit: function () {
        if ( appData.deposit ) {
            do {
                appData.percentDeposit = prompt( 'Какой годовой процент', 10 );
                appData.moneyDeposit = prompt( 'Какая сумма заложена?', 10000 );
            } while ( isNaN( appData.moneyDeposit ) || appData.moneyDeposit === '' || appData.moneyDeposit === null || 
            isNaN( appData.percentDeposit ) || appData.percentDeposit === '' || appData.percentDeposit === null );
        } 
    },
    // Считаем деньги за период
    getCalcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

// Вызов функции через AppData
appData.asking();
let expensesMonth = appData.getExpensesMonth(),
    dataBudget = appData.getBudget(),
    targetMonth = appData.getTargetMonth(),
    statusIncome = appData.getStatusIncome(),
    infoDeposit = appData.getInfoDeposit(),
    calcSavedMoney = appData.getCalcSavedMoney();

// Консоль Логи
console.log( 'Расходы за месяц: ', appData.expensesMonth );
console.log( targetMonth );
console.log( appData.getStatusIncome() );

// Вывести все свойства и значения для объекта appData
// for (let key in appData) {
//     console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
// }