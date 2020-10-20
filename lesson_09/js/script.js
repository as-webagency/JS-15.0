'use strict';

const startBtn = document.getElementById( 'start' ),
    btnPlusIncome = document.getElementsByTagName( 'button' )[0],
    btnPlusExpenses = document.getElementsByTagName( 'button' )[1],
    depositСheck = document.querySelector( '#deposit-check' ),
    additionalIncomeItem = document.querySelectorAll( '.additional_income-item' ),
    budgetMonthValue = document.getElementsByClassName( 'budget_month-value' )[0],
    budgetDayValue = document.getElementsByClassName( 'budget_day-value' )[0],
    expensesMonthValue = document.getElementsByClassName( 'expenses_month-value' )[0],
    additionalIncomeValue = document.getElementsByClassName( 'additional_income-value' )[0],
    additionalExpensesValue = document.getElementsByClassName( 'additional_expenses-value' )[0],
    incomePeriodValue = document.getElementsByClassName( 'income_period-value' )[0],
    targetMonthValue = document.getElementsByClassName( 'target_month-value' )[0],
    salaryAmount = document.getElementsByClassName('salary-amount')[0],
    incomeTitle = document.querySelector( 'input.income-title' ),
    incomeAmount = document.querySelector( '.income-amount' ),
    expensesTitle = document.querySelector( 'input.expenses-title' ),
    expensesAmount = document.querySelector( '.expenses-amount' ),
    additionalExpensesItem = document.querySelector( '.additional_expenses-item' ),
    targetAmount = document.querySelector( '.target-amount' ),
    periodSelect = document.getElementsByClassName( 'period-select' )[0],
    depositBank = document.getElementsByTagName( 'select' )[0],
    depositAmount = document.getElementsByClassName( 'deposit-amount' )[0],
    depositPercent = document.getElementsByClassName( 'deposit-percent' )[0];

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
    mission: 50000, // Какую сумму хотите накопить
    period: 3, // Период от 1 до 12 (месяцев)
    // Вопросы
    asking: function () {
        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Такси, Коммуналка' ); // Дополнительные расходы
            if ( addExpenses ) {
                appData.addExpenses = addExpenses.toLowerCase().split( ', ' );
            }
            appData.deposit = confirm( 'Есть ли у вас депозит в банке?' ); // Депозит

        // Функция возвращает сумму всех обязательных расходов за месяц
        for (let i = 0; i < 2; i++) {
            let expensesItem = prompt( 'Введите обязательную статью расходов?', '' ),
                expensesCost = +prompt( 'Во сколько это обойдется?', '' );

            if ( ( typeof (expensesItem) ) === 'string' && expensesItem !== null && expensesItem !== '' && 
                expensesCost !== '' && expensesCost !== null ) {
                appData.expenses[expensesItem] = expensesCost;
            } else {
                i = i - 1;
            }
        }
    },
    // Cуммa всех обязательных расходов за месяц
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
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
        let target = appData.mission / appData.accumulatedMonth;
        target = Math.floor( target );

        if ( target > 0 || -target ) {
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
    }
};

// Вызов функции через AppData
appData.asking();
let expensesMonth = appData.getExpensesMonth(),
    accumulatedMonth = appData.getBudget(),
    targetMonth = appData.getTargetMonth(),
    statusIncome = appData.getStatusIncome();

// Консоль Логи
console.log( 'Расходы за месяц: ', appData.expensesMonth );
console.log( targetMonth );
console.log( appData.getStatusIncome() );

// Вывести все свойства и значения для объекта appData
for (let key in appData) {
    console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
}