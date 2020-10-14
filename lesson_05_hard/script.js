'use strict';

let arr = ['1234', '2451', '35656', '45445', '2495', '4666', '7582'];
arr.forEach((item) => {
    if (item[0] === '2' || item[0] === '4') {
        console.log(item);
    }
});

function myFunc() {
    
    divider:
        for ( let i = 2; i <= 100; i++ ) {
            for ( let j = 2; j <= Math.sqrt( i ); j++ ) {
                if ( i % j === 0 ) continue divider;     
            }
            console.log( 'Делители числа ' + i + ' являются: ' + '1' + ' и ' + i );
        }
}
myFunc();