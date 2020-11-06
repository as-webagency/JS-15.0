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
    expensesTitle = document.querySelector( 'input.expenses-title' ),
    additionalExpensesItem = document.querySelector( '.additional_expenses-item' ),
    targetAmount = document.querySelector( '.target-amount' ),
    periodSelect = document.getElementsByClassName( 'period-select' )[0],
    depositBank = document.getElementsByTagName( 'select' )[0],
    depositAmount = document.getElementsByClassName( 'deposit-amount' )[0],
    depositPercent = document.getElementsByClassName( 'deposit-percent' )[0],
    periodAmount = document.querySelector( '.period-amount' ),
    startHover = document.querySelector( '.result #cancel:hover, .result #start:hover' ),
    disabledInputData = document.querySelectorAll( '.data input[type=text]' ),
    cancelBtn = document.getElementById( 'cancel' ),
    allInputs = document.querySelectorAll( 'input[type=text]' ),
    incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
    expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' ),
    placeholderNames = document.querySelectorAll( '[placeholder="Наименование"]' ),
    placeholderSum = document.querySelectorAll( '[placeholder="Сумма"]' );

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

        this.budget = +salaryAmount.value;

        disabledInputData.forEach( function ( item ) {
            item.setAttribute( 'disabled', true );
            startBtn.style.display = 'none';
            cancelBtn.style.display = 'block';
        });

        incomeItemsInputReset.forEach( function ( item ) {
            item.setAttribute( 'disabled', true );
        });
        
        expensesItemsInputReset.forEach( function ( item ) {
            item.setAttribute( 'disabled', true );
        });

        cancelBtn.addEventListener( 'click', function () {
            appData.reset();
        });

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();

        this.getBudget();
        this.showResult();

    },
    // Программу возвращаем в исходное состояние
    reset: function () {
        disabledInputData.forEach( function ( item ) {
            item.removeAttribute( 'disabled', true );
            startBtn.style.display = 'block';
            cancelBtn.style.display = 'none';
        });

        allInputs.forEach( function ( item ) {
            item.value = '';
        });

        periodAmount.innerHTML = periodSelect.value = 1;
    },
    // Показать результаты
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil( this.budgetDay );
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join( ', ' );
        additionalIncomeValue.value = this.addIncome.join( ', ' );
        targetMonthValue.value = Math.ceil( this.getTargetMonth() );
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener( 'input', function () {
            incomePeriodValue.value = appData.calcPeriod();
            periodAmount.innerHTML = periodSelect.value;
        });
    },
    // Блок обязательных расходов
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode( true ),
            inputsCloneValue = cloneExpensesItem.querySelectorAll( 'input' );

        inputsCloneValue.forEach(function ( input ) {
            input.value = '';
        });

        expensesItems[0].parentNode.insertBefore( cloneExpensesItem, btnPlusExpenses );
        expensesItems = document.querySelectorAll( '.expenses-items' );
        if ( expensesItems.length === 3 ) {
            btnPlusExpenses.style.display = 'none';
        }
    },
    // Блок обязательных расходов
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode( true ),
            inputsCloneValue = cloneIncomeItem.querySelectorAll( 'input' );

        inputsCloneValue.forEach(function ( input ) {
            input.value = '';
        });

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

        for ( let key in this.income ) {
            this.incomeMonth += +this.income[key];
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
        for ( let key in this.expenses ) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;

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
        return this.budgetMonth * periodSelect.value;
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

// Пропускаем только русские буквы, пробелы и знаки препинания
placeholderNames.forEach(function ( item ) {
    item.addEventListener( 'input', function () {
        item.value = item.value.replace( /[^а-я\s\,\.\s\,\.]/, '' );
    });
});

additionalExpensesItem.addEventListener( 'input', function () {
    additionalExpensesItem.value = additionalExpensesItem.value.replace( /[^а-я\s\,\.]/, '' );
});

// Пропускаем только числа
placeholderSum.forEach(function ( item ) {
    item.addEventListener( 'input', function () {
        item.value = item.value.replace(/[^0-9]/g, '');
    });
});

depositPercent.addEventListener( 'input', function () {
    depositPercent.value = depositPercent.value.replace(/[^0-9]/g, '');
});

// События
let startBind = appData.start.bind( appData );
startBtn.addEventListener( 'click', startBind  );
btnPlusExpenses.addEventListener( 'click', appData.addExpensesBlock  );
btnPlusIncome.addEventListener( 'click', appData.addIncomeBlock  );
periodSelect.addEventListener( 'input', function () {
    periodAmount.innerHTML = periodSelect.value;
});

// Вывести все свойства и значения для объекта appData
// for (let key in appData) {
//     console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
// }