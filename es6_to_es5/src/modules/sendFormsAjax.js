const sendFormsAjax = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся',
        allForms = document.querySelectorAll( 'form' ),
        allInputsForm = document.querySelectorAll( 'form input' ),
        statusMessage = document.createElement( 'div' );

    statusMessage.className = 'status-message';
    statusMessage.textContent = 'Тут будет сообщение!';
    statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';

    allInputsForm.forEach( item => {
        item.setAttribute( 'required', true );
        item.addEventListener( 'input', event => {
            if ( item.name === 'user_name' ) item.value = item.value.replace( /[^а-яёА-ЯЁ\s]/gi, '' );
            else if ( item.name === 'user_phone' ) item.value = item.value.replace( /[^0-9+]/gi, '' );
            else if ( item.name === 'user_email' ) item.value = item.value.replace( /^[а-яёА-ЯЁ0-9._%+-]+@[а-яёА-ЯЁ0-9-]+.+.[а-яёА-ЯЁ]{2,4}$/gi, '' );
            else if ( item.name === 'user_message' ) item.value = item.value.replace( /[^а-яёА-ЯЁ\.\-\,\!\?\;:\s]/gi, '' );
            else return;
        });
    });

    allForms.forEach( item => {
        item.addEventListener( 'submit', event => {
            event.preventDefault();
            item.appendChild( statusMessage );
            
            const formStatusMessage = () => statusMessage.textContent = '';
            setTimeout( formStatusMessage, 5000 );
            
            statusMessage.textContent = loadMessage;

            const formData = new FormData( item );
            let body = {};
            
            formData.forEach( ( val, key ) => body[key] = val );
            
            postData( body )
                .then( ( response ) => {
                    if ( response.status !== 200 ) throw new Error('status network is not 200');
                    statusMessage.textContent = successMessage;
                })
                .then( allInputsForm.forEach( ( item ) => item.value = '' ) )
                .catch( ( error ) => {
                    statusMessage.textContent = errorMessage;
                    console.error( error );
                });
        });
    });

    const postData = ( body ) => {
        return fetch( './server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        });
    };
};

export default sendFormsAjax;