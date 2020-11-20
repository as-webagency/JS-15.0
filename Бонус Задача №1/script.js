document.addEventListener( 'DOMContentLoaded', () => {
    'use strict';

    let result = 0;
    class Calculator {
        constructor () {
            this.inputA = document.getElementById( 'a' );
            this.inputB = document.getElementById( 'b' );
            this.summa = document.getElementById( 'sum' );
            this.multi = document.getElementById( 'mult' );
            this.res = document.getElementById( 'res' );
        }
        // возвращает сумму этих двух значений
        sum () {
            return ( +this.inputA.value ) + ( +this.inputB.value );
        }
        // возвращает произведение этих двух значений
        mult () {
            return this.inputA.value * this.inputB.value;
        }
        // выводит результат вычислений в инпут ".res" объекта
        show () { 
            this.summa.addEventListener( 'click', () => this.sum.textContent = this.res.value = this.sum() );
            this.multi.addEventListener( 'click', () => this.mult.textContent = this.res.value = this.mult() );
        }
    }
    const calculator = new Calculator();
    calculator.show();

});