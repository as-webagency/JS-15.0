'use strict';

let isNumber = function ( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
};

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
    expensesTitle = document.querySelector( 'input.expenses-title' ),
    additionalExpensesItem = document.querySelector( '.additional_expenses-item' ),
    targetAmount = document.querySelector( '.target-amount' ),
    periodSelect = document.getElementsByClassName( 'period-select' )[0],
    depositBank = document.getElementsByTagName( 'select' )[0],
    depositAmount = document.getElementsByClassName( 'deposit-amount' )[0],
    depositPercent = document.getElementsByClassName( 'deposit-percent' )[0],
    periodAmount = document.querySelector( '.period-amount' ),
    startHover = document.querySelector( '.result #cancel:hover, .result #start:hover' );

let expensesItems = document.querySelectorAll( '.expenses-items' ),
    incomeItems = document.querySelectorAll( '.income-items' );

let appData = {
    budget: 0, // Бюджет
    budgetDay: 0, // Бюджет - день
    budgetMonth: 0, // Бюджет - месяц
    income: {}, // Дополнительный доход
    incomeMonth: 0, // Дополнительный месячный доход
    addIncome: [], // Добавить доход
    expenses: {}, // Затраты
    expensesMonth: 0, // Расходы - месяц
    addExpenses: [], // Добавить расходы
    deposit: false, // Депозит
    start: function () {

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBudget();
        appData.showResult();

    },
    // Показать результаты
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil( appData.budgetDay );
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join( ', ' );
        additionalIncomeValue.value = appData.addIncome.join( ', ' );
        targetMonthValue.value = Math.ceil( appData.getTargetMonth() );

        periodSelect.addEventListener( 'input', function () {
            incomePeriodValue.value = appData.calcPeriod();
            periodAmount.innerHTML = periodSelect.value;
        });
    },
    // Блок обязательных расходов
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode( true );

        expensesItems[0].parentNode.insertBefore( cloneExpensesItem, btnPlusExpenses );
        expensesItems = document.querySelectorAll( '.expenses-items' );
        if ( expensesItems.length === 3 ) {
            btnPlusExpenses.style.display = 'none';
        }
    },
    // Блок обязательных расходов
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode( true );

        incomeItems[0].parentNode.insertBefore( cloneIncomeItem, btnPlusIncome );
        incomeItems = document.querySelectorAll( '.income-items' );
        if ( incomeItems.length === 3 ) {
            btnPlusIncome.style.display = 'none';
        }
    },
    // Получаем обязательные расходы
    getExpenses: function () {
        expensesItems.forEach( function ( item ) {
            let itemExpenses = item.querySelector( '.expenses-title' ).value,
                cashExpenses = item.querySelector( '.expenses-amount' ).value;

            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    // Получаем дополнительные доходы
    getIncome: function () {
        incomeItems.forEach(function ( item ) {
            let itemIncome = item.querySelector( '.income-title' ).value,
                cashIncome = item.querySelector( '.income-amount' ).value;
            
            if ( itemIncome !== '' && cashIncome !== '' ) {
                appData.expenses[itemIncome] = cashIncome;
            }

        });

        for ( let key in appData.income ) {
            appData.incomeMonth += +appData.income[key];
        }

    },
    // Получить возможные расходы
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split( ', ' );

        addExpenses.forEach( function ( item ) {
            item = item.trim();
            if ( item !== '' ) {
                appData.addExpenses.push( item );
            }
        });
    },
    // Получить дополнительные доходы
    getAddIncome: function () {
        additionalIncomeItem.forEach( function ( item ) {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push( itemValue );
            }
        });
    },
    // Cуммa всех обязательных расходов за месяц
    getExpensesMonth: function () {
        for ( let key in appData.expenses ) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;

    },
    // За сколько месяцев будет достигнута цель
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};

//Добавляем атрибуты
if ( salaryAmount.value === '' ) {
    startBtn.setAttribute( 'disabled', true );
    startBtn.style.opacity = 1;
}

salaryAmount.addEventListener( 'input', function () {
    startBtn.removeAttribute( 'disabled', true );
    startBtn.style.opacity = startHover;
});

// Пропускаем только числа
salaryAmount.addEventListener( 'input', function () {
    salaryAmount.value = salaryAmount.value.replace( /[^0-9]/g, '' );
});

// События
startBtn.addEventListener( 'click', appData.start  );
btnPlusExpenses.addEventListener( 'click', appData.addExpensesBlock  );
btnPlusIncome.addEventListener( 'click', appData.addIncomeBlock  );
periodSelect.addEventListener( 'input', function () {
    periodAmount.innerHTML = periodSelect.value;
});

// Вывести все свойства и значения для объекта appData
// for (let key in appData) {
//     console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
// }