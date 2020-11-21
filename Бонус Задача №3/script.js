document.addEventListener( 'DOMContentLoaded', () => {
    'use strict';

    const cityArr = {
        rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
        uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
        bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
        jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
    };

    const country = document.getElementById( 'country' ),
        city = document.getElementById( 'city' ),
        result = document.querySelector( 'result' );
    let option = document.querySelectorAll( 'option' );
    
    const changeOption = () => {
        if ( country.options[country.selectedIndex].value === 'rus' ) {
            console.log('rus');
        } else if ( country.options[country.selectedIndex].value === 'uk' ) {
            city.style.display = 'block';
            
        } else if ( country.options[country.selectedIndex].value === 'bel' ) {
            //city.style.display = 'block';
            console.log('bel');
        } else if ( country.options[country.selectedIndex].value === 'jap' ) {
            //city.style.display = 'block';
            console.log('jap');
        }
    };
    country.addEventListener( 'change', changeOption );
    

});