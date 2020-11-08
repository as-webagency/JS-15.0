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

class AppData {

    constructor () {

        this.budget = 0; // Бюджет
        this.budgetDay = 0; // Бюджет - день
        this.budgetMonth = 0; // Бюджет - месяц
        this.income = {}; // Дополнительный доход
        this.incomeMonth = 0; // Дополнительный месячный доход
        this.addIncome = []; // Добавить доход
        this.expenses = {}; // Затраты
        this.expensesMonth = 0; // Расходы - месяц
        this.addExpenses = []; // Добавить расходы
        this.deposit = false; // Депозит
        
    }
    // Проверка на пустую строку - Месячный доход
    check () {

        if ( salaryAmount.value === '' ) {
            startBtn.setAttribute( 'disabled', true );
            startBtn.style.opacity = 1;
        }
    
        salaryAmount.addEventListener( 'input', () => {
            startBtn.removeAttribute( 'disabled', true );
            startBtn.style.opacity = startHover;
        });

    }
    start () {

        this.budget = +salaryAmount.value;
    
        disabledInputData.forEach( ( item ) => {
            item.setAttribute( 'disabled', true );
            startBtn.style.display = 'none';
            cancelBtn.style.display = 'block';
        });
    
        document.querySelectorAll( '.income-items > input' ).forEach( item => {
            item.setAttribute( 'disabled', true );
        });
        document.querySelectorAll( '.expenses-items > input' ).forEach( item => {
            item.setAttribute( 'disabled', true );
        });
    
        cancelBtn.addEventListener( 'click', () => this.reset() );
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
    
        this.getBudget();
        this.showResult();
    }
    // Программу возвращаем в исходное состояние
    reset () {
        disabledInputData.forEach( item => {
            item.removeAttribute( 'disabled', true );
            startBtn.style.display = 'block';
            cancelBtn.style.display = 'none';
        });
    
        document.querySelectorAll( 'input[type=text]' ).forEach( item => item.value = '' );
    
        document.querySelectorAll( '.income-items > input' ).forEach( item => {
            item.removeAttribute( 'disabled', false );
        });
        document.querySelectorAll( '.expenses-items > input' ).forEach( item => {
            item.removeAttribute( 'disabled', false );
        });
    
        if ( cancelBtn.style.display === 'none' ) {
            btnPlusIncome.style.display = 'block';
            btnPlusExpenses.style.display = 'block';
        }
    
        incomeItems.forEach( ( item, index, array ) => {
            item.length = array[index];
            if ( item === array[1] || item === array[2] ) {
                array[index].remove();
            }
        });
    
        expensesItems.forEach( ( item, index, array ) => {
            item.length = array[index];
            if ( item === array[1] || item === array[2] ) {
                array[index].remove();
            }
        });
    
        periodAmount.innerHTML = periodSelect.value = 1;
    }
    // Показать результаты
    showResult () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil( this.budgetDay );
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join( ', ' );
        additionalIncomeValue.value = this.addIncome.join( ', ' );
        targetMonthValue.value = Math.ceil( this.getTargetMonth() );
        incomePeriodValue.value = this.calcPeriod();
    
        periodSelect.addEventListener( 'input', () => {
            incomePeriodValue.value = this.calcPeriod();
            periodAmount.innerHTML = periodSelect.value;
        });
    }
    // Блок обязательных расходов
    addExpensesBlock () {
        let cloneExpensesItem = expensesItems[0].cloneNode( true ),
            inputsCloneValue = cloneExpensesItem.querySelectorAll( 'input' );
    
        inputsCloneValue.forEach( input => input.value = '' );
    
        expensesItems[0].parentNode.insertBefore( cloneExpensesItem, btnPlusExpenses );
        expensesItems = document.querySelectorAll( '.expenses-items' );
        if ( expensesItems.length === 3 ) {
            btnPlusExpenses.style.display = 'none';
        }
    }
    // Блок обязательных расходов
    addIncomeBlock () {
        let cloneIncomeItem = incomeItems[0].cloneNode( true ),
            inputsCloneValue = cloneIncomeItem.querySelectorAll( 'input' );
    
        inputsCloneValue.forEach( input => input.value = '' );
    
        incomeItems[0].parentNode.insertBefore( cloneIncomeItem, btnPlusIncome );
        incomeItems = document.querySelectorAll( '.income-items' );
        if ( incomeItems.length === 3 ) {
            btnPlusIncome.style.display = 'none';
        }
    }
    // Получаем обязательные расходы
    getExpenses () {
        expensesItems.forEach( item => {
            let itemExpenses = item.querySelector( '.expenses-title' ).value,
                cashExpenses = item.querySelector( '.expenses-amount' ).value;
    
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    // Получаем дополнительные доходы
    getIncome () {
        incomeItems.forEach( item => {
            let itemIncome = item.querySelector( '.income-title' ).value,
                cashIncome = item.querySelector( '.income-amount' ).value;
            
            if ( itemIncome !== '' && cashIncome !== '' ) {
                this.expenses[itemIncome] = cashIncome;
            }
    
        });
    
        for ( let key in this.income ) {
            this.incomeMonth += +this.income[key];
        }
    
    }
    // Получить возможные расходы
    getAddExpenses () {
        let addExpenses = additionalExpensesItem.value.split( ', ' );
    
        addExpenses.forEach( item => {
            item = item.trim();
            if ( item !== '' ) {
                this.addExpenses.push( item );
            }
        });
    }
    // Получить дополнительные доходы
    getAddIncome () {
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                this.addIncome.push( itemValue );
            }
        });
    }
    // Cуммa всех обязательных расходов за месяц
    getExpensesMonth () {
        for ( let key in this.expenses ) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    // За сколько месяцев будет достигнута цель
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }
    // Получить статусный доход
    getStatusIncome () {
        if ( this.budgetDay >= 1200 ) {
            return ( 'У вас высокий уровень дохода' );
        } else if ( this.budgetDay > 600 && this.budgetDay < 1200 ) {
            return ( 'У вас средний уровень дохода' );
        } else if ( this.budgetDay < 600 && this.budgetDay > 0 ) {
            return ( 'К сожалению у вас уровень дохода ниже среднего' );
        } else if ( this.budgetDay <= 0 ) {
            return ( 'Что то пошло не так' );
        }
    }
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    // События
    eventListeners () {
        // Пропускаем только числа
        salaryAmount.addEventListener( 'input', () => {
            salaryAmount.value = salaryAmount.value.replace( /[^0-9]/g, '' );
        });
    
        // Пропускаем только русские буквы, пробелы и знаки препинания
        placeholderNames.forEach( item => {
            item.addEventListener( 'input', function () {
                item.value = item.value.replace( /[^а-я\s\,\.\s\,\.]/, '' );
            });
        });
    
        additionalExpensesItem.addEventListener( 'input', () => {
            additionalExpensesItem.value = additionalExpensesItem.value.replace( /[^а-я\s\,\.]/, '' );
        });
    
        // Пропускаем только числа
        placeholderSum.forEach( item => {
            item.addEventListener( 'input', () => {
                item.value = item.value.replace( /[^0-9]/g, '' );
            });
        });
    
        depositPercent.addEventListener( 'input', () => {
            depositPercent.value = depositPercent.value.replace( /[^0-9]/g, '' );
        });
    
        // События
        let startBind = this.start.bind( appData );
        startBtn.addEventListener( 'click', startBind  );
        salaryAmount.addEventListener( 'keyup', this.check  );
        btnPlusExpenses.addEventListener( 'click', this.addExpensesBlock  );
        btnPlusIncome.addEventListener( 'click', this.addIncomeBlock  );
        periodSelect.addEventListener( 'input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
    }
}

const appData = new AppData();
appData.eventListeners();